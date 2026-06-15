# Ethioguide App

Ethioguide App is a frontend-backend educational project for exploring Ethiopian culture, history, traditions, and a chat interface backed by local AI retrieval.

The repository includes:

- `Backend/`: FastAPI application exposing a chat-only API and a health endpoint.
- `Frontend/`: Expo-based React Native application with local content for explore/details screens and a chat interface that calls the backend.

## Repository Structure

- `Backend/`
  - `app.py`: FastAPI entrypoint and chat API implementation.
  - `requirements.txt`: Python dependencies for the backend.
  - `data/`: backend document assets and Chroma DB storage.
- `Frontend/`
  - `app/`: Expo router pages for explore, chat, favorites, and settings.
  - `utils/api.js`: backend API base URL for chat.
  - `package.json`: Expo dependencies and scripts.

## Features

- Backend exposes a simple chat API for the frontend:
  - `POST /get` for chat queries
  - `GET /health` for health checks
- Frontend chat interface calls the backend directly
- Explore and details screens are local-only and do not depend on backend data
- CORS enabled in backend so the frontend can communicate safely

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

4. Create a `.env` file in `Backend/` and set environment variables as needed.
   - `GROQ_API_KEY` is required if the backend chat uses Groq model access.

5. Start the backend:

```powershell
python app.py
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

4. By default, the frontend uses `http://localhost:8000` for backend chat calls.
   - If you run the backend on another host or device, set `EXPO_PUBLIC_API_URL`.

## API Endpoints

- `GET /health`
- `POST /get`

## Running the App

1. Start the backend:

```powershell
cd Backend
python app.py
```

2. Start the frontend:

```bash
cd Frontend
npm start
```

3. Open the Expo app on a simulator or device and navigate to the chat screen.

## Notes

- The frontend communicates with the backend only for chat messages.
- Other app screens use local content and do not require backend data.
- If the backend is unavailable, the chat interface falls back to local replies.
