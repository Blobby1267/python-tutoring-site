function login(event) {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('http://localhost:3000/login', { // Ensure this URL is correct
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        if (data === 'Login successful') {
            window.location.href = "dashboard.html"; // Redirect on successful login
        } else {
            document.getElementById("error-message").textContent = data; // Show error message
        }
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors
        document.getElementById("error-message").textContent = "An error occurred!";
    });
}
