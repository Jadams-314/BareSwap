
const container = document.getElementById('image-container');


const textOverlay = document.createElement('div');
textOverlay.innerText = "Bare Swap";


textOverlay.style.position = 'absolute';
textOverlay.style.top = '20px';       
textOverlay.style.left = '20px';      
textOverlay.style.color = 'gold';     
textOverlay.style.fontSize = '24px';   
textOverlay.style.fontWeight = 'bold';


container.appendChild(textOverlay);