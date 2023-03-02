const errorEl = document.getElementById("error")
const signUpOption = document.getElementById('signUp');
const signInOption = document.getElementById('signIn');
const container = document.getElementById('container');

const signUpBtn = document.getElementById('signUpBtn');
const signInBtn = document.getElementById('signInBtn');

const nameEL = document.getElementById("nameInput")
const emailEL = document.getElementById("emailInput")
const pwEL = document.getElementById("pwInput")
const pwConfEL = document.getElementById("pwConfInput")

const emailEL1 = document.getElementById("emailInput1")
const pwEL1 = document.getElementById("pwInput1")
signUpOption.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInOption.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


signUpBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    const nameVal = nameEL.value.trim()
    const emailVal = emailEL.value.trim()
    const pwVal = pwEL.value.trim()
    const pwConfVal = pwConfEL.value.trim()

    if (!nameVal || !emailVal || !pwVal || !pwConfVal) {
        errorEl.style.opacity = 1

        setTimeout(() => {
            errorEl.style.opacity = 0

        }, 5000)

        return
    }

    const res = await axios({
        method: "POST",
        url: "/users/signup",
        data: {
            name: nameVal,
            email: emailVal,
            password: pwVal,
            passwordConfirm: pwConfVal
        }
    })


    if (res.data.message.includes("success")) {
        localStorage.setItem("jwt_token", res.data.token)
        window.location.href = `/dashboard/${res.data.token}`
    }
    else {
        console.log("something went wrong in the sign up");
    }


})

signInBtn.addEventListener("click", async function (e) {
    e.preventDefault()

    const emailVal1 = emailEL1.value.trim()
    const pwVal1 = pwEL1.value.trim()

    if (!emailVal1 || !pwVal1) {
        errorEl.style.opacity = 1

        setTimeout(() => {
            errorEl.style.opacity = 0

        }, 5000)

        return
    }

    const res1 = await fetch("/users/login", {
        method: "POST",
        body: JSON.stringify({
            email: emailVal1,
            password: pwVal1
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }

    })

    const res2 = await res1.json();
    console.log(res2);

    if (res2.message.includes("success")) {
        localStorage.setItem("jwt_token", res2.token)

        window.location.href = `/dashboard/${res2.token}`
    }
    else {
        console.log("something went wrong in the login");
    }

})
