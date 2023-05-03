// BACKEND PROCESSING


// FOR SEARCH
const searchBtn = document.getElementById('search-btn');
const h1 = document.querySelector('h1');
const inputBox1 = document.getElementById('input-box');
const tableBody = document.getElementById('data');
const searchBox = document.querySelector('.search-box');
const dataBox = document.querySelector('.data-box');
const table = document.querySelector('.table');
table.style.display = 'none';
dataBox.style.display = 'none';

const dataObjects = [];

const sliderContainer = document.getElementById("slider-container");
const slider = document.getElementById("slider");

searchBtn.addEventListener('click', async () => {
  const symbol = inputBox1.value;
  fetch(`https://stock-pred-ucoe.onrender.com/predict?symbol=${symbol}&period=50`)
    .then(res => {
      res.json()
        .then(data => {
          console.log(data);
          if (data && data.length > 0) {
            data.forEach((itemData) => {
              const dataObj = {
                date: itemData[0],
                price: itemData[1]
              };
              dataObjects.push(dataObj);
            });
            console.log(dataObjects);
            updateTable(dataObjects, 10, 1);
            h1.style.display = 'none';
            searchBox.style.display = 'none';
            table.style.display = 'flex';
            dataBox.style.display = 'flex';
            sliderContainer.style.display = 'block';
            slider.value = 50;
          }
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});

slider.addEventListener('input', async () => {
  const period = slider.value;
  const symbol = inputBox1.value;
  fetch(`https://stock-pred-ucoe.onrender.com/predict?symbol=${symbol}&period=${period}`)
    .then(res => {
      res.json()
        .then(data => {
          console.log(data);
          if (data && data.length > 0) {
            const dataObjects = [];
            data.forEach((itemData) => {
              const dataObj = {
                date: itemData[0],
                price: itemData[1]
              };
              dataObjects.push(dataObj);
            });
            console.log(dataObjects);
            updateTable(dataObjects, 10, 1);
          }
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});



// For Updating the table

function updateTable(data, itemsPerPage, currentPage = 1) {
  const tableBody = document.getElementById('data');
  tableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Create header row
  const headerRow = document.createElement('tr');
  const SnoHeader = document.createElement('th');
  const dateHeader = document.createElement('th');
  const priceHeader = document.createElement('th');
  SnoHeader.textContent = 'S.NO';
  dateHeader.textContent = 'Date';
  priceHeader.textContent = 'Price';
  headerRow.appendChild(SnoHeader);
  headerRow.appendChild(dateHeader);
  headerRow.appendChild(priceHeader);
  tableBody.appendChild(headerRow);


  // Create data rows
  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const row = document.createElement('tr');
    const snoCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const priceCell = document.createElement('td');
    snoCell.textContent = i + 1;
    dateCell.textContent = data[i].date;
    priceCell.textContent = data[i].price;
    row.appendChild(snoCell);
    row.appendChild(dateCell);
    row.appendChild(priceCell);
    tableBody.appendChild(row);
  }

  // Create pagination buttons
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Prev';
    prevButton.addEventListener('click', () => {
      updateTable(data, itemsPerPage, currentPage - 1);
    });
    pagination.appendChild(prevButton);
  }
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    if (i === currentPage) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      updateTable(data, itemsPerPage, i);
      const activeButton = pagination.querySelector('.active');
      if (activeButton) {
        activeButton.classList.remove('active');
      }
      button.classList.add('active');
    });
    pagination.appendChild(button);
  }
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      updateTable(data, itemsPerPage, currentPage + 1);
    });
    pagination.appendChild(nextButton);
  }

  // Add pagination to table container
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';
  tableContainer.appendChild(tableBody);
  const paginationWrapper = document.createElement('div');
  paginationWrapper.classList.add('pagination-wrapper');
  tableContainer.appendChild(paginationWrapper);
  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.addEventListener('click', () => {
      updateTable(data, itemsPerPage, currentPage - 1);
    });
    paginationWrapper.appendChild(prevButton);
  }
  paginationWrapper.appendChild(pagination);
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.addEventListener('click', () => {
      updateTable(data, itemsPerPage, currentPage + 1);
    });
    paginationWrapper.appendChild(nextButton);
  }
}




// For the graph

// const dataLabels = dataObjects.map(dataObj => dataObj.date);
// const dataValues = dataObjects.map(dataObj => dataObj.price);


// // Define Data
// const data = [{
//   x: dataLabels,
//   y: dataValues,
//   mode: "lines"
// }];

// // Define Layout
// const layout = {
//   xaxis: { title: "Square Meters" },
//   yaxis: { range: [160, 163], title: "Price" },
//   title: "Date vs Price"
// };

// // Display using Plotly
// Plotly.newPlot("stock-graph", data, layout);

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  const dataLabels = dataObjects.map(dataObj => [new Date(dataObj.date), dataObj.price]);

  var data = google.visualization.arrayToDataTable([
    ['Date', 'Price'],
    ...dataLabels
  ]);


  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { format: 'MMM dd, yyyy' } // Use this to format the dates in the x-axis
  };

  var chart = new google.visualization.LineChart(document.getElementById('stock-graph'));
  chart.draw(data, options);
}
