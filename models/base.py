from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

# Create delcarative base to define tables and models
Base = declarative_base()
#Create engine for connection to SQLite database
engine = create_engine('sqlite:///journeyjournal.db', echo=True)