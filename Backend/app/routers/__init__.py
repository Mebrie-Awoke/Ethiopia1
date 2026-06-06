from app.routers.article import router as article_router
from app.routers.category import router as category_router
from app.routers.chat import router as chat_router
from app.routers.health import router as health_router

__all__ = [
    "article_router",
    "category_router",
    "chat_router",
    "health_router",
]
