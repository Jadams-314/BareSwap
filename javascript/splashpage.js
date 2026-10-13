
const container = document.getElementById('image-container');









container.appendChild(textOverlay);

function checkreset(){

    window.location.reload();

}
flag=false;
window.onload = function checkuser(){
    let user = document.getElementById("user").value;
    if (user){

        flag=true;
    }
}

window.onload = function overlay(){
let textOverlay = document.getElementById('textOverlay');
    
    if (flag){

    textOverlay.innerHTML = "Bare Swap <br>";
    textOverlay.style.position = 'absolute';
    textOverlay.style.top = '20px';       
    textOverlay.style.left = '20px';      
    textOverlay.style.color = 'gold';     
    textOverlay.style.fontSize = '48px';   
    textOverlay.style.fontWeight = 'bold';

    }
    else{
        return;
    }
}
   
window.onload = function checkpass(){
    let user = document.getElementById("user").value;
    let first = document.getElementById("first").value;
    let second = document.getElementById("second").value;
    let message = document.getElementById("message");

    if(user.value){
    if (first  ==="" || second ===""){
        /*let h3= document.getElementById("h3-tag");
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

    document.getelementById("user").addEventListener('change',checkuser);
    document.getelementById("first").addEventListener('change',checkpass);
    document.getelementById("second").addEventListener('change',checkpass);
    document.getelementById("textOverlay").addEventListener('load',overlay);
    document.getElementById("submit").addEventListener('click',checkpass);
    document.getElementById("reset").addEventListener('click',checkreset);
});