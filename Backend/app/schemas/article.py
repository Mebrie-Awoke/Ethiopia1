from datetime import datetime
from pydantic import BaseModel


class ArticleBase(BaseModel):
    category_id: int
    title: str
    summary: str
    content: str
    image_url: str | None = None


class ArticleRead(ArticleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ArticleCreate(ArticleBase):
    pass


class ArticleUpdate(BaseModel):
    category_id: int | None = None
    title: str | None = None
    summary: str | None = None
    content: str | None = None
    image_url: str | None = None
