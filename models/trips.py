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

    def __repr__(self):
            return (f"<Trips(id={self.id}, destination={self.destination}, start_date={self.start_date}, "
                    f"end_date={self.end_date}, duration_days={self.duration_days}, traveler_name={self.traveler_name}, "
                    f"traveler_age={self.traveler_age}, traveler_gender={self.traveler_gender}, "
                    f"traveler_nationality={self.traveler_nationality}, trip_comment={self.trip_comment})>")