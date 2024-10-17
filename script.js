async function login(event) {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorText = await response.text(); // Get error message
            document.getElementById("error-message").textContent = errorText; // Show error message
            return;
        }

        const data = await response.text();
        if (data === 'Login successful') {
            window.location.href = "dashboard.html"; // Redirect on successful login
        } else {
            document.getElementById("error-message").textContent = data; // Show error message
        }
    } catch (error) {
        console.error('Error:', error); // Log any errors
        document.getElementById("error-message").textContent = "An error occurred!";
    }
}
