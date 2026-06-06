from pathlib import Path

from pydantic import BaseSettings, Field


def get_settings() -> "Settings":
    return Settings()


class Settings(BaseSettings):
    database_url: str = Field("sqlite+aiosqlite:///./ethiopia.db", env="DATABASE_URL")
    groq_api_key: str = Field(..., env="GROQ_API_KEY")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
