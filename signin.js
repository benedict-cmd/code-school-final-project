
    const LOGGED_IN_KEY = 'loggedIn';

    function updateAuthLinks() {
        const isLoggedIn = localStorage.getItem(LOGGED_IN_KEY) === 'true';
        const signInLink = document.getElementById("nv1");
        const signUpLink = document.getElementById("nv2");

        if (isLoggedIn) {
            if (signInLink) signInLink.style.display = "none";
            if (signUpLink) signUpLink.style.display = "none";
            if (window.location.pathname.endsWith("sign.html") || window.location.pathname.endsWith("signin.html")) {
                window.location.href = "database.html";
            }
        }
    }

    updateAuthLinks();

    let signInBtn = document.querySelector(".sign-in");

    signInBtn.addEventListener("click", function () {

        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let savedUser = JSON.parse(localStorage.getItem("user"));

        if (savedUser === null) {
            alert("No account found!"
                   +" Please sign up first ❌"
            );
        }

        else if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            localStorage.setItem("loggedIn", "true");
            window.location.href = "database.html";
        }

        else {
            alert("Wrong email or password ❌");
        }

    });
