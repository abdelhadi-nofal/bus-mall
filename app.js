
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
  const leftIndex=randomNumber(0,prodcts.all.length-1);
  const leftRandomprodcts=prodcts.all[leftIndex];
  leftImage.src=leftRandomprodcts.path;
  leftImage.title=leftRandomprodcts.name;
  leftImage.alt=leftRandomprodcts.name;

  const middleIndex=randomNumber(0,prodcts.all.length-1);
  const middleRandomprodcts=prodcts.all[middleIndex];
  middleImage.src=middleRandomprodcts.path;
  middleImage.title=middleRandomprodcts.name;
  middleImage.alt=middleRandomprodcts.name;

  const rightIndex=randomNumber(0,prodcts.all.length-1);
  const rightRandomprodcts=prodcts.all[rightIndex];
  rightImage.src=rightRandomprodcts.path;
  rightImage.title=rightRandomprodcts.name;
  rightImage.alt=rightRandomprodcts.name;
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
      imageSection.removeEventListener('click', clickHandler);
      document.getElementById('resultBtn').addEventListener('click', function() {
        let ul=document.getElementById('demo');
        let li=document.createElement('li');
        li.innerText=(prodcts.all[i].name +' had '+prodcts.all[i].votes + ' votes, and was seen');
        ul.appendChild(li);
      });
    }}
  cnt++;
}

document.getElementById('resultBtn').addEventListener('click', function() {
});






