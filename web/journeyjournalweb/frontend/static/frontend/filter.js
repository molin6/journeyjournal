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
