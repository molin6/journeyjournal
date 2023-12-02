let tripsData; // Will hold the initial data from the server
let filteredData; // Will hold data after applying filters
let currentPage = 1;
const itemsPerPage = 8;

// Populate tripsData from the Django template
document.addEventListener('DOMContentLoaded', function() {
    const tripsDataElement = document.getElementById('trips-data');
    tripsData = JSON.parse(tripsDataElement.textContent);
    populateFilters();
    filteredData = tripsData; // Initialize filteredData with all trips
    displayPage(); // Display the first page
});

function populateFilters() {
    const destinationSet = new Set();
    const originSet = new Set();

    tripsData.forEach(item => {
        destinationSet.add(item.destination);
        originSet.add(item.traveler_nationality);
    });

    const destinationSelect = document.getElementById("destinationFilter");
    const originSelect = document.getElementById("originFilter");

    // Populate the destination dropdown
    destinationSet.forEach(destination => {
        const option = document.createElement("option");
        option.value = option.text = destination;
        destinationSelect.appendChild(option);
    });

    // Populate the origin dropdown
    originSet.forEach(origin => {
        const option = document.createElement("option");
        option.value = option.text = origin;
        originSelect.appendChild(option);
    });
}


function displayPage() {
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear the table

    // Get the slice of data to display on the current page
    const pageData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Create table rows for the current page's data
    pageData.forEach(item => {
        let row = tableBody.insertRow();
        row.onclick = () => openModal(item.id);
        row.insertCell(0).textContent = item.traveler_name;
        row.insertCell(1).textContent = item.destination;
        row.insertCell(2).textContent = item.duration_days;
        row.insertCell(3).textContent = item.traveler_nationality;
    });

    updatePagination(); // Update the pagination controls
}

function filterTable() {
    // Grab filter values
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var destinationFilter = document.getElementById("destinationFilter").value.toLowerCase();
    var durationFilter = document.getElementById("durationFilter").value;
    var originFilter = document.getElementById("originFilter").value.toLowerCase();

    // Apply filters to tripsData
    filteredData = tripsData.filter(item => {
        // Check for match against filters
        // Adjust conditions as necessary
        return (item.traveler_name.toLowerCase().includes(searchInput) || 
                item.destination.toLowerCase().includes(searchInput) ||
                item.duration_days.toString().includes(searchInput) ||
                item.traveler_nationality.toLowerCase().includes(searchInput)) &&
               (destinationFilter === "" || item.destination.toLowerCase().includes(destinationFilter)) &&
               (durationFilter === "" || item.duration_days.toString().includes(durationFilter)) &&
               (originFilter === "" || item.traveler_nationality.toLowerCase().includes(originFilter));
    });

    currentPage = 1; // Reset to first page after filter
    displayPage(); // Update the displayed table
}

