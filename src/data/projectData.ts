export interface Story {
  id: string;
  epicId: string;
  title: string;
  tamilTitle?: string;
  description: string;
  tamilDescription?: string;
  objectives: string[];
  activities: string[];
  expectedOutcome: string;
  techStack: string[];
  status: 'Completed' | 'In Progress' | 'Planned';
  codeRef?: string;
}

export interface Epic {
  id: string;
  number: number;
  title: string;
  tamilTitle: string;
  summary: string;
  tamilSummary: string;
  stories: Story[];
}

export const PROJECT_METADATA = {
  title: 'Generative AI Application – Project Development Plan',
  subtitle: 'A Production-Grade Python FastAPI & Large Language Model Architecture',
  tamilTitle: 'ஜெனரேட்டிவ் ஏஐ அப்ளிகேஷன் – புராஜெக்ட் டெவலப்மென்ட் பிளான்',
  author: 'Engineering & Development Team',
  targetDate: '2026',
  architectureFlow: 'User → Frontend → FastAPI Backend → Routes → AI Model → Response → Frontend',
  backendTech: 'Python 3.11+, FastAPI, Uvicorn, Jinja2',
  aiTech: 'Google Gemini (Gemini 3.8 Flash / Gemini 3.1 Pro)',
  frontendTech: 'HTML5, Modern CSS, Responsive Jinja2 Templates, React Simulation UI',
};

