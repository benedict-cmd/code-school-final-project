// // Get elements
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const signInBtn = document.querySelector(".sign-in");
// const signUpBtn = document.querySelector(".nv"); // sign-up button
// const signOutBtn = document.createElement("button");
// // SIGN UP
// signUpBtn.addEventListener("click", (e) => {
//     e.preventDefault();

//     const email = emailInput.value;
//     const password = passwordInput.value;

//     if (!email || !password) {
//         alert("Fill all fields");
//         return;
//     }
// });

// // SIGN IN
// signInBtn.addEventListener("click", (e) => {
//     e.preventDefault();

//     const email = emailInput.value;
//     const password = passwordInput.value;

//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (!storedUser) {
//         alert("No account found. Please sign up.");
//         return;
//     }

//     if (email === storedUser.email && password === storedUser.password) {
//         alert("Login successful!");
//         showLoggedInUI(storedUser);
//     } else {
//         alert("Invalid email or password");
//     }
// });

// // SHOW LOGGED IN UI
// function showLoggedInUI(user) {
//     document.querySelector(".wlc-not").innerText = `Welcome ${user.email} 👋`;
//     document.querySelector(".first-prg").innerText = "You are logged in";

//     // Disable inputs
//     emailInput.style.display = "none";
//     passwordInput.style.display = "none";
//     signInBtn.style.display = "none";

//     // Add sign out button
//     document.querySelector(".right-side").appendChild(signOutBtn);
// }

document.addEventListener("DOMContentLoaded", () => {

  // ── Element References ───────────────────
  const fullNameInput    = document.getElementById("fullName");
  const emailInput       = document.getElementById("email");
  const pswInput         = document.getElementById("psw");
  const confirmPswInput  = document.getElementById("confirmPsw");
  const signUpBtn        = document.querySelector(".sign-in");

  // ── Helper: Show Error ───────────────────
  function showError(input, message) {
    clearError(input);
    input.style.borderColor = "#e74c3c";

    const errorEl = document.createElement("span");
    errorEl.className = "error-msg";
    errorEl.textContent = message;
    errorEl.style.cssText = `
      color: #e74c3c;
      font-size: 12px;
      display: block;
      margin-top: 4px;
      margin-bottom: 6px;
    `;
    input.insertAdjacentElement("afterend", errorEl);
  }

  // ── Helper: Clear Error ──────────────────
  function clearError(input) {
    input.style.borderColor = "";
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error-msg")) {
      next.remove();
    }
  }

  // ── Helper: Show Success ─────────────────
  function showSuccess(input) {
    clearError(input);
    input.style.borderColor = "#2ecc71";
  }

  // ── Validators ───────────────────────────
  function validateFullName() {
    const value = fullNameInput.value.trim();
    if (!value) {
      showError(fullNameInput, "Full name is required.");
      return false;
    }
    if (value.length < 3) {
      showError(fullNameInput, "Name must be at least 3 characters.");
      return false;
    }
    showSuccess(fullNameInput);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?[0-9]{7,15})$/;

    if (!value) {
      showError(emailInput, "Email or phone number is required.");
      return false;
    }
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      showError(emailInput, "Enter a valid email address or phone number.");
      return false;
    }
    showSuccess(emailInput);
    return true;
  }

  function validatePassword() {
    const value = pswInput.value;
    if (!value) {
      showError(pswInput, "Password is required.");
      return false;
    }
    if (value.length < 8) {
      showError(pswInput, "Password must be at least 8 characters.");
      return false;
    }
    if (!/[A-Z]/.test(value)) {
      showError(pswInput, "Password must include at least one uppercase letter.");
      return false;
    }
    if (!/[0-9]/.test(value)) {
      showError(pswInput, "Password must include at least one number.");
      return false;
    }
    showSuccess(pswInput);
    return true;
  }

  function validateConfirmPassword() {
    const value = confirmPswInput.value;
    if (!value) {
      showError(confirmPswInput, "Please confirm your password.");
      return false;
    }
    if (value !== pswInput.value) {
      showError(confirmPswInput, "Passwords do not match.");
      return false;
    }
    showSuccess(confirmPswInput);
    return true;
  }

  // ── Live Validation on Blur ───────────────
  fullNameInput.addEventListener("blur", validateFullName);
  emailInput.addEventListener("blur", validateEmail);
  pswInput.addEventListener("blur", validatePassword);
  confirmPswInput.addEventListener("blur", validateConfirmPassword);

  // ── Clear error as user types ─────────────
  [fullNameInput, emailInput, pswInput, confirmPswInput].forEach(input => {
    input.addEventListener("input", () => clearError(input));
  });

  // ── Sign Up Button Click ──────────────────
  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent <a> navigation

    const isNameValid    = validateFullName();
    const isEmailValid   = validateEmail();
    const isPswValid     = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (isNameValid && isEmailValid && isPswValid && isConfirmValid) {
      // ✅ All validations passed
      signUpBtn.textContent = "Creating account...";
      signUpBtn.disabled = true;

      // Simulate API call (replace with your real fetch/axios call)
      setTimeout(() => {
        alert(`Account created for ${fullNameInput.value.trim()}! 🎉`);
        signUpBtn.textContent = "Sign up";
        signUpBtn.disabled = false;
        // Redirect: window.location.href = "dashboard.html";
      }, 1500);
    }
  });

});
