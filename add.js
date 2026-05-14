// SELECT ELEMENTS

const connectBtn = document.querySelector(".connect-btn");
const accountInput = document.querySelectorAll("input");

const providers = document.querySelectorAll('input[name="bank"]');

connectBtn.addEventListener("click", async () => {

    let selectedProvider = "";
    providers.forEach((provider) => {
        if(provider.checked){
            selectedProvider = provider.parentElement
            .querySelector("h3")
            .innerText;
        }
    });

    const accountValue = accountInput[4].value;
    const holderName = accountInput[5].value;
    const apiKey = accountInput[6].value;

    if(selectedProvider === ""){
        alert("Please select a payment provider");
        return;
    }

    if(accountValue === "" || holderName === "" || apiKey === ""){
        alert("Please fill all fields");
        return;
    }

    const accountData = {

        provider:selectedProvider,
        account:accountValue,
        holder:holderName,
        api:apiKey

    };

    localStorage.setItem(
        "connectedBank",
        JSON.stringify(accountData)
    );

    alert(`${selectedProvider} connected successfully`);
    console.log(accountData);
});

//  ==============CONNECTED================
const savedAccount = JSON.parse(
    localStorage.getItem("connectedBank")
);

if(savedAccount){

    console.log(`
    Provider: ${savedAccount.provider}
    Holder: ${savedAccount.holder}
    Account: ${savedAccount.account}
    `);

}