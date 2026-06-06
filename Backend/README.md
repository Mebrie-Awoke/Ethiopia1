# Ethiopia Knowledge Hub Backend

This FastAPI backend supports the Ethiopia Knowledge Hub mobile application with public educational content, AI-enabled Ethiopia knowledge search, and article/category APIs.

## Features

- Public category and article APIs
- AI chat using Groq and a local document retriever
- SQLite database with SQLAlchemy 2.0
- Alembic migration support
- Swagger UI available at `/docs`

## Setup

1. Create a virtual environment

```bash
python -m venv .venv
```

2. Activate the environment

Windows:
```powershell
.venv\Scripts\Activate.ps1
```
macOS / Linux:
```bash
source .venv/bin/activate
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Copy and configure environment variables

```bash
copy .env.example .env
```

Update `.env` values for `GROQ_API_KEY`.

5. Run database migrations

```bash
alembic upgrade head
```

6. Start the server

```bash
uvicorn app.main:app --reload
```

## API Endpoints

- `GET /health`
- `GET /categories/`
- `GET /articles/`
- `GET /articles/{id}`
- `GET /articles/category/{id}`
- `GET /articles/search?q=`
- `POST /chat/message`
- `GET /chat/knowledge/status`

## Notes

- The local document retriever loads mock Markdown files from `app/mock_data/`.
- The chatbot uses Groq along with local Ethiopia knowledge context.
- API docs are available at `/docs` after starting the server.
