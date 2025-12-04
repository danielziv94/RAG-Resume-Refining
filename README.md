# Resume Refinement Agent (AI-Powered RAG System)

## Description
The **Resume Refinement Agent** is an advanced AI-powered application designed to optimize professional resumes using Retrieval-Augmented Generation (RAG). By leveraging the **Gemini API**, the system analyzes an uploaded PDF resume against a user's specific career goals or a target job description. It then intelligently rewrites resume sections to highlight relevant skills and achievements while maintaining a strict, professional tone.

## Key Features
- **PDF Resume Upload & Analysis**: Seamlessly ingest and extract text from PDF resumes for contextual processing.
- **Target Job Description (JD) Analysis**: Intelligently aligns resume content with specific keywords and requirements from a target job description.
- **Structured, Raw Text Output**: Generates clean, unformatted text for easy copying and integration into existing documents, ensuring no formatting conflicts.
- **High-End, Responsive UI**: A modern, aesthetically pleasing interface built with React and Tailwind CSS, featuring smooth animations and a premium user experience.
- **Export Utility**: One-click copy functionality to easily transfer refined content.

## 🚀 Video Demo
<p align="center">
  <img src="./assets/Demo video resume refining.gif" alt="Animated GIF showing the Resume Refinement Agent workflow." width="800"/>
</p>

## Technology Stack
- **AI & LLM**: Google Gemini API (`gemini-2.5-flash`)
- **RAG Framework**: LangChain (with local embeddings via `sentence-transformers`)
- **Backend**: Python, FastAPI, Uvicorn
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Vector Store**: ChromaDB (In-memory)

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/resume-refinement-agent.git
cd resume-refinement-agent
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
pip install -r requirements.txt
```
Create a `.env` file in the `backend` directory and add your API key:
```env
GOOGLE_API_KEY=your_api_key_here
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

## Usage

1. **Start the Backend Server**:
   ```bash
   cd backend
   py -m uvicorn main:app --reload
   ```
   The API will run at `http://localhost:8000`.

2. **Start the Frontend Application**:
   ```bash
   cd frontend
   npm run dev
   ```
   The UI will be accessible at `http://localhost:5173`.

3. **Refine Your Resume**:
   - Open the web app.
   - Upload your PDF resume.
   - Enter your target job description or career goals.
   - Click "Generate Refined Resume" to receive your optimized content.
