function submitForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:4002/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'email': email,
            'password': password
        }
    })
    .then(response => {
        if (response.ok) {
            // Redirect to welcome.html upon successful sign-in
            window.location.href = 'welcome.html';
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data && data.msg) {
            // Display the message below the sign-in button
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.innerHTML = `<p>${data.msg}</p>`;
            responseMessage.style.display = 'block'; // Show the message box
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors, display the error message to the user
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.innerHTML = `<p>${error.message}</p>`;
        responseMessage.style.display = 'block'; // Show the message box
    });
}
