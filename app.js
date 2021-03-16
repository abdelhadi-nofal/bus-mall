
'use strict';

const names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'glass'];


const imageSection = document.getElementById('imagesSection');
const leftImage = document.getElementById('leftImage');
const middleImage = document.getElementById('middleImage');
const rightImage = document.getElementById('rightImage');



function prodcts(name) {
  this.name = name;
  if (name === 'usb') {
    this.ext = '.gif';
  } else if (name === 'sweep') {
    this.ext = '.png';
  } else {
    this.ext = '.jpg';
  }
  this.path = 'img/' + this.name + this.ext;
  this.views = 0;
  this.votes = 0;
  prodcts.all.push(this);

}

prodcts.all = [];

for (let i = 0; i < names.length; i++) {
  new prodcts(names[i]);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}






let shown = [];
function render() {
  let leftIndex;
  let middleIndex;
  let rightIndex;
  do {

    leftIndex = randomNumber(0, prodcts.all.length - 1);
    const leftRandomprodcts = prodcts.all[leftIndex];

    middleIndex = randomNumber(0, prodcts.all.length - 1);
    const middleRandomprodcts = prodcts.all[middleIndex];

    rightIndex = randomNumber(0, prodcts.all.length - 1);
    const rightRandomprodcts = prodcts.all[rightIndex];


    leftImage.src = leftRandomprodcts.path;
    leftImage.title = leftRandomprodcts.name;
    leftImage.alt = leftRandomprodcts.name;
    prodcts.all[leftIndex].views++;

    middleImage.src = middleRandomprodcts.path;
    middleImage.title = middleRandomprodcts.name;
    middleImage.alt = middleRandomprodcts.name;
    prodcts.all[middleIndex].views++;

    rightImage.src = rightRandomprodcts.path;
    rightImage.title = rightRandomprodcts.name;
    rightImage.alt = rightRandomprodcts.name;
    prodcts.all[rightIndex].views++;

  } while (leftIndex === rightIndex || rightIndex === middleIndex || middleIndex === leftIndex || shown.includes(leftIndex) || shown.includes(middleIndex) || shown.includes(rightIndex));
  shown[0] = leftIndex;
  shown[1] = middleIndex;
  shown[2] = rightIndex;

}

render();


imageSection.addEventListener('click', clickHandler);
let cnt = 0;
let rounds = 24;
function clickHandler(event) {

  if (event.target.id === 'leftImage' || event.target.id === 'middleImage' || event.target.id === 'rightImage') {

    for (let i = 0; i < prodcts.all.length; i++) {
      if (prodcts.all[i].name === event.target.title) {
        prodcts.all[i].votes++;
        console.table(prodcts.all[i]);
      }
    }

    render();
  }
  if (cnt === rounds) {
    for (let i = 0; i < prodcts.all.length; i++) {

      document.getElementById('resultBtn').addEventListener('click', function () {

        CreateChart();
      });

      imageSection.removeEventListener('click', clickHandler);

    }
    localStorage.setItem('prodcts', JSON.stringify(prodcts.all));
  }
  cnt++;

}

function getprodcts(){
  // retrieve data from local storage
  const data = localStorage.getItem('prodcts');
  if (data){
    const datae=JSON.parse(data);
    prodcts.all=datae;
    // render();
  }
  // convert the data (array) from a string to something that we can use in JavaScript.
  return JSON.parse(data);
}
getprodcts();

function CreateChart() {
  let context = document.getElementById('myChart').getContext('2d');
  let getprodctsNames = [];
  let getprodctsVotes = [];
  let getprodctsViews = [];

  for (let i = 0; i < prodcts.all.length; i++) {
    getprodctsNames.push(prodcts.all[i].name);
  }
  for (let i = 0; i < prodcts.all.length; i++) {
    getprodctsVotes.push(prodcts.all[i].votes);
  }
  for (let i = 0; i < prodcts.all.length; i++) {
    getprodctsViews.push(prodcts.all[i].views);
  }
  let chartObject = {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels: getprodctsNames,
      datasets: [{
        label: 'prodcts voting results',
        backgroundColor: 'rgb(100, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: getprodctsVotes,
      }, {
        label: 'prodcts views results',
        backgroundColor: 'rgb(250, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: getprodctsViews,
      }],
    },

    // Configuration options go here
    options: {

      scales: {
        xAxes: [{
          barPercentage: 1
        }]
      }

    }
  };

  let chart = new Chart(context, chartObject);
}

render();