export const EPICS_DATA: Epic[] = [
  {
    id: 'epic-1',
    number: 1,
    title: 'Model Selection and Architecture',
    tamilTitle: 'மாடல் தேர்வு மற்றும் வடிவமைப்பு (Architecture)',
    summary: 'Research and select the most suitable LLM, formulate the multi-tiered end-to-end architecture, and set up a resilient development environment.',
    tamilSummary: 'பொருத்தமான Generative AI மாடலைத் தேர்ந்தெடுத்தல், முழுமையான கட்டமைப்பு வரைபடம் உருவாக்குதல், மற்றும் டெவலப்மென்ட் சூழலை அமைத்தல்.',
    stories: [
      {
        id: 'story-1-1',
        epicId: 'epic-1',
        title: 'Story 1: Research and Select the Appropriate Generative AI Model',
        tamilTitle: 'கதை 1: பொருத்தமான Generative AI மாடலை ஆய்வு செய்து தேர்ந்தெடுத்தல்',
        description: 'The first step of the project is to research and identify a suitable Generative AI model based on the application requirements. Different Large Language Models (LLMs) are analyzed based on their accuracy, response quality, processing speed, API availability, cost, scalability, and ease of integration.\n\nThe selected model should be capable of understanding user inputs and generating relevant and meaningful responses. The model should also support integration with the FastAPI backend.',
        tamilDescription: 'துல்லியம், வேகம், API வசதி மற்றும் செலவு ஆகியவற்றை ஒப்பிட்டு, FastAPI உடன் எளிதாக இணைக்கக்கூடிய Gemini போன்ற தலைசிறந்த AI மாடலைத் தேர்ந்தெடுத்தல்.',
        objectives: [
          'Evaluate available Foundation LLMs (Gemini, Claude, GPT, Open Weights) for production speed and quality',
          'Benchmark latency, context window token limits, and pricing efficiency',
          'Ensure native asynchronous Python SDK support for FastAPI non-blocking event loops',
          'Finalize Google Gemini (Gemini 3.8 Flash) as primary production model',
        ],
        activities: [
          'Research available Generative AI and LLM models.',
          'Compare models based on performance and requirements.',
          'Analyze API availability and integration methods.',
          'Select the most suitable model.',
          'Document the reason for model selection.',
        ],
        expectedOutcome: 'A suitable Generative AI model is selected and finalized for application development.',
        techStack: ['Gemini 3.8 Flash', '@google/genai SDK', 'Python google-genai', 'Token Benchmarks'],
        status: 'Completed',
        codeRef: 'ai_service.py',
      },
      {
        id: 'story-1-2',
        epicId: 'epic-1',
        title: 'Story 2: Define the Architecture of the Application',
        tamilTitle: 'கதை 2: அப்ளிகேஷனின் கட்டமைப்பை (Architecture) வரையறுத்தல்',
        description: 'The application architecture is designed to define how the frontend, backend, Generative AI model, and other components communicate with each other.\n\nThe proposed architecture consists of a frontend interface, FastAPI backend, routing layer, user input processing module, and Generative AI model. User requests are received through the frontend and processed by the FastAPI backend before being sent to the AI model.\n\nArchitecture Flow:\nUser → Frontend → FastAPI Backend → Routes → AI Model → Response → Frontend',
        tamilDescription: 'பயனர் முதல் AI மாடல் வரை தரவு எவ்வாறு பயணிக்கிறது என்பதை முழுமையாக திட்டமிடுதல் (User → Frontend → FastAPI → Routes → AI Model → Response → Frontend).',
        objectives: [
          'Design strict separation of concerns: Presentation (Jinja2) vs Orchestration (FastAPI) vs Intelligence (LLM)',
          'Map request/response data lifecycle and schema validation with Pydantic',
          'Establish resilient error boundaries and rate limit handling',
          'Produce detailed Sequence and Data Flow Diagrams',
        ],
        activities: [
          'Design the overall application architecture.',
          'Define frontend and backend responsibilities.',
          'Design API communication.',
          'Define request and response flow.',
          'Plan the integration between FastAPI and the AI model.',
        ],
        expectedOutcome: 'A clear and scalable application architecture is established.',
        techStack: ['FastAPI REST Router', 'Pydantic V2', 'Asynchronous I/O', 'Architecture Flow Pipeline'],
        status: 'Completed',
        codeRef: 'app.py',
      },
      {
        id: 'story-1-3',
        epicId: 'epic-1',
        title: 'Story 3: Set Up the Development Environment',
        tamilTitle: 'கதை 3: டெவலப்மென்ட் சூழலை கட்டமைத்தல்',
        description: 'The development environment is prepared with all the required software, libraries, frameworks, and dependencies.\n\nPython is configured as the primary programming language, while FastAPI is used for backend development. Jinja2 is used for dynamic HTML template rendering.',
        tamilDescription: 'Python விர்ச்சுவல் சூழல் (venv), FastAPI, Uvicorn, Jinja2 மற்றும் தேவையான சூழல் மாறிகளை (Environment Variables) அமைத்தல்.',
        objectives: [
          'Provision Python 3.11+ isolated virtual environment (`venv`)',
          'Install core frameworks: FastAPI, Uvicorn (ASGI server), Jinja2, python-dotenv',
          'Configure `.env` secrets file for Gemini API keys and server ports',
          'Establish repository layout conforming to modern clean architecture',
        ],
        activities: [
          'Install and configure Python.',
          'Create a virtual environment.',
          'Install FastAPI and Uvicorn.',
          'Install Jinja2.',
          'Configure required AI/API libraries.',
          'Create the initial project structure.',
          'Configure environment variables.',
        ],
        expectedOutcome: 'A fully functional development environment is prepared for application development.',
        techStack: ['Python 3.11+', 'venv', 'Uvicorn ASGI', 'python-dotenv', 'requirements.txt'],
        status: 'Completed',
        codeRef: 'requirements.txt',
      },
    ],
  },
  {
    id: 'epic-2',
    number: 2,
    title: 'Core Functionalities Development',
    tamilTitle: 'மைய செயல்பாடுகள் உருவாக்கம் (Core Functionalities)',
    summary: 'Implement robust input handling, prompt orchestration, AI model communication, and the FastAPI asynchronous routing layer.',
    tamilSummary: 'பயனர் உள்ளீடு சரிபார்த்தல், AI மாடலுடன் தொடர்பு கொள்ளுதல், மற்றும் FastAPI ரூட்டிங் லேயரை உருவாக்குதல்.',
    stories: [
      {
        id: 'story-2-1',
        epicId: 'epic-2',
        title: 'Story 1: Develop the Core Functionalities',
        tamilTitle: 'கதை 1: மைய செயல்பாடுகளை உருவாக்குதல்',
        description: 'The core functionalities of the Generative AI application are developed according to the project requirements. The system should accept user input, process the request, communicate with the AI model, and return an appropriate response.',
        tamilDescription: 'பயனரின் கேள்விகளைப் பெற்று, அவற்றை AI மாடலுக்கு அனுப்பி, பதில்களைப் பெற்று, பிழைகளை நிர்வகித்து வெளியிடுதல்.',
        objectives: [
          'Build `AIService` class with automatic connection retries and prompt engineering rules',
          'Sanitize user inputs against prompt injection and empty payloads',
          'Format AI output with markdown parsing and token metrics',
          'Implement comprehensive try-except fallback mechanisms',
        ],
        activities: [
          'Create user input handling functionality.',
          'Implement AI model communication.',
          'Process AI responses.',
          'Handle errors and invalid inputs.',
          'Implement response formatting.',
          'Test individual functionalities.',
        ],
        expectedOutcome: 'The core Generative AI functionality is successfully implemented and capable of processing user requests.',
        techStack: ['Python asyncio', 'Prompt Engineering', 'Error Handling', 'Token Metric Tracker'],
        status: 'Completed',
        codeRef: 'ai_service.py',
      },
      {
        id: 'story-2-2',
        epicId: 'epic-2',
        title: 'Story 2: Implement the FastAPI Backend to Manage Routing and User Input Processing',
        tamilTitle: 'கதை 2: ரூட்டிங் மற்றும் உள்ளீட்டு செயலாக்கத்திற்கான FastAPI பேக்எண்ட் செயல்படுத்துதல்',
        description: 'FastAPI is implemented as the backend framework for managing application routes and processing user requests.\n\nThe backend receives input from the frontend, validates the data, sends the request to the appropriate processing function or AI model, and returns the generated response.',
        tamilDescription: 'HTTP GET மற்றும் POST கோரிக்கைகளைக் கையாண்டு, தரவுகளைச் சரிபார்த்து, AI சேவைக்கு வழங்கி பதிலளிக்கும் FastAPI பேக்எண்ட்.',
        objectives: [
          'Define `APIRouter` with GET `/` (page render) and POST `/generate` endpoints',
          'Support both Form-data (from traditional Jinja2 forms) and JSON payloads (from modern fetch requests)',
          'Validate input payload constraints using Pydantic Field specifications',
          'Return structured HTTP 200 responses with standardized schema',
        ],
        activities: [
          'Create FastAPI application.',
          'Configure API routes.',
          'Implement GET and POST requests.',
          'Process user input.',
          'Connect backend with the Generative AI model.',
          'Implement error handling.',
          'Return responses to the frontend.',
        ],
        expectedOutcome: 'A functional FastAPI backend is developed to manage routing, user input, AI processing, and responses.',
        techStack: ['FastAPI APIRouter', 'Pydantic BaseModel', 'FastAPI Form/Request', 'HTTP Status Handlers'],
        status: 'Completed',
        codeRef: 'routes.py',
      },
    ],
  },
  {
    id: 'epic-3',
    number: 3,
    title: 'App.py Development',
    tamilTitle: 'App.py & Routes.py கட்டமைப்பு உருவாக்கம்',
    summary: 'Formulate the master application gateway in `app.py` and decouple operational endpoints cleanly into `routes.py`.',
    tamilSummary: 'முக்கிய அப்ளிகேஷன் நுழைவு வாயில் (`app.py`) மற்றும் ரூட்டிங் கோப்புகளை (`routes.py`) நேர்த்தியாக கட்டமைத்தல்.',
    stories: [
      {
        id: 'story-3-1',
        epicId: 'epic-3',
        title: 'Story 1: Writing the Main Application Logic in routes.py',
        tamilTitle: 'கதை 1: routes.py மற்றும் app.py-ல் முக்கிய அப்ளிகேஷன் லாஜிக் எழுதுதல்',
        description: 'The main application logic is organized into the routing layer. The `routes.py` file manages application requests and connects the frontend with backend processing functions.\n\nThe routes receive user requests, process the submitted data, invoke the required AI functionality, and return the appropriate template or response.\n\nStructure: `app.py → routes.py → AI Service → Response`',
        tamilDescription: 'ஒழுங்கமைக்கப்பட்ட கோப்பு கட்டமைப்பு (`app.py → routes.py → AI Service → Response`) மூலம் அப்ளிகேஷன் லாஜிக்கை நிர்வகித்தல்.',
        objectives: [
          'Configure `app.py` to instantiate FastAPI with metadata, CORS middleware, and Jinja2Templates directory',
          'Modularize route handlers inside `routes.py` and register via `app.include_router()`',
          'Mount static assets folder (`/static`) for CSS, icons, and client scripts',
          'Write custom exception handlers for 404, 500, and AI API timeout errors',
        ],
        activities: [
          'Create and configure `routes.py`.',
          'Define application routes.',
          'Handle user requests.',
          'Connect routes with AI processing functions.',
          'Pass data between backend and templates.',
          'Implement exception handling.',
        ],
        expectedOutcome: 'The application\'s routing and request-processing logic are successfully implemented.',
        techStack: ['FastAPI App Factory', 'CORS Middleware', 'StaticFiles Mount', 'Modular Router Architecture'],
        status: 'Completed',
        codeRef: 'app.py',
      },
    ],
  },
  {
    id: 'epic-4',
    number: 4,
    title: 'Frontend Development',
    tamilTitle: 'முன்முகப்பு உருவாக்கம் (Frontend Development)',
    summary: 'Design an intuitive, responsive user interface and implement dynamic server-side template rendering using Jinja2.',
    tamilSummary: 'பயனர் இடைமுகம் (UI) மற்றும் Jinja2 மூலமான டைனமிக் HTML பக்கங்களை உருவாக்குதல்.',
    stories: [
      {
        id: 'story-4-1',
        epicId: 'epic-4',
        title: 'Story 1: Designing and Developing User Interface',
        tamilTitle: 'கதை 1: பயனர் இடைமுகத்தை (UI) வடிவமைத்தல்',
        description: 'A simple, responsive, and user-friendly interface is designed for interacting with the Generative AI application.\n\nThe interface provides input fields for users to enter their questions or prompts and displays the generated AI response in a clear format.',
        tamilDescription: 'மொபைல் மற்றும் கணினிகளுக்கு ஏற்ற எளிய, கவர்ச்சிகரமான, ரெஸ்பான்சிவ் UI வடிவமைப்பு.',
        objectives: [
          'Design clean prompt input text area with sample prompts and quick suggestions',
          'Incorporate clear model information badges, latency counters, and token indicators',
          'Provide one-click copy, clear, and download response actions',
          'Ensure 100% responsive layout on mobile, tablet, and widescreen desktop displays',
        ],
        activities: [
          'Design the application layout.',
          'Create HTML pages.',
          'Add input forms.',
          'Create buttons and navigation elements.',
          'Display AI-generated responses.',
          'Add CSS styling.',
          'Make the interface responsive.',
        ],
        expectedOutcome: 'A user-friendly frontend interface is developed for interacting with the Generative AI system.',
        techStack: ['Responsive HTML5', 'Modern CSS3 Grid/Flexbox', 'Accessibility (a11y)', 'Component Cards'],
        status: 'Completed',
        codeRef: 'templates/index.html',
      },
      {
        id: 'story-4-2',
        epicId: 'epic-4',
        title: 'Story 2: Creating Dynamic Templates with FastAPI\'s Jinja2',
        tamilTitle: 'கதை 2: FastAPI-ன் Jinja2 மூலம் டைனமிக் டெம்ப்ளேட்களை உருவாக்குதல்',
        description: 'Jinja2 templates are integrated with FastAPI to create dynamic web pages. The backend sends processed data and AI-generated responses to the HTML templates.\n\nThis allows the application to dynamically display information based on user requests.',
        tamilDescription: 'FastAPI பேக்எண்டில் இருந்து அனுப்பப்படும் AI பதில்களை Jinja2 மூலம் HTML பக்கங்களில் நிகழ்நேரத்தில் காண்பித்தல்.',
        objectives: [
          'Configure `Jinja2Templates(directory="templates")` inside FastAPI application',
          'Utilize Jinja2 template tags `{% if prompt %}`, `{{ response }}`, `{% for %}` for conditional UI states',
          'Render loading spinners, error banners, and success blocks dynamically',
          'Pass backend metadata (latency, timestamp, model ID) seamlessly into the view context',
        ],
        activities: [
          'Configure Jinja2 templates.',
          'Create reusable HTML templates.',
          'Connect templates with FastAPI routes.',
          'Pass backend data to templates.',
          'Display AI-generated responses dynamically.',
          'Implement form submission and response rendering.',
        ],
        expectedOutcome: 'Dynamic web pages are successfully integrated with the FastAPI backend using Jinja2.',
        techStack: ['Jinja2 Template Engine', 'Context Injection', 'Conditional DOM Rendering', 'XSS Auto-Escaping'],
        status: 'Completed',
        codeRef: 'templates/index.html',
      },
    ],
  },
  {
    id: 'epic-5',
    number: 5,
    title: 'Deployment',
    tamilTitle: 'வெளியீடு மற்றும் சோதனை (Deployment & Verification)',
    summary: 'Prepare the environment, configure Uvicorn ASGI server, verify API credentials, and execute end-to-end integration tests.',
    tamilSummary: 'உள்ளூர் கணினியில் அப்ளிகேஷனை இயக்குதல், Uvicorn சர்வர் தொடங்குதல், மற்றும் பல்வேறு சோதனைகள் மூலம் உறுதி செய்தல்.',
    stories: [
      {
        id: 'story-5-1',
        epicId: 'epic-5',
        title: 'Story 1: Preparing the Application for Local Deployment',
        tamilTitle: 'கதை 1: உள்ளூர் வெளியீட்டிற்கு (Local Deployment) அப்ளிகேஷனை தயார் செய்தல்',
        description: 'The completed application is prepared to run in a local development environment. All dependencies, configurations, environment variables, and project files are verified before deployment.',
        tamilDescription: 'அனைத்து சார்பு கோப்புகள், ரகசிய சாவி (API key), மற்றும் Uvicorn சர்வர் அமைப்புகளை சரிபார்த்து தயார் செய்தல்.',
        objectives: [
          'Generate reproducible `requirements.txt` with locked major dependencies',
          'Provide comprehensive `.env.example` documentation and validation scripts',
          'Configure Uvicorn production server parameters (host 0.0.0.0, port 8000, reload mode)',
          'Create automated startup sanity check script',
        ],
        activities: [
          'Verify project structure.',
          'Install all required dependencies.',
          'Configure environment variables.',
          'Verify AI API credentials.',
          'Configure FastAPI and Uvicorn.',
          'Check frontend and backend integration.',
          'Prepare the application for local execution.',
        ],
        expectedOutcome: 'The application is ready for local deployment and execution.',
        techStack: ['Uvicorn ASGI', 'Dependency Verification', 'Local Host Binding', 'Environment Audit'],
        status: 'Completed',
        codeRef: 'requirements.txt',
      },
      {
        id: 'story-5-2',
        epicId: 'epic-5',
        title: 'Story 2: Testing and Verifying Local Deployment',
        tamilTitle: 'கதை 2: உள்ளூர் வெளியீட்டை சோதித்து சரிபார்த்தல்',
        description: 'The application is executed locally and tested to ensure that all components work correctly.\n\nDifferent user inputs are provided to verify the AI response, routing, frontend rendering, and backend functionality.',
        tamilDescription: 'Uvicorn சர்வரை இயக்கி, பிரவுசரில் பரிசோதித்து, பிழைகள் இல்லாமல் AI பதில்கள் வருவதை உறுதி செய்தல்.',
        objectives: [
          'Start local Uvicorn server (`uvicorn app:app --reload --port 8000`)',
          'Perform end-to-end browser testing for normal, multi-turn, and long prompts',
          'Simulate edge cases: empty prompt, oversized prompt, network timeout',
          'Inspect FastAPI interactive documentation at `/docs` (Swagger UI) and `/redoc`',
        ],
        activities: [
          'Start the FastAPI server.',
          'Access the application through the local browser.',
          'Test user input functionality.',
          'Verify AI-generated responses.',
          'Test different input scenarios.',
          'Check error handling.',
          'Verify frontend and backend communication.',
          'Fix identified bugs.',
        ],
        expectedOutcome: 'The application successfully runs locally and all major functionalities are verified.',
        techStack: ['Pytest', 'FastAPI TestClient', 'Swagger UI (/docs)', 'Browser Smoke Testing'],
        status: 'Completed',
        codeRef: 'test_app.py',
      },
    ],
  },
];
