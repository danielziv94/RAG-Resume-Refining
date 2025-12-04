import os
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

from dotenv import load_dotenv

class ResumeRAG:
    def __init__(self):
        load_dotenv() # Ensure env vars are loaded
        self.vector_store = None
        self.qa_chain = None
        
        # Ensure API key is set for LLM
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            print("CRITICAL WARNING: GOOGLE_API_KEY not found in environment variables.")
        else:
            print(f"GOOGLE_API_KEY found: {api_key[:5]}...{api_key[-5:]}")
        
        try:
            # Use Gemini for Generation
            if api_key:
                self.llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.7, google_api_key=api_key)
            else:
                self.llm = None

            # Use Local Embeddings to avoid Rate Limits
            print("Initializing local embeddings (this may take a moment)...")
            self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
            print("Local embeddings initialized.")
            
        except Exception as e:
            print(f"Error initializing RAG engine: {e}")
            self.llm = None
            self.embeddings = None

    def ingest_pdf(self, file_path: str):
        """Loads a PDF, splits it, and creates a vector store."""
        loader = PyPDFLoader(file_path)
        documents = loader.load()
        
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        texts = text_splitter.split_documents(documents)
        
        # Create vector store (using Chroma in-memory for this session)
        if self.embeddings:
            self.vector_store = Chroma.from_documents(texts, self.embeddings)
            self._setup_qa_chain()
        else:
            print("Embeddings not initialized. Skipping vector store creation.")
        
        return len(texts)

    def _setup_qa_chain(self):
        """Sets up the RetrievalQA chain."""
        if not self.vector_store:
            raise ValueError("Vector store not initialized. Upload a PDF first.")
            
        if not self.llm:
             print("LLM not initialized. Cannot set up QA chain.")
             return

        retriever = self.vector_store.as_retriever(search_kwargs={"k": 5})
        
        prompt_template = """You are an expert professional resume writer.
        Use the following pieces of context (the user's existing resume) to rewrite or refine the resume sections based on the user's request.
        
        Context (Resume Content):
        {context}
        
        User Request:
        {question}
        
        Instructions:
        1. Maintain a professional, high-end tone.
        2. Focus on impact, achievements, and clarity.
        3. Tailor the content specifically to the user's request.
        4. STRICT OUTPUT FORMAT:
           - Output MUST be in plain text only.
           - NO Markdown styling (no bold **, no headers #, no bullet points - or *).
           - NO HTML tags.
           - Format each section exactly as:
             [Section Name] - 
             [Raw, unformatted text content]
        
        Example Output:
        Professional Summary - 
        Results-driven financial analyst with over 5 years of experience in market forecasting.
        
        Work Experience - 
        ABC Corp, Senior Analyst (2020-Present)
        Managed a portfolio of $50M, achieving a 15% YOY growth.
        
        Refined Content:"""
        
        PROMPT = PromptTemplate(
            template=prompt_template, input_variables=["context", "question"]
        )
        
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=False,
            chain_type_kwargs={"prompt": PROMPT}
        )

    def query(self, user_query: str):
        """Queries the RAG pipeline."""
        if not self.vector_store:
            return "Please upload a PDF resume first to initialize the RAG pipeline."
            
        if not self.qa_chain:
            return "RAG pipeline is not active (missing API key). Here is a mock refined resume section based on your request."
        
        response = self.qa_chain.invoke({"query": user_query})
        return response['result']
