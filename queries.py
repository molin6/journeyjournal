from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker
from models import Trips, Expenses, TripCategoryAssociation, TripCategory

# Set up engine and session
engine = create_engine('sqlite:///journeyjournal.db', echo=True)
Session = sessionmaker(bind=engine)

# Query with JOIN (combining data from trips and expenses tables):
def get_all_expenses_for_trip(trip_id):
    session = Session()
    try:
        expenses_for_trip = session.query(Expenses).filter_by(trip_id=trip_id).all()
        return expenses_for_trip
    finally:
        session.close()

# Parameterized Input Query (finding trips by destination):
def get_all_trips_by_traveler_name(traveler_name):
    session = Session()
    try:
        trips_by_traveler = session.query(Trips).filter_by(traveler_name=traveler_name).all()
        return trips_by_traveler
    finally:
        session.close()

#Aggregated Data Query (average accommodation cost per destination):
def get_average_accommodation_cost():
    session = Session()
    try:
        avg_accommodation_cost = session.query(func.avg(Expenses.accommodation_cost)).scalar()
        return avg_accommodation_cost
    finally:
        session.close()

#Query with JOIN for Trips and Their Categories
def get_trips_with_categories():
    session = Session()
    try:
        trips_with_categories = (session.query(
            Trips, TripCategory.category_name
        ).join(
            TripCategoryAssociation, Trips.id == TripCategoryAssociation.trip_id
        ).join(
            TripCategory, TripCategoryAssociation.category_id == TripCategory.id
        )
        .limit(10)
        .all())
        return trips_with_categories
    finally:
        session.close()

#Export Table with Trips, Expenses, and Trip Categories for a Single Trip
def get_complete_trip_details(trip_id):
    session = Session()
    try:
        complete_trip_details = session.query(
            Trips, Expenses, TripCategory.category_name
        ).filter(
            Trips.id == trip_id
        ).join(
            Expenses, Trips.id == Expenses.trip_id
        ).join(
            TripCategoryAssociation, Trips.id == TripCategoryAssociation.trip_id
        ).join(
            TripCategory, TripCategoryAssociation.category_id == TripCategory.id
        ).all()
        return complete_trip_details
    finally:
        session.close()
