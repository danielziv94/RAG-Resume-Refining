from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv
from rag_engine import ResumeRAG

load_dotenv()

app = FastAPI(title="Resume Refinement Agent")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Engine
# We'll initialize it lazily or per request if needed, but for now global is fine for a simple agent
rag_engine = ResumeRAG()

@app.get("/")
async def root():
    return {"message": "Resume Refinement Agent API is running"}

@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        # Save temp file
        file_location = f"temp_{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())
        
        # Process PDF
        num_docs = rag_engine.ingest_pdf(file_location)
        
        # Cleanup
        os.remove(file_location)
        
        return {"message": "Resume uploaded and processed successfully", "chunks": num_docs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/refine")
async def refine_resume(query: str = Form(...)):
    try:
        result = rag_engine.query(query)
        return {"refined_content": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
