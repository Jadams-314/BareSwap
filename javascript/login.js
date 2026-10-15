// Dom elements cached at the top for performance and readability
const container = document.getElementById('image-container'); 
const textOverlay = document.getElementById("textOverlay"); 
container.appendChild(textOverlay);

// Credentials constants
const TEST_USER = "user";
const TEST_PASSWORD = "password";

function checkreset() { 
    window.location.reload(); 
}
/*
function checkuser() { 
    const user = document.getElementById("user").value; 
    const first = document.getElementById("first").value; 
    const second = document.getElementById("second").value; 
    const message2 = document.getElementById("message2"); 

    
    if (user === TEST_USER) {
        
        if (first !== TEST_PASSWORD || second !== TEST_PASSWORD) {
            message2.innerHTML = "Incorrect password entered.";
            message2.style.color = "red";
            checkpass(); 
        } else {
            if (checkpass()) {
                message2.innerHTML = `<br>Welcome, ${TEST_USER}!<br>`;
                message2.style.color = "green";
            }
        }
    } else {
        
        message2.innerHTML = "Incorrect username.";
        message2.style.color = "red";
        checkpass();
    }
}*/

function checkpass() { 
    const user = document.getElementById("user").value;
    const first = document.getElementById("first").value; 
    const second = document.getElementById("second").value; 
    const message = document.getElementById("message"); 

    if (first === "" || second === "") { 
        message.innerHTML = "You did not enter a password. <br> Please enter one now. <br>"; 
        message.style.color = "red"; 
        return false; 
    } 
    
    if (first !== second) { 
        message.innerHTML = "Passwords do not match. <br>"; 
        message.style.color = "red"; 
        return false; 
    } 
    else{ 
    
    //message.innerHTML = "Hooray! You have matched passwords! <br>"; 
    message.innerHTML = "<br>Welcome" + "  " + user + "!";
    message.style.color = "green";
    setTimeout(() => {
     window.location.href = 'index.html';
  }, 2000);
   

    return true;
    } 
}


window.addEventListener('load', () => { 
    document.getElementById("submit").addEventListener('click', checkpass); 
    document.getElementById("reset").addEventListener('click', checkreset); 
});
