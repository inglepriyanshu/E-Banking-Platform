

function populateDropdown() {
    fetch('http://localhost:4002/names') 
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById('recipient'); 
        
        // Clear existing options
        dropdown.innerHTML = '';
        const currentAccount = localStorage.getItem("name");
        // Create and append new options
        data.forEach(name => {
            if(name!=currentAccount)
            {
            const option = document.createElement('option');
            option.text = name;
            dropdown.add(option);
            }    
        });
    })
    .catch(error => {
        console.error('Error fetching names:', error);
    });
}

function fundTransfer() {
   
    const toNameElement = document.getElementById('recipient');
    const toName = toNameElement.value; 
    const amountElement = document.getElementById('amount');
    const amountStr = amountElement.value;
    const amount = parseInt(amountStr);
    const fromName = localStorage.getItem('name');
        
    fetch('http://localhost:4002/fund-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'toname': toName,
          'fromname': fromName,
          'amount': amount
        }
      })
      .then(response => response.json()) // Parse response as JSON
      .then(data => {
        const messageElement = document.getElementById("message-box");
        messageElement.innerHTML = data.msg; // Access msg property from parsed JSON
        messageElement.style.display = "block";
        
        const oldBalance = localStorage.getItem("balance");
        if(oldBalance>=amount)
        {
        const newBalance = oldBalance-amount;
        localStorage.setItem("balance",newBalance);
        }
      })
      .catch(error => {
        console.error('Error during fund transfer:', error);
      });
      

}


populateDropdown();

const transferForm = document.getElementById('transfer-form');


transferForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    
    fundTransfer();
});


