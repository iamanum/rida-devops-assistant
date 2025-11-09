# apps/backend/main.py

import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv 
import os
import json
from openai import OpenAI  
from pathlib import Path  
from typing import Dict, Any
from fastapi.middleware.cors import CORSMiddleware 

# --- 1. CONFIGURATION AND INITIALIZATION ---

# CRITICAL FIX: Base directory ko rida-devops-assistant root tak le jaana (3 times parent up)
BASE_DIR = Path(__file__).resolve().parent.parent.parent 
DOTENV_PATH = BASE_DIR / '.env'

# Load the environment variables from the found path
load_dotenv(dotenv_path=DOTENV_PATH) 

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") 

if not OPENAI_API_KEY:
    # Server ko rokna agar key load na ho
    raise ValueError(f"OPENAI_API_KEY not found. Checked path: {DOTENV_PATH}")

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

# FastAPI App metadata
app = FastAPI(
    title="RIDA RCA API",
    version="1.0.0",
    description="GPT-4o Mini powered Root Cause Analysis Engine for DevOps logs."
)

# --- CRITICAL FIX: CORS MIDDLEWARE ---
origins = [
    "http://localhost:3000",  # Frontend Next.js app ka address
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ------------------------------------

# Pydantic Model for incoming log data
class LogRequest(BaseModel):
    log_snippet: str
    context: str = "" 

# --- 2. THE AI CORE: ROOT CAUSE ANALYSIS FUNCTION ---

def get_rca_analysis(log_snippet: str, context: str = "") -> Dict[str, Any]:
    # EXPERT PROMPT ENGINEERING
    system_prompt = (
        "You are a Senior DevOps Architect with 15 years of experience. "
        "Analyze the provided log data, identify the root cause, and suggest an immediate fix. "
        "The output MUST be a strict JSON object with the following keys: "
        "'root_cause', 'fix_suggestion', and 'summary'."
    )

    user_prompt = f"""
    Analyze the following log snippet. Consider the context: "{context}".
    
    Log Snippet:
    ---
    {log_snippet}
    ---
    
    Provide the analysis in the specified JSON format.
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini", 
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"}, 
            temperature=0.1
        )
        
        json_string = response.choices[0].message.content
        json_output = json.loads(json_string) 
        
        return json_output

    except Exception as e:
        print(f"OpenAI API Error or JSON Parsing Failed: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"AI Analysis failed. Detail: {str(e)}"
        )


# --- 3. API ENDPOINTS ---

@app.get("/api/v1/health", tags=["System"])
def get_health():
    """Checks if the API is running."""
    return {"status": "ok", "message": "RIDA API is running successfully."}

@app.post("/api/v1/rca", tags=["RCA"])
def analyze_root_cause(request: LogRequest):
    """
    Analyzes log snippet using GPT-4o Mini to determine root cause and fix.
    """
    if not request.log_snippet or len(request.log_snippet) < 10:
        raise HTTPException(status_code=400, detail="Log snippet must be at least 10 characters long.")
    
    analysis_result = get_rca_analysis(request.log_snippet, request.context)
        
    return {
        "analysis_id": "RCA-" + str(hash(request.log_snippet) % 10000),
        "model": "gpt-4o-mini",
        "result": analysis_result
    }

# Run server locally (Port 8001 par)
if __name__ == "__main__":
    # CRITICAL: timeout_keep_alive ko 120 seconds par set kiya gaya hai for AI cold start
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True, timeout_keep_alive=120)