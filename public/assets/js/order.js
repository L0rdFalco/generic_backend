const element = document.getElementById('right-col');
const url = window.location.href.toString()

paypal.Buttons({

    createOrder: async (data, actions) => {


        try {

            const res1 = await fetch("http://127.0.0.1:3000/purchases", {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    productName: url.split("/").slice(-1)[0]
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


            const res1 = await fetch(`http://127.0.0.1:3000/purchases/${data.orderID}/capture`,
                {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        productName: url.split("/").slice(-1)[0]
                    })
                })

            const res2 = await res1.json()


            if (res2.status.includes("success")) {
                element.innerHTML = '<h3>Thank you for your payment!</h3>';

                setTimeout(() => {
                    window.location.href = 'http://127.0.0.1:3000/dashboard';

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