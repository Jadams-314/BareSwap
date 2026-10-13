
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
    //const TestUser='user'
    //const TestPassword='password'
    attemps=5;
     if (user.value ==='user'){
        

        
        if (first !=="password" || second !=="password"){
            message2.innerHTML="incorrect password entered you have " + attemps + "attempts remaining<br>";
        attempts-=1;
            if(attempts ===0){
                message2.innerHTML="<br> go away<br>";
            }
            else{
                return;
            }
        }
        else{
            message2.innerHTML="<br>welcome" + TestUser + "<br>";
        }
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
window.addEventLIstener('load',()=>{

    //document.getelementById("submit").addEventListener('click',checkuser);
    //document.getelementById("first").addEventListener('change',checkpass);
    //document.getelementById("second").addEventListener('change',checkpass);
    //document.getelementById("textOverlay").addEventListener('load',overlay);
    document.getElementById("submit").addEventListener('click',checkpass);
    document.getElementById("reset").addEventListener('click',checkreset);
});