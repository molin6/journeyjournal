import csv
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Trips, Expenses, TripCategory, TripCategoryAssociation

# Setup
engine = create_engine('sqlite:///journeyjournal.db', echo=True)
Session = sessionmaker(bind=engine)
session = Session()

with Session() as session:
    # Read CSV
    with open('data/JourneyJournalData.csv', mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        
        for row in reader:
            # Parse and convert data
            destination = row['Destination']
            start_date = datetime.strptime(row['Start date'], '%m/%d/%Y').date()
            end_date = datetime.strptime(row['End date'], '%m/%d/%Y').date()
            duration_days = int(row['Duration (days)'])
            traveler_name = row['Traveler name']
            traveler_age = int(row['Traveler age']) if row['Traveler age'] else None
            traveler_gender = row['Traveler gender']
            traveler_nationality = row['Traveler nationality']
            
            # Insert Trip
            trip = Trips(
                destination=destination,
                start_date=start_date,
                end_date=end_date,
                duration_days=duration_days,
                traveler_name=traveler_name,
                traveler_age=traveler_age,
                traveler_gender=traveler_gender,
                traveler_nationality=traveler_nationality
            )
            session.add(trip)
            session.commit()
            
            # Insert Expense if data is present
            accommodation_type = row['Accommodation type']
            accommodation_cost = float(row['Accommodation cost']) if row['Accommodation cost'] else None
            transportation_type = row['Transportation type']
            transportation_cost = float(row['Transportation cost']) if row['Transportation cost'] else None
            
            if accommodation_type or accommodation_cost or transportation_type or transportation_cost:
                expense = Expenses(
                    trip_id=trip.id,
                    main_accommodation_type=accommodation_type,
                    accommodation_cost=accommodation_cost,
                    main_transportation_type=transportation_type,
                    transportation_cost=transportation_cost
                )
                session.add(expense)
                session.commit()
            
            # Insert TripCategories if data is present
            categories = row['Categories']
            if categories:
                for category_name in categories.split('|'):
                    # Find or create category
                    category = session.query(TripCategory).filter_by(category_name=category_name).first()
                    if not category:
                        category = TripCategory(category_name=category_name)
                        session.add(category)
                        session.flush()  # To ensure the category gets an ID
                    # Create association
                    association = TripCategoryAssociation(trip_id=trip.id, category_id=category.id)
                    session.add(association)
            
            # Commit the transaction for each row
            session.commit()

            session.close()
