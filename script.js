// script.js

// variable declarations
let container = document.querySelector('#drawing-pad'); //drawing pad
let colorPicker = document.querySelector('#color-picker');  //the colour picker
let colorText = document.querySelector('#color-name'); // text under colour picker
let clearBtn = document.querySelector('#clear'); // clear button
let eraserBtn = document.querySelector('#eraser'); // eraser button
let gridSlider = document.querySelector('#grid-size'); // slider that changes size
let gridSliderText = document.querySelector('#grid-output'); // text under slider



// drawGrid() draws the initial grid that is responsive to clicks
function drawGrid() {
   const divArray = [];
   let lines = parseInt(gridSlider.value);
   let linesStr = '';

   //our container has a display of grid so now create the columns and rows
   for (let i = 0; i < lines; i++) {
      linesStr += 'auto ';
   }
   container.style.gridTemplateColumns = linesStr;
   container.style.gridTemplateRows = linesStr;

   //create a div and place it in the right grid-column-start/end and grid-row-start/end
   //also add an event listener to the div and make it change colour on click
   //num is used to create the right number of divs, for 5x5 that would be 25
   let num = parseInt(gridSlider.value);
   num *= num;

   for (let i = 0; i < num; i++) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.addEventListener('click', (event) => {
         event.target.style.backgroundColor = colorPicker.value;
      });
      divArray.push(box);
   }

   // now use CSS Grid to place the divs from divArray in the right positions
   let gridLines = gridSlider.value; 
   let rowStart = 0;
   let rowEnd = 1;
   let colStart = 1;
   let colEnd = 2;
   let index = 0;

   // do a nested for loop with rows changing in the first, and col changing in the second
   for (let i = 0; i < gridLines; i++) {
      ++rowStart;
      ++rowEnd;
      for (let j = 0; j < gridLines; j++) {
         divArray[index].style.gridRowStart = rowStart; //div item in array row start
         divArray[index].style.gridRowEnd = rowEnd;

         divArray[index].style.gridColumnStart = colStart;
         divArray[index].style.gridColumnEnd = colEnd;

         //you have applied CSS so you must now append to container
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
   //first erase divs from grid and from the divArray
   while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
   }
   //then call drawGrid to draw the new grid
   drawGrid();
}


//eraser event listener 
eraserBtn.addEventListener('click', () => {
   colorPicker.value = '#ffffff';
});

//clear event listener (set all divs in div array background to white)
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