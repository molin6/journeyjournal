## Database Queries Documentation

Queries are stored in [queries.py](../queries.py) and the test print statements in [query_test.py](../query_test.py)

### 1. `get_all_expenses_for_trip(trip_id)`
- **Description:** Retrieves all expenses associated with a specific trip identified by `trip_id`.
- **Parameters:** `trip_id` (int) - ID of the trip.
- **Returns:** A list of `Expenses` objects related to the specified trip.

### 2. `get_all_trips_by_traveler_name(traveler_name)`
- **Description:** Retrieves all trips undertaken by a traveler with the specified name.
- **Parameters:** `traveler_name` (str) - Name of the traveler.
- **Returns:** A list of `Trips` objects associated with the traveler's name provided.

### 3. `get_average_accommodation_cost()`
- **Description:** Calculates the average cost of accommodations across all trips in the database.
- **Parameters:** None.
- **Returns:** A scalar value representing the average accommodation cost.

### 4. `get_trips_with_categories()`
- **Description:** Retrieves a list of trips along with their associated categories. This query limits the result to 10 records for efficiency.
- **Parameters:** None.
- **Returns:** A list of tuples, where each tuple contains a `Trips` object and the associated category name (string).

### 5. `get_complete_trip_details(trip_id)`
- **Description:** Retrieves complete details (including expenses and categories) for a specific trip identified by `trip_id`.
- **Parameters:** `trip_id` (int) - ID of the trip.
- **Returns:** A list of tuples, where each tuple contains a `Trips` object, `Expenses` object, and associated category name (string) for the specified trip.
