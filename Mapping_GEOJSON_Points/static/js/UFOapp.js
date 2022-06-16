// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var bunchOFilters = []

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let changedValue = changedElement.property("value").toLowerCase();
    console.log(changedValue)
    // 4c. Save the id of the filter that was changed as a variable.
    let changedFilter = changedElement.property("id");
    console.log(changedFilter)
    // make a copy of the data

    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (changedValue) {
      bunchOFilters[changedFilter] = changedValue
    }
    else
      delete bunchOFilters[changedFilter];
    console.log(bunchOFilters)

    // 6. Call function to apply all filters and rebuild the table
    filterTable(bunchOFilters);
    
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable(filterList) {
  
    // 8. Set the filtered data to the tableData.
    let dataCopy = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    let keys = Object.keys(filterList)
    console.log(keys)
    let values = Object.values(filterList)
    console.log(values)
    filteredData = [""]
    // filteredData = dataCopy.filter(row => (bunchOFilters.map(([key, value]) => row[key] == row[value])));
    if (keys.length === 0){
      buildTable(tableData)}
    else {

      let filteredData = dataCopy.filter(row => {
        keep = true;
        if (keys.includes("datetime")) {
          keep = keep && row.datetime.includes(filterList.datetime);
        }
        if (keys.includes("city")) {
          keep = keep && row.city.includes(filterList.city);
        }
        if (keys.includes("state")) {
          keep = keep && row.state.includes(filterList.state);
        }
        if (keys.includes("country")) {
          keep = keep && row.country.includes(filterList.country);
        }
        if (keys.includes("shape")) {
          keep = keep && row.shape.includes(filterList.shape);
        }
        return keep;
      });
      // option three only one filter
      // let filteredData = dataCopy.filter(row => {
      //   for (let step=0; step < keys.length; step++) {
      //     return row[keys[step]] == values[step];
      //     console.log('filters = ' + keys[step] + ': ' + values[step]);}
          
      // });

    // option one only filters one filter at a time. data is over written each loop
      // for (let step=0; step < keys.length; step++) {
      //   filteredData = (dataCopy.filter(row => row[keys[step]] == values[step]));
      //   console.log('filters = ' + keys[step] + ': ' + values[step]);
      
    // option two can only filter when there is one filter
      // let filteredData = dataCopy.filter(row => row[keys].includes(values))

      // let filteredData = dataCopy.filter(row => row[keys].includes(values))
      
      // let filteredData = Object.entries(filterList).forEach(([key, value]) => 
      //   dataCopy.filter(row => row[key] == value)
        //  console.log(key + ': ' + value);
      
      // let filteredData = dataCopy.forEach((dataRow) => {

      // })
      // 10. Finally, rebuild the table using the filtered data
      console.log(filteredData);
      buildTable(filteredData);
      };
    };
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  d3.select("select").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
