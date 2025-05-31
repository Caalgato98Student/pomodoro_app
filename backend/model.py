from pydantic import BaseModel, Field
from typing import Optional

class TodoCreate(BaseModel):
    user_id: str
    todo_id: str
    title: str
    description: str

class TimerSettingsCreate(BaseModel):
    user_id: str
    work_duration: int = Field(25, gt=0, le=180)
    short_break: int = Field(5, gt=0, le=60)
    long_break: int = Field(15, gt=0, le=120)
    todo_title: Optional[str] = None

class TimerSettingsResponse(TimerSettingsCreate):
    pass