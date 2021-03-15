
'use strict';

const names = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun', 'unicorn', 'usb','water-can','glass' ];


const imageSection=document.getElementById('imagesSection');
const leftImage=document.getElementById('leftImage');
const middleImage=document.getElementById('middleImage');
const rightImage=document.getElementById('rightImage');



function prodcts(name){
  this.name = name;
  if (name === 'usb') {
    this.ext = '.gif';
  } else if (name === 'sweep') {
    this.ext = '.png';
  } else {
    this.ext = '.jpg';
  }
  this.path = 'img/' + this.name + this.ext;
  this.views=0;
  this.votes=0;
  prodcts.all.push(this);

}


prodcts.all=[];

for(let i=0;i<names.length;i++){
  new prodcts(names[i]);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render(){

  do{const leftIndex=randomNumber(0,prodcts.all.length-1);
    const leftRandomprodcts=prodcts.all[leftIndex];
    const middleIndex=randomNumber(0,prodcts.all.length-1);
    const middleRandomprodcts=prodcts.all[middleIndex];
    const rightIndex=randomNumber(0,prodcts.all.length-1);
    const rightRandomprodcts=prodcts.all[rightIndex];

    if(leftRandomprodcts!==middleRandomprodcts && leftRandomprodcts!==rightRandomprodcts)
    {
      leftImage.src=leftRandomprodcts.path;
      leftImage.title=leftRandomprodcts.name;
      leftImage.alt=leftRandomprodcts.name;
      prodcts.all[leftIndex].views++;
    }else{
      break;
    }
    if(leftRandomprodcts!==middleRandomprodcts && middleRandomprodcts!==rightRandomprodcts){
      middleImage.src=middleRandomprodcts.path;
      middleImage.title=middleRandomprodcts.name;
      middleImage.alt=middleRandomprodcts.name;
      prodcts.all[middleIndex].views++;}else{
      break;
    }

    if(rightRandomprodcts!==middleRandomprodcts && leftRandomprodcts!==rightRandomprodcts){
      rightImage.src=rightRandomprodcts.path;
      rightImage.title=rightRandomprodcts.name;
      rightImage.alt=rightRandomprodcts.name;
      prodcts.all[rightIndex].views++;}else{
      break;
    }
  } while (leftImage === middleImage || leftImage ===rightImage || rightImage ===middleImage);
}

render();


imageSection.addEventListener('click',clickHandler);
let cnt=0;
let rounds=24;
function clickHandler(event){

  if (event.target.id === 'leftImage' || event.target.id === 'middleImage' || event.target.id === 'rightImage')
  {

    for(let i=0;i<prodcts.all.length;i++){
      if (prodcts.all[i].name === event.target.title){
        prodcts.all[i].votes++;
        console.table(prodcts.all[i]);
        console.log(prodcts.all[i].votes);
      }
    }
    console.log(cnt);
    render();
  }
  if (cnt === rounds) {
    for(let i=0;i<prodcts.all.length;i++){

      document.getElementById('resultBtn').addEventListener('click', function() {

        CreateChart();
      });
      imageSection.removeEventListener('click', clickHandler);
    }}
  cnt++;

}

function CreateChart(){
  let context = document.getElementById('myChart').getContext('2d');
  let getprodctsNames=[];
  let getprodctsVotes=[];
  let getprodctsViews=[];

  for(let i=0;i<prodcts.all.length;i++){
    getprodctsNames.push(prodcts.all[i].name);
  }
  for(let i=0;i<prodcts.all.length;i++){
    getprodctsVotes.push(prodcts.all[i].votes);
  }
  for(let i=0;i<prodcts.all.length;i++){
    getprodctsViews.push(prodcts.all[i].views);
  }
  let chartObject={
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels:getprodctsNames,
      datasets: [{
        label: 'prodcts voting results',
        backgroundColor: 'rgb(100, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: getprodctsVotes ,
      },{
        label: 'prodcts views results',
        backgroundColor: 'rgb(250, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: getprodctsViews ,
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

  let chart = new Chart(context,chartObject);
}

render();








