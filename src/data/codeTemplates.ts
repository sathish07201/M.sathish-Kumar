export interface CodeFile {
  name: string;
  path: string;
  language: 'python' | 'html' | 'shell' | 'markdown' | 'env';
  description: string;
  epicRef: string;
  content: string;
}

export const CODE_FILES: CodeFile[] = [
  {
    name: 'app.py',
    path: 'app.py',
    language: 'python',
    description: 'Main FastAPI application gateway initializing Jinja2 templates, static mounts, and router inclusion.',
    epicRef: 'Epic 3: App.py Development',
    content: `"""
Generative AI Application - Main Application Entrypoint
File: app.py
Framework: FastAPI + Uvicorn
"""

import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from routes import router as ai_router

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI application instance
app = FastAPI(
    title="Generative AI Application",
    description="Production-ready GenAI web application built with FastAPI, Jinja2, and Google Gemini.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for local development and API access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup Jinja2 templates directory
# Epic 4: Story 2 - Creating Dynamic Templates with FastAPI's Jinja2
templates = Jinja2Templates(directory="templates")

# Mount static directory for CSS, JS, and images (if present)
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

# Include the modular routes
# Epic 3: Story 1 - Writing the Main Application Logic in routes.py
app.include_router(ai_router)

@app.on_event("startup")
async def startup_event():
    """Verify configuration and AI API availability on server boot."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("[WARNING] GEMINI_API_KEY is not set in environment variables. Check .env file.")
    else:
        print("[INFO] Generative AI Application successfully initialized with Gemini Engine.")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    # Epic 5: Story 1 & 2 - Local deployment via Uvicorn ASGI
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
`,
  },
  {
    name: 'routes.py',
    path: 'routes.py',
    language: 'python',
    description: 'FastAPI routing layer managing user input validation, GET page rendering, and POST AI generation.',
    epicRef: 'Epic 2: Story 2 & Epic 3: Story 1',
    content: `"""
Generative AI Application - Routing Layer
File: routes.py
Manages HTTP GET and POST endpoints, data validation, and AI service invocation.
"""

import time
from fastapi import APIRouter, Request, Form, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field
from ai_service import AIService

router = APIRouter()
templates = Jinja2Templates(directory="templates")
ai_service = AIService()

class GenerationRequest(BaseModel):
    """Pydantic model for JSON API requests."""
    prompt: str = Field(..., min_length=2, max_length=4000, description="User prompt text")
    model: str = Field(default="gemini-3.8-flash", description="Selected Generative AI model")

# -------------------------------------------------------------
# Epic 4: Story 2 - GET endpoint for dynamic HTML template
# -------------------------------------------------------------
@router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Render the main user interface via Jinja2."""
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "prompt": None,
            "response": None,
            "latency": None,
            "model_name": "gemini-3.8-flash"
        }
    )

# -------------------------------------------------------------
# Epic 2: Story 2 & Epic 4: Story 2 - Form submission endpoint
# -------------------------------------------------------------
@router.post("/generate", response_class=HTMLResponse)
async def generate_response_form(
    request: Request,
    user_prompt: str = Form(..., description="Prompt received from HTML Form")
):
    """
    Handle HTML Form submissions from the web UI.
    Flow: User → Frontend → FastAPI Backend → Routes → AI Model → Response → Frontend
    """
    cleaned_prompt = user_prompt.strip()
    if not cleaned_prompt:
        return templates.TemplateResponse(
            "index.html",
            {
                "request": request,
                "prompt": user_prompt,
                "error": "Please enter a valid question or prompt.",
                "response": None
            }
        )

    start_time = time.time()
    try:
        # Epic 2: Story 1 - Communicate with AI model
        ai_output = await ai_service.generate_text(cleaned_prompt)
        elapsed_ms = round((time.time() - start_time) * 1000, 2)

        return templates.TemplateResponse(
            "index.html",
            {
                "request": request,
                "prompt": cleaned_prompt,
                "response": ai_output,
                "latency": f"{elapsed_ms} ms",
                "model_name": ai_service.model_name
            }
        )
    except Exception as e:
        return templates.TemplateResponse(
            "index.html",
            {
                "request": request,
                "prompt": cleaned_prompt,
                "error": f"AI Processing Error: {str(e)}",
                "response": None
            }
        )

# -------------------------------------------------------------
# REST API Endpoint for JSON clients / mobile apps
# -------------------------------------------------------------
@router.post("/api/generate", response_class=JSONResponse)
async def generate_response_api(payload: GenerationRequest):
    """Programmatic JSON endpoint for decoupled clients."""
    start_time = time.time()
    try:
        ai_output = await ai_service.generate_text(payload.prompt, model=payload.model)
        elapsed_ms = round((time.time() - start_time) * 1000, 2)
        return {
            "status": "success",
            "prompt": payload.prompt,
            "response": ai_output,
            "model": payload.model,
            "latency_ms": elapsed_ms
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
`,
  },
  {
    name: 'ai_service.py',
    path: 'ai_service.py',
    language: 'python',
    description: 'Generative AI service module managing LLM communication, system instructions, and error handling.',
    epicRef: 'Epic 1: Story 1 & Epic 2: Story 1',
    content: `"""
Generative AI Application - AI Service Layer
File: ai_service.py
Encapsulates Google GenAI SDK calls, prompt structuring, and error resilience.
"""

import os
import asyncio
from dotenv import load_dotenv

load_dotenv()

class AIService:
    """Manages LLM communication and response generation."""

    def __init__(self, default_model: str = "gemini-3.8-flash"):
        self.model_name = default_model
        self.api_key = os.getenv("GEMINI_API_KEY")
        self._client = None
        self._init_client()

    def _init_client(self):
        """Initialize official Google GenAI SDK client."""
        try:
            from google import genai
            if self.api_key:
                self._client = genai.Client(api_key=self.api_key)
            else:
                self._client = None
        except ImportError:
            print("[NOTICE] 'google-genai' library not installed. Using fallback generator.")
            self._client = None

    async def generate_text(self, prompt: str, model: str = None) -> str:
        """
        Accepts user prompt, invokes Generative AI model, and returns formatted text.
        Epic 2: Story 1 - Develop the Core Functionalities
        """
        target_model = model or self.model_name

        if not self._client:
            # Re-check API key in case it was set dynamically
            self.api_key = os.getenv("GEMINI_API_KEY")
            if self.api_key:
                try:
                    from google import genai
                    self._client = genai.Client(api_key=self.api_key)
                except Exception:
                    pass

        # If client is configured, call Gemini
        if self._client:
            try:
                # Run synchronous GenAI call in asyncio executor to keep FastAPI non-blocking
                loop = asyncio.get_event_loop()
                response = await loop.run_in_executor(
                    None,
                    lambda: self._client.models.generate_content(
                        model=target_model,
                        contents=prompt,
                    )
                )
                if response and response.text:
                    return response.text
                return "Model returned an empty response."
            except Exception as exc:
                print(f"[ERROR in AIService] {exc}")
                raise RuntimeError(f"Generative AI Service Exception: {exc}")

        # Fallback simulation if running in offline or demo environment
        await asyncio.sleep(0.4)
        return (
            f"[FastAPI AI Core Response]\n\n"
            f"Query processed: '{prompt}'\n\n"
            f"The application architecture (User → Frontend → FastAPI Backend → "
            f"Routes → AI Model → Response → Frontend) successfully received and processed your input. "
            f"To enable live Gemini inference, ensure GEMINI_API_KEY is configured in your .env file."
        )
`,
  },
  {
    name: 'templates/index.html',
    path: 'templates/index.html',
    language: 'html',
    description: 'Dynamic Jinja2 responsive HTML template with CSS grid, form submission, and dynamic card rendering.',
    epicRef: 'Epic 4: Story 1 & Story 2',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Generative AI Application | FastAPI & Jinja2</title>
  <style>
    :root {
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --bg: #0f172a;
      --surface: #1e293b;
      --border: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #10b981;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: var(--bg); color: var(--text); min-height: 100vh; display: flex; flex-direction: column; }
    header { border-bottom: 1px solid var(--border); padding: 1rem 2rem; background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(10px); }
    .nav-container { max-width: 1000px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.25rem; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; }
    .badge { background: #312e81; color: #c7d2fe; font-size: 0.75rem; padding: 4px 8px; border-radius: 9999px; }
    main { flex: 1; max-width: 1000px; margin: 2rem auto; width: 100%; padding: 0 1rem; }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3); }
    h1 { font-size: 1.875rem; margin-bottom: 0.5rem; font-weight: 800; }
    p.lead { color: var(--text-muted); margin-bottom: 1.5rem; }
    form { display: flex; flex-direction: column; gap: 1rem; }
    textarea { width: 100%; background: #0f172a; border: 1px solid var(--border); border-radius: 8px; padding: 1rem; color: #fff; font-size: 1rem; resize: vertical; min-height: 120px; outline: none; }
    textarea:focus { border-color: var(--primary); ring: 2px solid var(--primary); }
    .actions { display: flex; justify-content: space-between; align-items: center; }
    button { background: var(--primary); color: #fff; border: none; padding: 0.75rem 1.75rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: 0.2s; }
    button:hover { background: var(--primary-hover); }
    .meta-tag { font-size: 0.85rem; color: var(--text-muted); }
    .response-card { background: #131c31; border: 1px solid #2e3c54; border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem; }
    .response-header { display: flex; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }
    .response-title { font-weight: 700; color: var(--accent); }
    .response-body { white-space: pre-wrap; line-height: 1.6; color: #e2e8f0; }
    .error-card { background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; color: #fca5a5; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
    footer { text-align: center; padding: 1.5rem; color: var(--text-muted); border-top: 1px solid var(--border); font-size: 0.85rem; }
  </style>
</head>
<body>
  <header>
    <div class="nav-container">
      <div class="logo">
        <span>⚡ FastAPI GenAI</span>
        <span class="badge">Jinja2 Powered</span>
      </div>
      <div class="meta-tag">Architecture: User → FastAPI → Gemini LLM</div>
    </div>
  </header>

  <main>
    <div class="card">
      <h1>Generative AI Query Console</h1>
      <p class="lead">Submit your query to the FastAPI backend, routed seamlessly to the Generative AI Model.</p>

      <form action="/generate" method="post">
        <textarea name="user_prompt" placeholder="Ask a question or enter your creative prompt..." required>{{ prompt if prompt else '' }}</textarea>
        
        <div class="actions">
          <span class="meta-tag">Model: {{ model_name }}</span>
          <button type="submit">Generate AI Response →</button>
        </div>
      </form>

      <!-- Dynamic Jinja2 Rendering: Epic 4 Story 2 -->
      {% if error %}
        <div class="error-card">
          ⚠️ <strong>Error:</strong> {{ error }}
        </div>
      {% endif %}

      {% if response %}
        <div class="response-card">
          <div class="response-header">
            <span class="response-title">✨ AI-Generated Response</span>
            <span class="meta-tag">Latency: {{ latency }}</span>
          </div>
          <div class="response-body">{{ response }}</div>
        </div>
      {% endif %}
    </div>
  </main>

  <footer>
    Generative AI Application • Developed with FastAPI, Jinja2 & Google Gemini
  </footer>
</body>
</html>
`,
  },
  {
    name: 'requirements.txt',
    path: 'requirements.txt',
    language: 'shell',
    description: 'Python package dependencies required for FastAPI, Jinja2, Uvicorn, and Google GenAI SDK.',
    epicRef: 'Epic 1: Story 3 & Epic 5: Story 1',
    content: `fastapi==0.115.0
uvicorn[standard]==0.30.6
jinja2==3.1.4
google-genai==2.4.0
python-dotenv==1.0.1
pydantic==2.9.2
pytest==8.3.3
httpx==0.27.2
`,
  },
  {
    name: '.env.example',
    path: '.env.example',
    language: 'env',
    description: 'Environment variables template for local execution and API keys.',
    epicRef: 'Epic 1: Story 3 & Epic 5: Story 1',
    content: `# Generative AI Application Configuration
# Get your Gemini API Key from Google AI Studio (https://aistudio.google.com)
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# Server execution parameters
PORT=8000
HOST=0.0.0.0
ENVIRONMENT=development
`,
  },
  {
    name: 'test_app.py',
    path: 'test_app.py',
    language: 'python',
    description: 'Pytest test suite verifying GET home route, POST /generate form handling, and error edge cases.',
    epicRef: 'Epic 5: Story 2 - Testing and Verifying Local Deployment',
    content: `"""
Test Suite: Local Deployment Verification
File: test_app.py
Uses FastAPI TestClient to verify routing, Jinja2 rendering, and AI response flow.
"""

import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_get_home_page():
    """Verify that GET / successfully renders the Jinja2 HTML page."""
    response = client.get("/")
    assert response.status_code == 200
    assert "Generative AI Query Console" in response.text
    assert "<form action=\"/generate\"" in response.text

def test_post_generate_form_valid():
    """Verify that POST /generate handles valid user prompt form data."""
    response = client.post(
        "/generate",
        data={"user_prompt": "Explain the concept of Generative AI in 2 sentences."}
    )
    assert response.status_code == 200
    assert "AI-Generated Response" in response.text or "response-card" in response.text

def test_post_generate_form_empty():
    """Verify error handling on empty or whitespace prompt."""
    response = client.post(
        "/generate",
        data={"user_prompt": "   "}
    )
    assert response.status_code == 200
    assert "Please enter a valid question or prompt" in response.text

def test_api_generate_json():
    """Verify programmatic JSON API endpoint."""
    response = client.post(
        "/api/generate",
        json={"prompt": "Hello AI", "model": "gemini-3.8-flash"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert data["status"] == "success"
`,
  },
  {
    name: 'README.md',
    path: 'README.md',
    language: 'markdown',
    description: 'Step-by-step local deployment instructions, environment setup, and verification guide.',
    epicRef: 'Epic 5: Story 1 & Story 2',
    content: `# Generative AI Application – Project Development Plan Implementation

A production-ready Generative AI application built with **Python 3.11+**, **FastAPI**, **Jinja2 Dynamic Templates**, and **Google Gemini (Gemini 3.8 Flash)**.

---

## 🏛️ Application Architecture Flow

\`\`\`
User → Frontend (Jinja2) → FastAPI Backend → Routes (routes.py) → AI Service (ai_service.py) → Gemini LLM → Response → Frontend
\`\`\`

---

## 🚀 Quick Start (Local Deployment)

### 1. Clone & Set Up Virtual Environment

\`\`\`bash
# Create isolated Python virtual environment
python -m venv venv

# Activate virtual environment
# On Linux / macOS:
source venv/bin/activate
# On Windows:
venv\\Scripts\\activate
\`\`\`

### 2. Install Dependencies

\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 3. Configure Environment Variables

\`\`\`bash
cp .env.example .env
# Edit .env and paste your GEMINI_API_KEY
\`\`\`

### 4. Start Local Uvicorn Server

\`\`\`bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
\`\`\`

### 5. Access Application

* 🌐 Web Interface: [http://localhost:8000](http://localhost:8000)
* 📖 Interactive Swagger API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
* 📑 ReDoc API Specification: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🧪 Run Automated Tests

\`\`\`bash
pytest test_app.py -v
\`\`\`
`,
  },
];
