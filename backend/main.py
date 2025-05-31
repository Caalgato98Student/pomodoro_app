from bson import ObjectId
from fastapi import FastAPI,HTTPException,Body,Query
from fastapi.middleware.cors import CORSMiddleware
from model import *

app = FastAPI()

from database import (
    fetch_one_todo,
    fetch_all_todos,
    create_todo,
    update_todo,
    remove_todo,
    fetch_timer_settings,
    upsert_timer_settings,
    reset_timer_settings,
)

# urls permitidas para conexion
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

'''
====== Endpoints para tareas ====
'''
@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.get("/api/todo", response_model=list[TodoCreate])
async def get_todo(user_id: str = Query(...)):
    return await fetch_all_todos(user_id)

@app.get("/api/todo/{user_id}/{todo_id}", response_model=TodoCreate)
async def get_todo_by_id(user_id: str, todo_id: str):
    response = await fetch_one_todo(user_id, todo_id)
    if response:
        return response
    raise HTTPException(404, f"Could not find todo with id: {todo_id} for the user: {user_id}")

@app.post("/api/todo", response_model=TodoCreate)
async def post_todo(todo: TodoCreate):
    return await create_todo(todo.dict())

@app.put("/api/todo/{user_id}/{todo_id}", response_model=TodoCreate)
async def put_todo(user_id: str, todo_id: str, todo: TodoCreate = Body(...)):
    response = await update_todo(user_id, todo_id, todo.dict())
    if response:
        return response
    raise HTTPException(404, f"Todo not found")

@app.delete("/api/todo/{user_id}/{todo_id}")
async def delete_todo(user_id: str, todo_id: str):
    response = await remove_todo(user_id, todo_id)
    if response:
        return "Todo deleted successfully"
    raise HTTPException(404, f"Todo not found")

'''
====== Endpoints para temporizador ====
'''
@app.get("/api/timer/{user_id}", response_model=TimerSettingsResponse)
async def get_timer_settings(user_id: str):
    settings = await fetch_timer_settings(user_id)
    if settings:
        return settings
    # Devuelve valores por defecto si no existen
    return TimerSettingsResponse(user_id=user_id, work_duration=25, short_break=5, long_break=15)

@app.put("/api/timer/{user_id}", response_model=TimerSettingsResponse)
async def update_timer_settings(user_id: str, timer: TimerSettingsCreate = Body(...)):
    timer.user_id = user_id
    updated = await upsert_timer_settings(timer.model_dump())
    return updated

@app.delete("/api/timer/{user_id}")
async def delete_timer_settings(user_id: str):
    deleted = await reset_timer_settings(user_id)
    if deleted:
        return {"detail": "Timer settings deleted"}
    raise HTTPException(404, f"Timer settings for user_id {user_id} not found")