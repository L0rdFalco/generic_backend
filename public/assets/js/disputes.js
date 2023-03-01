
const subscriptionId = document.getElementById("subscriptionId").innerText.split(": ")[1]

const actionsObj = {
    refundBtn: "/disputes/requestRefund",
    upgradeBtn: "/disputes/upgradeSubscription",
    downgradeBtn: "/disputes/downgradeSubscription",
    cancelBtn: "/disputes/cancelSubscription",
    changeBillingBtn: "/disputes/changeBillingCycle"
}

Object.keys(actionsObj).forEach(key => {
    document.getElementById(key)?.addEventListener("click", async function (e) {
        const res1 = await fetch(actionsObj[key],
            {
                method: "POST",
                headers: { 'Content-type': 'application/json' },

                body: JSON.stringify({
                    subscriptionId: subscriptionId
                })
            })

        const res2 = await res1.json()

        console.log(res2);
    })

})
