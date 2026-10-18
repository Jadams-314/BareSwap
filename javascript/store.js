
let listings = []; 

const buy = document.getElementById("itemtobuy");
const error = document.getElementById("error");
const buyerror = document.getElementById("error2");
const message = document.getElementById("message");
const buymessage = document.getElementById("message2");
const itemlistingform = document.getElementById('form1');
const list = document.getElementById('list');


function updateListingsDisplay() {
    const listContainer = document.getElementById('itemlisting');
    
    
    listContainer.innerHTML = ""; 
    
   
    if (listings.length === 0) {
        listContainer.style.display = 'none';
        return;
    }
    
    listContainer.style.display = 'block';
    
   
    listings.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `[ID: ${index}] Item: ${item.name} | Quantity: ${item.quant}`;
        listContainer.appendChild(itemDiv);
    });
}

function selectquantity(e) {
    if (e) e.preventDefault();
    
    const itemToSell = document.getElementById("itemtosell").value;
    const quantInput = parseInt(document.getElementById("quantity").value, 10);
    
    if (isNaN(quantInput) || quantInput <= 0 || quantInput > 99) {
        error.innerHTML = "Invalid number of items listed. <br> Please enter a value between 1 and 99. <br>";
        error.style.color = "red";
        return false;
    } else {
        error.innerHTML = " ";
        
       
        listings.push({ name: itemToSell, quant: quantInput });
        
        message.innerHTML = quantInput + " " + itemToSell + " listed!<br>";
        message.style.color = "green";
        buyerror.innerHTML = ""; 
        
        
        updateListingsDisplay();
        return true;
    }
}

function buyitem(e) {
    if (e) e.preventDefault();
    
    const numberToBuy = parseInt(document.getElementById("number").value, 10);
    
    const desiredItemName = document.getElementById("itemtobuy").value; 
    
    error.innerHTML = " ";
    message.innerHTML = " ";
    buyerror.innerHTML = " ";
    buymessage.innerHTML = " ";
    
    if (isNaN(numberToBuy) || numberToBuy <= 0) {
        buyerror.innerHTML = "Please enter a valid quantity to buy.";
        buyerror.style.color = "red";
        return;
    }
    
    
    const itemIndex = listings.findIndex(item => item.name.toLowerCase() === desiredItemName.toLowerCase());
    
    
    if (itemIndex === -1) {
        buyerror.innerHTML = "Item not found in listings!";
        buyerror.style.color = "red";
        return;
    }
    
    const selectedItem = listings[itemIndex];
    
    if (numberToBuy > selectedItem.quant) {
        buyerror.innerHTML = `Not enough stock! Only ${selectedItem.quant} left.`;
        buyerror.style.color = "red";
        return;
    }
    
   
    selectedItem.quant -= numberToBuy;
    
    if (selectedItem.quant === 0) {
        
        listings.splice(itemIndex, 1); 
        buymessage.innerHTML = `Thank you for your Swap! ${selectedItem.name} is now sold out.`;
        buymessage.style.color = "blue";
    } else {
        buymessage.innerHTML = "Thank you for your Swap!";
        buymessage.style.color = "green";
    }
    
    
    updateListingsDisplay();
}

document.getElementById("List").onclick = selectquantity;
document.getElementById("Buy").onclick = buyitem;
