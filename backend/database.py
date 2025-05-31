import os
from dotenv import load_dotenv
from bson import ObjectId
load_dotenv()

from model import *

#Driver de MongoDB
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGO_URI"))

database = client.PomodoroApp
collection = database.todo
timer_collection = database.timer_settings 

'''
Funciones para tareas en la base de datos
'''

async def fetch_one_todo(user_id: str, todo_id: str) -> TodoCreate | None:
    document = await collection.find_one({"user_id": user_id, "todo_id": todo_id})
    if document:
        return TodoCreate(**document)
    return None

async def fetch_all_todos(user_id: str) -> list[TodoCreate]:
    todos = []
    cursor = collection.find({"user_id": user_id})
    async for document in cursor:
        todos.append(TodoCreate(**document))
    return todos

async def create_todo(todo: dict) -> TodoCreate:
    await collection.insert_one(todo)
    return TodoCreate(**todo)

async def update_todo(user_id: str, todo_id: str, todo: dict) -> TodoCreate | None:
    await collection.update_one({"user_id": user_id, "todo_id": todo_id}, {"$set": todo})
    document = await collection.find_one({"user_id": user_id, "todo_id": todo_id})
    if document:
        return TodoCreate(**document)
    return None

async def remove_todo(user_id: str, todo_id: str):
    result = await collection.delete_one({"user_id": user_id, "todo_id": todo_id})
    return result.deleted_count > 0

'''
Funciones para temporizador en la base de datos
'''

async def fetch_timer_settings(user_id: str):
    document = await timer_collection.find_one({"user_id": user_id})
    if document:
        document.pop("_id", None)
        return TimerSettingsResponse(**document)
    return None

async def upsert_timer_settings(timer: dict):
    await timer_collection.update_one(
        {"user_id": timer["user_id"]},
        {"$set": timer},
        upsert=True
    )
    document = await timer_collection.find_one({"user_id": timer["user_id"]})
    if document:
        document.pop("_id", None)
        return TimerSettingsResponse(**document)
    return None

async def reset_timer_settings(user_id: str):
    result = await timer_collection.delete_one({"user_id": user_id})
    return result.deleted_count > 0