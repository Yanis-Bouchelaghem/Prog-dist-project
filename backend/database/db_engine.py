from sqlmodel import create_engine
import os
import time
from sqlalchemy.exc import SQLAlchemyError
POSTGRES_USER = os.environ['POSTGRES_USER']
POSTGRES_PASSWORD = os.environ['POSTGRES_PASSWORD']
POSTGRES_DB = os.environ['POSTGRES_DB']
ENGINE_ECHO = os.environ['ENGINE_ECHO'] == 'TRUE'


time.sleep(20)
database_engine = create_engine(f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres:5432/{POSTGRES_DB}",
                    echo=ENGINE_ECHO)