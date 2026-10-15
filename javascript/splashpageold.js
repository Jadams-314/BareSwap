
const container = document.getElementById('image-container');


const textOverlay = document.getElementById('textOverlay');
textOverlay.innerText = "Bare Swap";


textOverlay.style.position = 'absolute';
textOverlay.style.top = '20px';       
textOverlay.style.left = '20px';      
textOverlay.style.color = 'gold';     
textOverlay.style.fontSize = '48px';   
textOverlay.style.fontWeight = 'bold';


container.appendChild(textOverlay);

function checkreset(){

    window.location.reload();

}

   
function checkpass(){
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
    document.getElementById("submit").addEventListener('click',checkpass);
    document.getElementById("reset").addEventListener('click',checkreset);
});
/*
const container = document.getElementById('image-container');



const textOverlay = document.getElementById("textOverlay");




container.appendChild(textOverlay);

function checkreset(){

    window.location.reload();

}


function checkuser(){
    let user = document.getElementById("user").value;
    let first = document.getElementById("first").value;
    let second = document.getElementById("second").value;
    let message2 = document.getElementById("message2");
    const TestUser="user";
    const TestPassword="password";
    //attempts=5;
     if (user ===TestUser){
        

        
        if (first !==TestPassword || second !==TestPassword){
            message2.innerHTML="incorrect password entered you have ";// + attempts + "attempts remaining<br>";
        //attempts-=1;
           // if(attempts ===0){
           //     message2.innerHTML="<br> go away<br>";
            //}
            //else{
            //    return;
            //}
        }
        else{
            checkpass();
            if(checkpass()){
            message2.innerHTML="<br>welcome" + TestUser + "<br>";
                         }
            else{
                message2.innerHTML="incorrect password for given user: 'user'"
            }
    }
    }
    else{
        checkpass();
    }
}
   



function checkpass(){
    
    let first = document.getElementById("first").value;
    let second = document.getElementById("second").value;
    let message = document.getElementById("message");
   
    
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
    
//}
window.addEventListener('load',()=>{

    //document.getElementById("submit").addEventListener('click',checkuser, checkpass);
    //document.getelementById("first").addEventListener('change',checkpass);
    //document.getelementById("second").addEventListener('change',checkpass);
    //document.getelementById("textOverlay").addEventListener('load',overlay);
    document.getElementById("submit").addEventListener('click',checkuser);
    document.getElementById("reset").addEventListener('click',checkreset);
});*/