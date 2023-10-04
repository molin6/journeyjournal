from .base import Base
from sqlalchemy import Column, Integer, String

# Define the TripCategory model class
class TripCategory(Base):
    __tablename__ = 'trip_categories'
    id = Column(Integer, primary_key=True, autoincrement=True)
    category_name = Column(String, nullable=False)
