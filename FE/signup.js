function submitForm() {
    const formData = {
        name: document.getElementById('name').value,
        ac_no: document.getElementById('account_number').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:4002/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Extract the message from the response
        const message = data.msg;
        // Display the message below the sign-up button
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.innerHTML = `<p>${message}</p>`;
        responseMessage.style.display = 'block'; // Show the message box
    })
    
    .catch(error => {
        console.error('Error:', error);
        // Handle errors, log error message for debugging
        console.error('Error message:', error.message);
    });
}
