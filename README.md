# Ethioguide App

Ethioguide App is a full-stack educational project for exploring Ethiopian culture, history, traditions, and local knowledge.

The repository includes:

- `Backend/`: FastAPI application with SQLite persistence, article/category APIs, and an AI-enabled chat feature.
- `Frontend/`: Expo-based React Native application that consumes the backend API and displays Ethiopia knowledge content.

## Repository Structure

- `Backend/`
  - `app/main.py`: FastAPI entrypoint and startup logic.
  - `app/routers/`: API route definitions for health, categories, articles, and chat.
  - `app/schemas/`, `app/models/`, `app/services/`, `app/repositories/`: app layer structure.
  - `app/Documents/`: local Ethiopia knowledge documents used by the chat feature.
  - `tests/`: backend test suite.
- `Frontend/`
  - `app/`: Expo router pages for explore, chat, favorites, and settings.
  - `utils/api.js`: backend API client implementation.
  - `package.json`: Expo dependencies and scripts.

## Features

- Backend category and article REST API
- Article search and article detail retrieval
- Health endpoint for API status checks
- AI chat support using a local document retriever and Groq integration
- Expo mobile app UI for browsing Ethiopian knowledge
- Cross-origin API support via CORS middleware

## Backend Setup

1. Open a terminal in `Backend/`.
2. Create and activate a virtual environment:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

3. Install dependencies:

```powershell
pip install -r requirements.txt
```

4. Create environment variables.
   - Copy the example env file if available or create `.env`.
   - Set `GROQ_API_KEY` if you want to enable chat integration.

5. Run database migrations:

```powershell
alembic upgrade head
```

6. Start the backend:

```powershell
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`.

## Frontend Setup

1. Open a terminal in `Frontend/`.
2. Install dependencies:

```bash
npm install
```

3. Start Expo:

```bash
npm start
```

4. If needed, set the backend API URL by exporting `EXPO_PUBLIC_API_URL` or by configuring environment variables for Expo.

The front-end app will use `http://localhost:8000` by default.

## API Endpoints

- `GET /health`
- `GET /categories/`
- `GET /articles/`
- `GET /articles/{id}`
- `GET /articles/category/{id}`
- `GET /articles/search?q=`
- `POST /chat/message`
- `GET /chat/knowledge/status`

## Running Backend Tests

From `Backend/` run:

```powershell
pytest tests/test_articles.py -q
```

## Notes

- The backend seeds sample content on startup when the database is empty.
- The frontend fetch layer is defined in `Frontend/utils/api.js`.
- To use the AI chat feature, provide a valid `GROQ_API_KEY` in the backend environment.
