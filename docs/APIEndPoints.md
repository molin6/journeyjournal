## Journey Journal API Documentation

# List of Endpoints
- [List All Trips](#list-all-trips)
- [List trips with LIMIT](#list-trips-with-limit)
- [Get Trip By ID](#get-a-specific-trip-by-id)
- [List Trips by Traveller](#list-all-trips-by-a-specific-traveler)
- [Add a new trip](#add-a-new-trip)
- [Update a trip](#update-a-trip)
- [Delete a trip](#delete-a-trip)
- [List All expenses for a trip](#list-all-expenses-for-a-specific-trip)
- [Add Expense to a trip](#add-a-new-expense-for-a-trip)
- [Update an expense](#update-an-expense)
- [Delete an expense](#delete-an-expense)
- [List all trip categories](#list-all-trip-categories)
- [Add a new category](#add-a-new-category)
- [Update a category](#update-a-category)
- [Delete a category](#delete-a-category)
- [Get avg accommodation cost](#get-average-accommodation-cost)
- [Get trips with their categories](#get-trips-with-their-categories)
- [Get full details for a trip (Category, Expenses, Trip info)](#get-full-details-for-a-specific-trip)
- [Search for trips based on date range](#search-for-trips-based-on-date-range)
- [Search for trips based on keyword](#search-trips-based-on-a-keyword)
- [Filter expenses by amount](#search-expenses-within-a-certain-amount-range)
---

### **Trips**

## List all trips

- **Endpoint**: `GET /trips`
- **Description**: Retrieve a list of all trips stored in the system.
- **Returns**:
    ```json
    [
        {
            "destination": "London, UK",
            "duration_days": 7,
            "end_date": "Mon, 08 May 2023 00:00:00 GMT",
            "id": 1,
            "start_date": "Mon, 01 May 2023 00:00:00 GMT",
            "traveler_age": 35,
            "traveler_gender": "Male",
            "traveler_name": "John Smith",
            "traveler_nationality": "American",
            "trip_comment": null
        },
        {
            "destination": "Phuket, Thailand",
            "duration_days": 5,
            "end_date": "Tue, 20 Jun 2023 00:00:00 GMT",
            "id": 2,
            "start_date": "Thu, 15 Jun 2023 00:00:00 GMT",
            "traveler_age": 28,
            "traveler_gender": "Female",
            "traveler_name": "Jane Doe",
            "traveler_nationality": "Canadian",
            "trip_comment": null
        },
        ...
    ]
## List trips with limit and offset

- **Endpoint**: `GET /trips`
- **Description**: Retrieve a list of trips stored in the system with options to limit the number of results returned and to offset the starting point of the results.
- **Query Parameters**:
  - `limit`: The maximum number of trips to return. If not specified, all trips will be returned.
  - `offset`: The number of records to skip before starting to return the results. Useful for pagination. Not required
- **Returns**: A JSON array of trip objects limited by the `limit` parameter and offset by the `offset` parameter. Each trip object contains the following fields:
    - `id`: The unique identifier of the trip.
    - `traveler_name`: The name of the traveler.
    - `traveler_age`: The age of the traveler.
    - `traveler_gender`: The gender of the traveler.
    - `traveler_nationality`: The nationality of the traveler.
    - `destination`: The destination of the trip.
    - `start_date`: The start date of the trip.
    - `end_date`: The end date of the trip.
    - `duration_days`: The duration of the trip in days.
    - `trip_comment`: Additional comments about the trip, if any.

- **Example Request**: `GET /trips?limit=10&offset=20`

- **Example Response**:
    ```json
    [
        {
            "id": 21,
            "traveler_name": "Alice Johnson",
            "traveler_age": 29,
            "traveler_gender": "Female",
            "traveler_nationality": "French",
            "destination": "Paris, France",
            "start_date": "Wed, 15 Jul 2023 00:00:00 GMT",
            "end_date": "Wed, 22 Jul 2023 00:00:00 GMT",
            "duration_days": 7,
            "trip_comment": "Looking forward to the museums!"
        },
        // ... more trip objects up to the limit, starting from the offset ...
    ]
    ```


## Get a specific trip by ID

- **Endpoint**: `GET /trips/<trip_id>`
- **Description**: Obtain detailed information about a specific trip based on its ID.
- **Parameters**: 
  - `trip_id: int`
- **Returns**:
    ```json
    {
        "destination": "London, UK",
        "duration_days": 7,
        "end_date": "Mon, 08 May 2023 00:00:00 GMT",
        "id": 1,
        "start_date": "Mon, 01 May 2023 00:00:00 GMT",
        "traveler_age": 35,
        "traveler_gender": "Male",
        "traveler_name": "John Smith",
        "traveler_nationality": "American",
        "trip_comment": null
    }
    ```

## List all trips by a specific traveler

- **Endpoint**: `GET /trips?traveler_name=<traveler_name>`
- **Description**: Display all trips associated with a particular traveler.
- **Parameters**: 
  - `traveler_name: string`
- **Returns**:
    ```json
    [
        {
            "destination": "New York, USA",
            "duration_days": 14,
            "end_date": "Tue, 29 Aug 2023 00:00:00 GMT",
            "id": 4,
            "start_date": "Tue, 15 Aug 2023 00:00:00 GMT",
            "traveler_age": 29,
            "traveler_gender": "Female",
            "traveler_name": "Sarah Johnson",
            "traveler_nationality": "British",
            "trip_comment": null
        },
        {
            "destination": "New York, USA",
            "duration_days": 14,
            "end_date": "Tue, 29 Aug 2023 00:00:00 GMT",
            "id": 21,
            "start_date": "Tue, 15 Aug 2023 00:00:00 GMT",
            "traveler_age": 29,
            "traveler_gender": "Female",
            "traveler_name": "Sarah Johnson",
            "traveler_nationality": "British",
            "trip_comment": null
        }
        ...
    ]
    ```

## Add a new trip

- **Endpoint**: `POST /trips`
- **Description**: Add a new trip entry.
- **Body**:
    ```json
    {
        "destination": "Tokyo",
        "start_date": "9/12/2024",
        "end_date": "9/22/2024",
        "duration_days": 10,
        "traveler_name": "Alice Smith",
        "traveler_age": 28,
        "traveler_gender": "Female",
        "traveler_nationality": "American",
        "trip_comment": "This can be null"
    }
    ```
- **Returns**:
Newly added trip details

## Update a trip

- **Endpoint**: `PUT /trips/<trip_id>`
- **Description**: Modify details of an existing trip. Can specify any field in JSON body.
- **Parameters**: 
  - `trip_id: int`
- **Body (list of all fields able to update, can put just 1 or all)**:
    ```json
    {
        "destination": "",
        "duration_days": 0,
        "end_date": "",
        "id": 0,
        "start_date": "",
        "traveler_age": 0,
        "traveler_gender": "",
        "traveler_name": "",
        "traveler_nationality": "",
        "trip_comment": ""
    }
    ```
- **Returns**:
 Newly updated trip details

## Delete a trip

- **Endpoint**: `DELETE /trips/<trip_id>`
- **Description**: Remove a specific trip from the database.
- **Parameters**: 
  - `trip_id: int`
- **Returns**:
"Trip deleted successfully"

### **Expenses**

## List all expenses for a specific trip

- **Endpoint**: `GET /trips/<trip_id>/expenses`
- **Description**: Retrieve all expenses related to a specific trip.
- **Parameters**: 
  - `trip_id: int`
- **Returns**:
    ```json
    [
        {
            "accommodation_cost": 350.0,
            "id": 50,
            "main_accommodation_type": "Airbnb",
            "main_transportation_type": "Plane",
            "transportation_cost": 600.0,
            "trip_id": 50
        },
        ...
    ]
    ```

## Add a new expense for a trip

- **Endpoint**: `POST /trips/<trip_id>/expenses`
- **Description**: Record a new expense for a specific trip.
- **Parameters**: 
  - `trip_id: int`
- **Body**:
    ```json
    {
        "accommodation_cost": 350.0,
        "main_accommodation_type": "Airbnb",
        "main_transportation_type": "Plane",
        "transportation_cost": 600.0,
    }
    ```
- **Returns**:
    ```json
    {
        "accommodation_cost": 350.0,
        "id": 50,
        "main_accommodation_type": "Airbnb",
        "main_transportation_type": "Plane",
        "transportation_cost": 600.0,
        "trip_id": 50
    }
    ```

## Update an expense

- **Endpoint**: `PUT /expenses/<expense_id>`
- **Description**: Edit details of an existing expense.
- **Parameters**: 
  - `expense_id: int`
- **Body (Can do just 1 or multiple)**:
    ```json
    {
        "accommodation_cost": 0,
        "id": 0,
        "main_accommodation_type": "",
        "main_transportation_type": "",
        "transportation_cost": 0,
        "trip_id": 0
    }
    ```
- **Response**:
Newly Updated Expense
## Delete an expense

- **Endpoint**: `DELETE /expenses/<expense_id>`
- **Description**: Eliminate a specific expense record.
- **Parameters**: 
  - `expense_id: int`
- **Response**: "Expense deleted successfully"

### **Categories**

## List all trip categories

- **Endpoint**: `GET /categories`
- **Description**: Display all trip categories.
- **Returns**:
    ```json
    [
        {
            "category_name": "Vacation",
            "id": 1
        },
        {
            "category_name": "Business",
            "id": 2
        },
        {
            "category_name": "Medical",
            "id": 3
        },
        {
            "category_name": "Family Visit",
            "id": 4
        },
        {
            "category_name": "Event",
            "id": 5
        }
        ...
    ]
    ```

## Add a new category

- **Endpoint**: `POST /categories`
- **Description**: Introduce a new trip category.
- **Body**:
    ```json
    {
        "category_name": "Hiking"
    }
    ```
- **Returns**:
    ```json
    {
        "id": 2,
        "category_name": "Hiking"
    }
    ```

## Update a category

- **Endpoint**: `PUT /categories/<category_id>`
- **Description**: Modify an existing trip category.
- **Parameters**: 
  - `category_id: int`
- **Body**:
    ```json
    {
        "category_name": "Trekking"
    }
    ```
- **Response**:
Newly updated category is displayed.

## Delete a category

- **Endpoint**: `DELETE /categories/<category_id>`
- **Description**: Remove a category from the system.
- **Parameters**: 
  - `category_id: int`
- **Response**:
"Category deleted successfully"

### **Statistics and Extended Queries**

## Get average accommodation cost

- **Endpoint**: `GET /expenses/accommodation/average`
- **Description**: Calculate the average cost of accommodations overall.
- **Returns**:
    ```json
    {
        "average_cost": 150.5
    }
    ```

## Get trips with their categories

- **Endpoint**: `GET /trips/with-categories`
- **Description**: List trips with their associated categories.
- **Returns**:
    ```json
    [
        {
            "categories": [
                "Vacation"
            ],
            "destination": "London, UK",
            "duration_days": 7,
            "end_date": "Mon, 08 May 2023 00:00:00 GMT",
            "id": 1,
            "start_date": "Mon, 01 May 2023 00:00:00 GMT",
            "traveler_age": 35,
            "traveler_gender": "Male",
            "traveler_name": "John Smith",
            "traveler_nationality": "American",
            "trip_comment": null
        },
        {
            "categories": [
                "Business"
            ],
            "destination": "Phuket, Thailand",
            "duration_days": 5,
            "end_date": "Tue, 20 Jun 2023 00:00:00 GMT",
            "id": 2,
            "start_date": "Thu, 15 Jun 2023 00:00:00 GMT",
            "traveler_age": 28,
            "traveler_gender": "Female",
            "traveler_name": "Jane Doe",
            "traveler_nationality": "Canadian",
            "trip_comment": null
        },
        ...
    ]
    ```

## Get full details for a specific trip

- **Endpoint**: `GET /trips/<trip_id>/details`
- **Description**: Retrieve a comprehensive breakdown of a trip. (Categories, Expenses, Trip)
- **Parameters**: 
  - `trip_id: int`
- **Returns**:
    ```json
    {
        "categories": [
            "Vacation"
        ],
        "destination": "London, UK",
        "duration_days": 7,
        "end_date": "Mon, 08 May 2023 00:00:00 GMT",
        "expenses": [
            {
                "accommodation_cost": 1200.0,
                "id": 1,
                "main_accommodation_type": "Hotel",
                "main_transportation_type": "Flight",
                "transportation_cost": 600.0,
                "trip_id": 1
            }
        ],
        "id": 1,
        "start_date": "Mon, 01 May 2023 00:00:00 GMT",
        "traveler_age": 35,
        "traveler_gender": "Male",
        "traveler_name": "John Smith",
        "traveler_nationality": "American",
        "trip_comment": null
    }
    ```

### **Search**

## Search for trips based on date range

- **Endpoint**: `GET /trips/search?start_date=<start_date>&end_date=<end_date>`
- **Description**: Find trips within a date range.
- **Parameters**: 
  - `start_date: date`
  - `end_date: date`
  - Format is YYYY-MM-DD in url.
- **Returns**:
    ```json
    [
        {
            "destination": "London, UK",
            "duration_days": 7,
            "end_date": "Mon, 08 May 2023 00:00:00 GMT",
            "id": 1,
            "start_date": "Mon, 01 May 2023 00:00:00 GMT",
            "traveler_age": 35,
            "traveler_gender": "Male",
            "traveler_name": "John Smith",
            "traveler_nationality": "American",
            "trip_comment": null
        },
        {
            "destination": "Phuket, Thailand",
            "duration_days": 5,
            "end_date": "Tue, 20 Jun 2023 00:00:00 GMT",
            "id": 2,
            "start_date": "Thu, 15 Jun 2023 00:00:00 GMT",
            "traveler_age": 28,
            "traveler_gender": "Female",
            "traveler_name": "Jane Doe",
            "traveler_nationality": "Canadian",
            "trip_comment": null
        },
        ...
    ]
    ```

## Search trips based on a keyword

- **Endpoint**: `GET /trips/search?query=<keyword>`
- **Description**: Locate trips with a specific keyword.
- **Parameters**: 
  - `query: string`
- **Returns (Ex: Africa)**:
    ```json
    [
        {
            "destination": "Cape Town, South Africa",
            "duration_days": 9,
            "end_date": "Sat, 10 Jun 2023 00:00:00 GMT",
            "id": 146,
            "start_date": "Thu, 01 Jun 2023 00:00:00 GMT",
            "traveler_age": 45,
            "traveler_gender": "Male",
            "traveler_name": "Michael Johnson",
            "traveler_nationality": "South African",
            "trip_comment": null
        },
        {
            "destination": "Africa",
            "duration_days": 10,
            "end_date": "Sun, 22 Sep 2024 00:00:00 GMT",
            "id": 292,
            "start_date": "Thu, 12 Sep 2024 00:00:00 GMT",
            "traveler_age": 28,
            "traveler_gender": "Female",
            "traveler_name": "Alice Smith",
            "traveler_nationality": "American",
            "trip_comment": "Excited for this trip!"
        }
        ...
    ]
    ```

## Search expenses within a certain amount range

- **Endpoint**: `GET /expenses/search?amount_min=<x>&amount_max=<y>`
- **Description**: Identify expenses within a specific cost range. ADDS transportation and accommodation together and shows results in range.
- **Parameters**: 
  - `amount_min: float`
  - `amount_max: float`
- **Returns**:
    ```json
    [
        {
            "accommodation_cost": 1200.0,
            "id": 1,
            "main_accommodation_type": "Hotel",
            "main_transportation_type": "Flight",
            "transportation_cost": 600.0,
            "trip_id": 1
        },
        {
            "accommodation_cost": 800.0,
            "id": 2,
            "main_accommodation_type": "Resort",
            "main_transportation_type": "Flight",
            "transportation_cost": 500.0,
            "trip_id": 2
        },
        ...
    ]
    ```
