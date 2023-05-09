let tickers = [];
fetch('tickers.json')
  .then((response) => response.json())
  .then((data) => {
    tickers = data;
  })
  .catch((error) => console.log(error));

const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.addEventListener('click', function () {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');

  toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars';

});

// AUTOCOMPLETE SEARCHBAR

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

inputBox.onkeyup = function () {
  let result = [];
  let input = inputBox.value.toUpperCase();
  if (input.length) {
    result = tickers.filter((ticker) => {
      return ticker.Symbol.toUpperCase().startsWith(input) ||
        ticker.Name.toUpperCase().startsWith(input);
    });
  }
  display(result);

  if (!result.length) {
    resultsBox.innerHTML = '';
  }
}

function display(result) {
  const content = result.map((ticker) => {
    return `<li onclick=selectInput(this) data-symbol="${ticker.Symbol}">${ticker.Symbol} (${ticker.Name})</li>`;
  });

  resultsBox.innerHTML = `<ul>${content.join('')}</ul>`;
}

function selectInput(list) {
  inputBox.value = list.getAttribute('data-symbol');
  resultsBox.innerHTML = '';
}
