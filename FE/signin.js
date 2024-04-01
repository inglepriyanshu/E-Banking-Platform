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
            // Extract the token from the response
            return response.json();
        } else {
            return response.json().then(data => {
                throw new Error(data.msg || 'Sign-in failed. Please try again.');
            });
        }
    })
    .then(data => {
        if (data && data.user) {
            // Store the token in the browser's local storage
            localStorage.clear();
            localStorage.setItem('name', data.user.name);
            localStorage.setItem('ac_no', data.user.ac_no);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('password',data.user.password);
            localStorage.setItem('balance',data.user.balance);
            localStorage.setItem('loan_amount',data.user.loan_amount);
            // console.log(data.user);
            // Redirect to welcome.html upon successful sign-in
            window.location.href = 'welcome.html';
        } else {
            // Display default error message
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.innerHTML = `<p>Sign-in failed. Please try again.</p>`;
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
