const user_name = localStorage.getItem("name");
const element = document.getElementById("welcome-message");
element.innerHTML= `Welcome to the Indian Bank, ${user_name}!`;