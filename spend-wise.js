// Get elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInBtn = document.querySelector(".sign-in");
const signUpBtn = document.querySelector(".nv"); // sign-up button
const signOutBtn = document.createElement("button");

// Create sign out button
signOutBtn.innerText = "Sign Out";
signOutBtn.style.marginTop = "10px";

// Check if user already logged in
window.addEventListener("load", () => {
    const user = localStorage.getItem("user");
    if (user) {
        showLoggedInUI(JSON.parse(user));
    }
});

// SIGN UP
signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        alert("Fill all fields");
        return;
    }

    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    alert("Account created successfully!");
    showLoggedInUI(userData);
});

// SIGN IN
signInBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No account found. Please sign up.");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        alert("Login successful!");
        showLoggedInUI(storedUser);
    } else {
        alert("Invalid email or password");
    }
});

// SHOW LOGGED IN UI
function showLoggedInUI(user) {
    document.querySelector(".wlc-not").innerText = `Welcome ${user.email} 👋`;
    document.querySelector(".first-prg").innerText = "You are logged in";

    // Disable inputs
    emailInput.style.display = "none";
    passwordInput.style.display = "none";
    signInBtn.style.display = "none";

    // Add sign out button
    document.querySelector(".right-side").appendChild(signOutBtn);
}

// SIGN OUT
signOutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    location.reload();
});