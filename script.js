const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');


  toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars';
}

// AUTOCOMPLETE SEARCHBAR

let availableKeywords = [
  'Activision Blizzard',
  'ATVI',
  'Adobe Inc.',
  'ADBE',
  'ADP',
  'ADP',
  'Airbnb',
  'ABNB',
  'Align Technology',
  'ALGN',
  'Alphabet Inc. (Class A)',
  'GOOGL',
  'Alphabet Inc. (Class C)',
  'GOOG',
  'Amazon',
  'AMZN',
  'Advanced Micro Devices Inc.',
  'AMD',
  'American Electric Power',
  'AEP',
  'Amgen',
  'AMGN',
  'Analog Devices',
  'ADI',
  'Ansys',
  'ANSS',
  'Apple Inc.',
  'AAPL',
  'Applied Materials',
  'AMAT',
  'ASML Holding',
  'ASML',
  'AstraZeneca',
  'AZN',
  'Atlassian',
  'TEAM',
  'Autodesk',
  'ADSK',
  'Baker Hughes',
  'BKR',
  'Biogen',
  'BIIB',
  'Booking Holdings',
  'BKNG',
  'Broadcom Inc.',
  'AVGO',
  'Cadence Design Systems',
  'CDNS',
  'Charter Communications',
  'CHTR',
  'Cintas',
  'CTAS',
  'Cisco',
  'CSCO',
  'Cognizant',
  'CTSH',
  'Comcast',
  'CMCSA',
  'Constellation Energy',
  'CEG',
  'Copart',
  'CPRT',
  'CoStar Group',
  'CSGP',
  'Costco',
  'COST',
  'CrowdStrike',
  'CRWD',
  'CSX Corporation',
  'CSX',
  'Datadog',
  'DDOG',
  'DexCom',
  'DXCM',
  'Diamondback Energy',
  'FANG',
  'Dollar Tree',
  'DLTR',
  'eBay',
  'EBAY',
  'Electronic Arts',
  'EA',
  'Enphase Energy',
  'ENPH',
  'Exelon',
  'EXC',
  'Fastenal',
  'FAST',
  'Fiserv',
  'FISV',
  'Fortinet',
  'FTNT',
  'Gilead Sciences',
  'GILD',
  'GlobalFoundries',
  'GFS',
  'Honeywell',
  'HON',
  'Idexx Laboratories',
  'IDXX',
  'Illumina, Inc.',
  'ILMN',
  'Intel',
  'INTC',
  'Intuit',
  'INTU',
  'Intuitive Surgical',
  'ISRG',
  'JD.com',
  'JD',
  'Keurig Dr Pepper',
  'KDP',
  'KLA Corporation',
  'KLAC',
  'Kraft Heinz',
  'KHC',
  'Lam Research',
  'LRCX',
  'Lucid Motors',
  'LCID',
  'Lululemon',
  'LULU',
  'Marriott International',
  'MAR',
  'Marvell Technology',
  'MRVL',
  'MercadoLibre',
  'MELI',
  'Meta Platforms',
  'META',
  'Microchip Technology',
  'MCHP',
  'Micron Technology',
  'MU',
  'Microsoft',
  'MSFT',
  'Moderna',
  'MRNA',
  'Mondelēz International',
  'MDLZ',
  'Monster Beverage',
  'MNST',
  'Netflix',
  'NFLX',
  'Nvidia',
  'NVDA',
  'NXP',
  'NXPI',
  "O'Reilly Automotive",
  'ORLY',
  'Old Dominion Freight Line',
  'ODFL',
  'Paccar',
  'PCAR',
  'Palo Alto Networks',
  'PANW',
  'Paychex',
  'PAYX',
  'PayPal',
  'PYPL',
  'PDD Holdings',
  'PDD',
  'PepsiCo',
  'PEP',
  'Qualcomm',
  'QCOM',
  'Regeneron',
  'REGN',
  'Rivian',
  'RIVN',
  'Ross Stores',
  'ROST',
  'Seagen',
  'SGEN',
  'Sirius XM',
  'SIRI',
  'Starbucks',
  'SBUX',
  'Synopsys',
  'SNPS',
  'T-Mobile US',
  'TMUS',
  'Tesla, Inc.',
  'TSLA',
  'Texas Instruments',
  'TXN',
  'Verisk',
  'VRSK',
  'Vertex Pharmaceuticals',
  'VRTX',
  'Walgreens Boots Alliance',
  'WBA',
  'Warner Bros. Discovery',
  'WBD',
  'Workday, Inc.',
  'WDAY',
  'Xcel Energy',
  'XEL',
  'Zoom Video Communications',
  'ZM',
  'Zscaler',
  'ZS',
];

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

inputBox.onkeyup = function () {
  let result = [];
  let input = inputBox.value;
  if (input.length) {
    result = availableKeywords.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
    console.log(result);
  }
  display(result);
  
  if (!result.length) {
    resultsBox.innerHTML = '';
  }
}

function display(result) {
  const content = result.map((list) => {
    return "<li onclick=selectInput(this)>" + list + "</li>";
  });

  resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list) {
  inputBox.value = list.innerHTML;
  resultsBox.innerHTML = '';
}
