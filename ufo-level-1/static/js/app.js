// from data.js
const _tableData = data;

// copy the table data to the filtered table
var filteredTable = _tableData;

// select the table 
var table = d3.select("#ufo-table>tbody");

// table creation function
function createRow(entry) {
    let row = table.append("tr"); //create new row
    
    // create cell for each of the data points
    Object.entries(entry).forEach(([key, value]) => row.append("td").text(value));
}

// clear the table and reset the filtered table
function reset() {
    table.text("");
    filteredTable = _tableData;
}

// filtering function
function filter() {
    // prevent page refresh
    d3.event.preventDefault();

    // reset current table
    reset();

    // filter based on user inputs
    let userInput = d3.select(`#datetime`).property("value");
    if (userInput !== "") {
        filteredTable = filteredTable.filter(entry => entry.datetime === userInput);
    }

    // check to see if there are any values that
    // will show based on the search criteria
    // if not, advise user, otherwise, print table
    if (filteredTable.length === 0) {
        table.text("");
        alert("There are no UFO entries based on your search criteria.");
    } else {
        filteredTable.forEach(createRow);    
    }
}

// loop and build the table
filteredTable.forEach(createRow);

// add event handlers
d3.select("form").on("submit", filter);
d3.select("#filter-btn").on("click", filter);