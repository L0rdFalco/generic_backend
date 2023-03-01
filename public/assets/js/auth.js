const errorEl = document.getElementById("error")
const signUpOption = document.getElementById('signUp');
const signInOption = document.getElementById('signIn');
const container = document.getElementById('container');

const signUpBtn = document.getElementById('signUpBtn');
const signInBtn = document.getElementById('signInBtn');

const nameEL = document.getElementById("nameInput")
const emailEL = document.getElementById("emailInput")
const pwEL = document.getElementById("pwInput")

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
    console.log("signup!");
    const nameVal = nameEL.value.trim()
    const emailVal = emailEL.value.trim()
    const pwVal = pwEL.value.trim()

    if (!nameVal || !emailVal || !pwVal) {
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
            password: pwVal
        }
    })


    console.log(res.data);


})

signInBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    console.log("login!");

    const emailVal1 = emailEL1.value.trim()
    const pwVal1 = pwEL1.value.trim()

    if (!emailVal1 || !pwVal1) {
        errorEl.style.opacity = 1

        setTimeout(() => {
            errorEl.style.opacity = 0

        }, 5000)

        return
    }

    const res = await fetch("/users/login", {
        method: "POST",
        body: JSON.stringify({
            email: emailVal1,
            password: pwVal1
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }

    })

    console.log(await res.json());


})