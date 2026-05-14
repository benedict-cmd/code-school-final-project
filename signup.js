
    const LOGGED_IN_KEY = 'loggedIn';

    function updateAuthLinks() {
        const isLoggedIn = localStorage.getItem(LOGGED_IN_KEY) === 'true';
        const signInLink = document.getElementById("nv1");
        const signUpLink = document.getElementById("nv2");

        if (isLoggedIn) {
            if (signInLink) signInLink.style.display = "none";
            if (signUpLink) signUpLink.style.display = "none";
            if (window.location.pathname.endsWith("signup.html")) {
                window.location.href = "database.html";
            }
        }
    }

    updateAuthLinks();

    let signUpBtn = document.querySelector(".sign-in");
    signUpBtn.addEventListener("click", function () {
        let fullName = document.querySelector("#fullName").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#psw").value;
        let confirmPassword = document.querySelector("#confirmPsw").value;
        if (
            fullName === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill all fields");
        }
        // confirm password
        else if (password !== confirmPassword) {
            alert("Passwords do not match");
        }

        // save user details
        else {
            let user = {
                name: fullName,
                email: email,
                password: password
            };
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("loggedIn", "true");
            window.location.href = "database.html";
        }

    });

    // let click = document.querySelector("#nv2");
    // let none = document.getElementById("nv1");
    // click.addEventListener("click", function () {
    //    none.style.display = "none";
    // });


    

    // // getting the buttons
    // let signUpBtn2 = document.querySelector("#nv2");
    // let signInBtn1 = document.querySelector("#nv1");

    // // when signup is clicked
    // signUpBtn2.addEventListener("click", function () {

    //     // hide signin button
    //     signInBtn1.style.display = "none";

    // });



