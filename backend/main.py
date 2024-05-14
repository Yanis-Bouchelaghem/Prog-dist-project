from fastapi import FastAPI
import uvicorn
import os
from contextlib import asynccontextmanager

from database.dependencies import create_db_and_tables
from database.transactions.router import router as transactions_router
#Things to do before and after the app runs.
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield #What comes above this yield will execute before the app starts. What comes under will execute after the app stops.

app = FastAPI(lifespan=lifespan)
app.include_router(transactions_router)



@app.get("/")
def hello():
    return {"hellsssso":"there"}


if __name__ == "__main__":

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
