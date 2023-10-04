from sqlalchemy import Column, Integer, String, Date, ForeignKey
from .base import Base

# Define Trip model class
class Trips(Base):
    __tablename__ = 'trips'
    id = Column(Integer, primary_key=True, autoincrement=True)
    destination = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    duration_days = Column(Integer, nullable=False)
    traveler_name = Column(String, nullable=False)
    traveler_age = Column(Integer)
    traveler_gender = Column(String)
    traveler_nationality = Column(String)
    trip_comment = Column(String)