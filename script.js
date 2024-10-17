function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Login successful') {
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("error-message").textContent = data;
        }
    })
    .catch(error => console.error('Error:', error));
}
