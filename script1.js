// BACKEND PROCESSING


// FOR SEARCH
const searchBtn = document.getElementById('search-btn');
const h1 = document.querySelector('h1');
const inputBox1 = document.getElementById('input-box');
const tableBody = document.getElementById('data');
const searchBox = document.querySelector('.search-box');
const dataBox = document.querySelector('.data-box');
const table = document.querySelector('.table');
const sliderContainer = document.querySelector(".range-slider")
table.style.display = 'none';
dataBox.style.display = 'none';

const dataObjects = [];

const slider = document.getElementById("slider");

searchBtn.addEventListener('click', async () => {
  document.getElementsByClassName('loader')[0].style.display = 'block';
  sliderContainer.style.display = 'none';
  const symbol = inputBox1.value;
  console.log(symbol);
  console.log(val1);

  fetch(`https://stock-pred-ucoe.onrender.com/predict?symbol=${symbol}&period=${val1}`)
    .then(response => response.json())
    .then(data => {
      console.log('Response data = ' + data);
      document.getElementsByClassName('loader')[0].style.display = 'none';
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
      }
    })
    .catch(error => console.error(error));
});


// Slider

var val1;

const container = document.querySelectorAll(".range-slider");
for (let i = 0; i < container.length; i++) {
  const slider = container[i].querySelector(".slider");
  const thumb = container[i].querySelector(".slider-thumb");
  const tooltip = container[i].querySelector(".tooltip");
  const progress = container[i].querySelector(".progress");

  function customSlider() {
    const maxVal = slider.getAttribute("max");
    const val = slider.value;

    tooltip.innerHTML = val;

    progress.style.width = (val / maxVal) * 100 + "%";
    thumb.style.left = (val / maxVal) * 100 + "%";
    val1 = val;
  }

  customSlider();

  slider.addEventListener("input", () => {
    customSlider();
  });
}


// slider.addEventListener('input', async () => {
//   const period = slider.value;
//   const symbol = inputBox1.value;
//   fetch(`https://stock-pred-ucoe.onrender.com/predict?symbol=${symbol}&period=${val1}`)
//     .then(res => {
//       res.json()
//         .then(data => {
//           console.log(data);
//           if (data && data.length > 0) {
//             const dataObjects = [];
//             data.forEach((itemData) => {
//               const dataObj = {
//                 date: itemData[0],
//                 price: itemData[1]
//               };
//               dataObjects.push(dataObj);
//             });
//             console.log(dataObjects);
//             updateTable(dataObjects, 10, 1);
//           }
//         })
//         .catch(error => console.log(error));
//     })
//     .catch(error => console.log(error));
// });



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

// Extract dates and prices into separate arrays
const dates = dataObjects.map(item => item.date);
const prices = dataObjects.map(item => item.price);

// Round prices to 2 decimal points
const roundedPrices = prices.map(price => Number(price.toFixed(2)));

// Find the minimum and maximum prices
const minPrice = Math.min(...roundedPrices);
const maxPrice = Math.max(...roundedPrices);


// Set up Chart.js options
const options = {
  scales: {
    y: {
      min: minPrice,
      max: maxPrice,
    },
  },
};

// Set up Chart.js data
const chartData = {
  labels: dates,
  datasets: [{
    label: 'Price',
    data: roundedPrices,
    borderColor: 'blue',
    fill: false,
  }],
};

// Create a new chart using Chart.js
const ctx = document.getElementById("myChart").getContext("2d");
const config = {
  type: 'line',
  data: chartData,
  options: options,
};
const myChart = new Chart(ctx, config);



// Another graph method

// google.charts.load('current', { 'packages': ['corechart'] });
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
//   const dataLabels = dataObjects.map(dataObj => [new Date(dataObj.date), dataObj.price]);

//   var data = google.visualization.arrayToDataTable([
//     ['Date', 'Price'],
//     ...dataLabels
//   ]);


//   var options = {
//     title: 'Company Performance',
//     curveType: 'function',
//     legend: { position: 'bottom' },
//     hAxis: { format: 'MMM dd, yyyy' } // Use this to format the dates in the x-axis
//   };

//   var chart = new google.visualization.LineChart(document.getElementById('stock-graph'));
//   chart.draw(data, options);
// }
