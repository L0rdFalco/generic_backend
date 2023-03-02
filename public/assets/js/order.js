const element = document.getElementById('right-col');
const url = window.location.href.toString()

paypal.Buttons({

    createOrder: async (data, actions) => {


        try {

            const token = localStorage.getItem("jwt_token")

            console.log("---> ", url.split("/")[4]);

            const res1 = await fetch(`http://127.0.0.1:3000/purchases/${token}`, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    productName: url.split("/")[4]
                })
            })

            const res2 = await res1.json()

            return res2.data.id

        } catch (error) {

            console.log(error);
        }

    },

    onApprove: async (data, actions) => {
        try {
            const token = localStorage.getItem("jwt_token")


            const res1 = await fetch(`http://127.0.0.1:3000/purchases/${data.orderID}/capture/${token}`,
                {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        productName: url.split("/")[4]
                    })
                })

            const res2 = await res1.json()


            if (res2.status.includes("success")) {
                element.innerHTML = '<h3>Thank you for your payment!</h3>';

                setTimeout(() => {
                    window.location.href = `http://127.0.0.1:3000/dashboard/${token}`;

                }, 5000)
            }

            else {
                element.innerHTML = '<h3>Something went wrong. Try again later!</h3>';

            }


        } catch (error) {
            console.log(error);
            element.innerHTML = '<h3>Something went wrong with the payment!</h3>';

        }
    }

}).render("#paypal-button-container")