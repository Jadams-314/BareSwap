
const container = document.getElementById('image-container');


const textOverlay = document.createElement('div');
textOverlay.innerText = "Bare Swap";


textOverlay.style.position = 'absolute';
textOverlay.style.top = '20px';       
textOverlay.style.left = '20px';      
textOverlay.style.color = 'gold';     
textOverlay.style.fontSize = '48px';   
textOverlay.style.fontWeight = 'bold';


container.appendChild(textOverlay);



   
function checkpass(){
    let user = document.getElementById("user").value;
    let first = document.getElementById("first").value;
    let second =document.getElementById("second").value;
    let message = document.getElementById("message");

    if(user!== ""){
    if (first  ==="" || second ===""){
        /*let h3= document.getElementByID("h3-tag");
        */
        message.innerHTML="you did not enter a password <br> Please enter one now <br>";
        message.style.color="red";
        return false;
    }
    
    else if(first!==second){
        /*let h3= document.getElementById("h3-tag");
        */
        message.innerHTML="Passwords do not match <br>"
        message.style.color="red";
        return false;
    }
    else if (first===second){

        /*let h3= document.getElementById("h3-tag");
        */
        message.innerHTML="Hooray! you have matched passwords! <br>"
        message.style.color="green";
        return true;

    }
}

}
window.addEventLIstener('load',()=>{
    document.getElementByID("submit") .addEventListener('click',checkpass);
});