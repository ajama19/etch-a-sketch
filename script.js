// script.js

// variable declarations
let container = document.querySelector('#drawing-pad'); //drawing pad
let colorPicker = document.querySelector('#color-picker');  //the colour picker
let colorText = document.querySelector('#color-name'); // text under colour picker
let clearBtn = document.querySelector('#clear'); // clear button
let eraserBtn = document.querySelector('#eraser'); // eraser button
let gridSlider = document.querySelector('#grid-size'); // slider that changes size
let gridSliderText = document.querySelector('#grid-output'); // text under slider

//drawGrid() draws a grid with cells that change colour when clicked
function drawGrid() {
   const divArray = [];
   let lines = parseInt(gridSlider.value);
   let linesStr = '';

   //this for loop creates the columns and rows of the grid
   for (let i = 0; i < lines; i++) {
      linesStr += 'auto ';
   }
   container.style.gridTemplateColumns = linesStr;
   container.style.gridTemplateRows = linesStr;

   //num is used to create the right number of divs, for 5x5 grid that would be 25
   let num = parseInt(gridSlider.value);
   num *= num;

   //this for loop creates divs, and places them on the grid
   for (let i = 0; i < num; i++) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.addEventListener('click', (event) => {
         event.target.style.backgroundColor = colorPicker.value;
      });
      divArray.push(box);
   }

   let gridLines = gridSlider.value; 
   let rowStart = 0;
   let rowEnd = 1;
   let colStart = 1;
   let colEnd = 2;
   let index = 0;

   //the nested for loops place the divs from divArry on the grid
   for (let i = 0; i < gridLines; i++) {
      ++rowStart;
      ++rowEnd;
      for (let j = 0; j < gridLines; j++) {
         divArray[index].style.gridRowStart = rowStart; 
         divArray[index].style.gridRowEnd = rowEnd;
         divArray[index].style.gridColumnStart = colStart;
         divArray[index].style.gridColumnEnd = colEnd;

         container.appendChild(divArray[index]);
         ++index;
         ++colStart;
         ++colEnd;  
      }
      colStart = 1;
      colEnd = 2;
   } 
}
drawGrid();

gridSliderText.textContent = gridSlider.value + " x " + gridSlider.value;
//slider event listener 
gridSlider.addEventListener('change', () => {
   gridSliderText.textContent = gridSlider.value + " x " + gridSlider.value;
   updateGrid();
});

//updateGrid updates the grid dimensions when the slider is changed
function updateGrid() {
   while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
   }
   drawGrid();
}

//eraser button event listener 
eraserBtn.addEventListener('click', () => {
   colorPicker.value = '#ffffff';
});

//clear button event listener (set all divs in div array background to white)
clearBtn.addEventListener('click', () => {
   //use node.firstchild, lastchild, nextsibling
   let child = container.firstChild;
   while (child != null) {
      child.style.backgroundColor = '#ffffff';
      child = child.nextSibling;
   }
});

//colour picker event listener
colorPicker.addEventListener('change', (event) => {
   colorText.textContent = event.target.value;
});