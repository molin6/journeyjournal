let tripsData;

document.addEventListener('DOMContentLoaded', function() {
    const tripsDataElement = document.getElementById('trips-data');
    tripsData = JSON.parse(tripsDataElement.textContent);

    console.log(tripsData)

    filteredData = tripsData; // Initialize with full dataset
    displayPage(); // Populate table initially
});
let currentPage = 1;
const itemsPerPage = 10;
let filteredData = [];

// Function to display the current page
function displayPage() {
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear current table body

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredData.slice(startIndex, endIndex);

    // Populate table rows
    paginatedItems.forEach(item => {
        let row = tableBody.insertRow();
        row.insertCell(0).innerHTML = item.traveler_name;
        row.insertCell(1).innerHTML = item.destination;
        row.insertCell(2).innerHTML = item.duration_days;
        row.insertCell(3).innerHTML = item.traveler_nationality;
    });

    // Update pagination info
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${Math.ceil(filteredData.length / itemsPerPage)}`;
}


// Function to change the current page
function changePage(step) {
    const numberOfPages = Math.ceil(filteredData.length / itemsPerPage);
    currentPage = Math.max(1, Math.min(currentPage + step, numberOfPages));
    displayPage();
}

// Function to filter the table based on search input
function filterTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    filteredData = tripsData.filter(item => item.traveler_name.toLowerCase().includes(searchInput));
    currentPage = 1; // Reset to the first page
    displayPage();
}

console.log(tripsData)