function updatePagination() {
    // Update pagination info based on filteredData
    const pageInfo = document.getElementById('page-info');
    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredData.length / itemsPerPage)}`;

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    if (prevButton) prevButton.disabled = currentPage === 1;
    if (nextButton) nextButton.disabled = currentPage === Math.ceil(filteredData.length / itemsPerPage);
}

function changePage(step) {
    // Calculate new page number
    const newPage = currentPage + step;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Check page limits
    currentPage = Math.max(1, Math.min(newPage, totalPages));

    displayPage(); // Update the displayed table
}

function openModal(tripId) {
    document.getElementById('tripDetailsModal').dataset.tripId = tripId;
    console.log(tripId)
    // Fetch trip details from the API
    fetch(`http://127.0.0.1:5000/trips/${tripId}/details`)
        .then(response => response.json())
        .then(data => {
            populateModal(data);
            document.getElementById('tripDetailsModal').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}
function reloadPage() {
    location.reload(); // This reloads the current page
}

function closeModal() {
    document.getElementById('tripDetailsModal').style.display = 'none';
    reloadPage();
}

function populateModal(data) {
    let categories = data.categories ? data.categories.join(', ') : '';

    let expensesContent = '';
    if (data.expenses && Array.isArray(data.expenses)) {
        expensesContent = data.expenses.map(expense => {
            return `
                <div class="expense-item">
                    <strong>Accommodation:</strong> <span>${expense.main_accommodation_type} - $${expense.accommodation_cost}</span>
                </div>
                <div class="expense-item">
                    <strong>Transportation:</strong> <span>${expense.main_transportation_type} - $${expense.transportation_cost}</span>
                </div>
            `;
        }).join('');
    }

    let detailsHtml = `
        <div class="modal-header">
            <h2>Trip Details</h2>
            <span class="close-modal" onclick="closeModal()">&times;</span>
        </div>
        <div class="modal-body">
            <div class="detail-item"><strong>Traveler Name:</strong> <span>${data.traveler_name}</span></div>
            <div class="detail-item"><strong>Destination:</strong> <span>${data.destination}</span></div>
            <div class="detail-item"><strong>Duration:</strong> <span>${data.duration_days} days</span></div>
            <div class="detail-item"><strong>Start Date:</strong> <span>${data.start_date}</span></div>
            <div class="detail-item"><strong>End Date:</strong> <span>${data.end_date}</span></div>
            <div class="detail-item"><strong>Traveler Age:</strong> <span>${data.traveler_age}</span></div>
            <div class="detail-item"><strong>Traveler Gender:</strong> <span>${data.traveler_gender}</span></div>
            <div class="detail-item"><strong>Traveler Nationality:</strong> <span>${data.traveler_nationality}</span></div>
            <div class="detail-item"><strong>Categories:</strong> <span>${categories}</span></div>
            ${expensesContent}
        </div>
        <div class="modal-footer">
        <textarea id="tripComment" placeholder="Add a comment...">${data.trip_comment || ''}</textarea>
        <button id="dynamicSaveCommentButton">Save Comment</button>
        <div id="saveMessage" style="display: none;">Comment saved successfully!</div>
    </div>
`;
    document.getElementById('tripDetails').innerHTML = detailsHtml;
        // Populate the comment textarea
        document.getElementById('dynamicSaveCommentButton').addEventListener('click', function() {
            const modalTripId = document.getElementById('tripDetailsModal').dataset.tripId;
            const commentText = document.getElementById('tripComment').value;
            saveComment(modalTripId, commentText);
        });
}
console.log("JavaScript is running."); // Add this line at the top of your JavaScript code

async function saveComment(tripId, comment) {
    if (!tripId || !comment) {
        console.error('Trip ID or comment is missing');
        return;
    }
    try {
        const response = await fetch(`http://127.0.0.1:5000/trips/${tripId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                trip_comment: comment,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Comment saved successfully');

            // Display the success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            // Hide the success message after 3 seconds (3000 milliseconds)
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 3000);

            return true;
        } else {
            console.error('Error saving comment:', data.error);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}



function toggleEditForms() {
    let editForms = document.getElementById('editForms');
    let tripDetails = document.getElementById('tripDetails');
    let editTripButton = document.getElementById('editTripButton');
    let saveEditButton = document.getElementById('saveEditButton');
    let deleteButtonContainer = document.getElementById('deleteButtonContainer');

    // Check if the elements exist to prevent null reference errors
    if (!editForms || !tripDetails || !editTripButton || !saveEditButton || !deleteButtonContainer) {
        console.error('Some elements do not exist in the DOM');
        return;
    }

    let detailItems = tripDetails.querySelectorAll('.detail-item span');
    let commentBox = document.getElementById('tripComment');

    // Toggle between showing the edit form and the details
    if (editForms.style.display === 'none') {
        // Show the edit form
        editForms.style.display = 'block';
        tripDetails.style.display = 'none';
        editTripButton.style.display = 'none';
        saveEditButton.style.display = 'block';
        deleteButtonContainer.style.display = 'none'; // Hide the Delete Trip button
        if (commentBox) commentBox.style.display = 'none';

        // Assuming the order of detailItems matches the order of your edit fields
        document.getElementById('editTravelerName').value = detailItems[0].textContent.trim();
        document.getElementById('editDestination').value = detailItems[1].textContent.trim();
        document.getElementById('editDurationDays').value = detailItems[2].textContent.trim().split(' ')[0];
        document.getElementById('editStartDate').value = formatDateForInput(detailItems[3].textContent.trim());
        document.getElementById('editEndDate').value = formatDateForInput(detailItems[4].textContent.trim());
        document.getElementById('editTravelerAge').value = detailItems[5].textContent.trim();
        document.getElementById('editTravelerGender').value = detailItems[6].textContent.trim();
        document.getElementById('editTravelerNationality').value = detailItems[7].textContent.trim();

        // Ensure the category field is shown in edit mode
        let categoryBox = document.getElementById('editTripCategory');
        if (categoryBox) {
            categoryBox.style.display = 'block';
        }
    } else {
        // Hide the edit form and show the details
        editForms.style.display = 'none';
        tripDetails.style.display = 'block';
        editTripButton.style.display = 'block';
        saveEditButton.style.display = 'none';
        deleteButtonContainer.style.display = 'block'; // Show the Delete Trip button
        if (commentBox) commentBox.style.display = 'block';
    }
}








function formatDateForInput(dateTimeString) {
    // Convert to YYYY-MM-DD format for date input fields
    const date = new Date(dateTimeString);
    const normalizedDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset()*60000));
    return normalizedDate.toISOString().split('T')[0];
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
}


function saveEdit() {
    let tripId = document.getElementById('tripDetailsModal').dataset.tripId; // This should retrieve the correct trip ID

    // Check if tripId is undefined and handle the error if needed
    if (!tripId) {
        console.error('Trip ID is undefined');
        alert('There was an error retrieving the trip ID.');
        return;
    }

    let formattedStartDate = formatDate(document.getElementById('editStartDate').value);
    let formattedEndDate = formatDate(document.getElementById('editEndDate').value);

    // Gather the data from the form inputs
    let data = {
        traveler_name: document.getElementById('editTravelerName').value,
        destination: document.getElementById('editDestination').value,
        duration_days: parseInt(document.getElementById('editDurationDays').value, 10),
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        traveler_age: parseInt(document.getElementById('editTravelerAge').value, 10),
        traveler_gender: document.getElementById('editTravelerGender').value,
        traveler_nationality: document.getElementById('editTravelerNationality').value,
        trip_comment: document.getElementById('tripComment').value
    };

    // Send the PUT request to the server
    fetch(`http://127.0.0.1:5000/trips/${tripId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(updatedTrip => {
        // Handle the updated trip response here
        // This is where you would update the trip details in the UI
        populateModal(updatedTrip);
        toggleEditForms(); // Switch back to display mode
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem saving the trip details.');
    });
}

function showDeleteConfirmation() {
    document.getElementById('deleteConfirmation').style.display = 'block';
}

function cancelDelete() {
    document.getElementById('deleteConfirmation').style.display = 'none';
}

function deleteTrip() {
    // Get the trip ID from the modal
    let tripId = document.getElementById('tripDetailsModal').dataset.tripId;

    // Check if tripId is undefined and handle the error if needed
    if (!tripId) {
        console.error('Trip ID is undefined');
        alert('There was an error retrieving the trip ID.');
        return;
    }

    // Send a DELETE request to the server to delete the trip
    fetch(`http://127.0.0.1:5000/trips/${tripId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(deletedTrip => {
        // Handle the deleted trip response here
        // This is where you would remove the trip details from the UI
        console.log('Trip deleted successfully:', deletedTrip);
        closeModal(); // Close the modal after deletion or update the UI as needed
        document.getElementById('successMessage').style.display = 'block'; // Show success message
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem deleting the trip.');
    });
}


function addTrip() {
    // Collect values from input fields
    const travelerName = document.getElementById("travelerName").value;
    const destination = document.getElementById("destination").value;
    const durationDays = parseInt(document.getElementById("durationDays").value);
    const startDate = formatDate(document.getElementById("startDate").value);
    const endDate = formatDate(document.getElementById("endDate").value);
    const travelerAge = parseInt(document.getElementById("travelerAge").value);
    const travelerGender = document.getElementById("travelerGender").value;
    const travelerNationality = document.getElementById("travelerNationality").value;
    const tripCategory = document.getElementById("tripCategory").value;

    // Construct the trip object
    const tripData = {
        destination: destination,
        start_date: startDate,
        end_date: endDate,
        duration_days: durationDays,
        traveler_name: travelerName,
        traveler_age: travelerAge,
        traveler_gender: travelerGender,
        traveler_nationality: travelerNationality,
        trip_comment: tripCategory
    };

    // Send a POST request to the endpoint
    fetch('http://127.0.0.1:5000/trips', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tripData)
    })
    .then(response => {
        if (response.ok) {
            // Trip added successfully, you can close the modal or handle the response as needed
            console.log("Trip added successfully");
            closeAddTripModal();
        } else {
            // Handle errors if needed
            console.error("Error adding trip");
        }
    })
    .catch(error => {
        // Handle network errors
        console.error("Network error:", error);
    });
}


// Define the openAddTripModal function
function openAddTripModal() {
    // Code to open the modal for adding a new trip goes here
    // For example, if you have a modal with an ID "addTripModal", you can open it like this:
    document.getElementById("addTripModal").style.display = "block";
}

// Define the closeAddTripModal function
function closeAddTripModal() {
    // Code to close the modal for adding a new trip goes here
    // For example, if you have a modal with an ID "addTripModal", you can close it like this:
    document.getElementById("addTripModal").style.display = "none";
    reloadPage();
}

// Function to populate the category dropdown
function populateCategoryDropdown(categories) {
    const categoryDropdown = document.getElementById("tripCategory");
    
    // Clear existing options
    categoryDropdown.innerHTML = "";
    
    // Create an "All Categories" option
    const allCategoriesOption = document.createElement("option");
    allCategoriesOption.value = ""; // You can set the value to an empty string or whatever is appropriate
    allCategoriesOption.textContent = "All Categories";
    categoryDropdown.appendChild(allCategoriesOption);
    
    // Populate options from the API response
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id; // You can set the value to the category's ID or another identifier
        option.textContent = category.category_name;
        categoryDropdown.appendChild(option);
    });
}

// Function to fetch categories and populate the dropdown
function fetchAndPopulateCategories() {
    fetch('http://127.0.0.1:5000/categories')
    .then(response => response.json())
    .then(data => {
        // Call the function to populate the dropdown
        populateCategoryDropdown(data);
    })
    .catch(error => {
        console.error("Error fetching categories:", error);
    });
}

// Call the function to fetch and populate categories when the page loads or as needed
fetchAndPopulateCategories();

