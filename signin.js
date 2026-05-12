
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

            alert("Login successful ✅");

            window.location.href = "database.html";
        }

        else {
            alert("Wrong email or password ❌");
        }

    });
