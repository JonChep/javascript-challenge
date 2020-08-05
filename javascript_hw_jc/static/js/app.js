// from data.js
var tableData = data;

// Sselect tbody 
tbody = d3.select("tbody")

// Loop thru table on object entries
function displayData(something){ 
    tbody.text("")
    something.forEach(function(et_sighting){
    new_tr = tbody.append("tr")
    Object.entries(et_sighting).forEach(function([key, value]){
        new_td = new_tr.append("td").text(value)	
    })
})}

displayData(tableData)

// Set up submit button
var submit = d3.select("#submit");

submit.on("click", function() {

  // Prevent refresh
  d3.event.preventDefault();

  // Select input element, get node
  var dateInput = d3.select("#datetime");
  var cityInput = d3.select("#city");
  var stateInput = d3.select("#state");
  var countryInput = d3.select("#country");
  var shapeInput = d3.select("#shape");

  //create variable which filters the table if a user enters partial info

 var filtered = tableData.filter(et_sighting =>{
  return (et_sighting.datetime===dateInput.property("value") || !dateInput.property("value") ) && 
            (et_sighting.city===cityInput.property("value") || !cityInput.property("value")) &&
            (et_sighting.state===stateInput.property("value") || !stateInput.property("value")) &&
            (et_sighting.country===countryInput.property("value") || !countryInput.property("value")) &&
            (et_sighting.shape===shapeInput.property("value") || !shapeInput.property("value"))
 })

 //run filtered entries thru the displayData function, update table
 displayData(filtered);


});

var filterInputs = d3.selectAll('.form-control');

// Clear input fields/object
function clearEntries() {
    filters = {};

    // Set all input fields to empty
    filterInputs._groups[0].forEach(entry => {
        if (entry.value != 0) {
            d3.select('#' + entry.id).node().value = "";
        }
    });
};

var clearButton = d3.select("#clear");

// Clear button on click
clearButton.on('click', function () {

    // Refresh table, not whole page
    d3.event.preventDefault();
    // Clear input fields
    clearEntries()
});
