import { countryList } from "./CountryCode.js";



const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropDowns = document.querySelectorAll(".dropdown select");


for (let select of dropDowns) {
    console.log(select)
    for (let code in countryList) {
        let newOptions = document.createElement("option");
        newOptions.value = code;
        newOptions.innerText = code;
        select.append(newOptions);
        if (select.name === "from" && code === "USD") {
            newOptions.selected = "selected";
        }
        if (select.name === "to" && code === "INR") {
            newOptions.selected = "selected";
        }

    }
    select.addEventListener("change", (evt) => {
        udpateFlag(evt.target);
    });

}


const udpateFlag = (element) => {
    // console.log(element);
    let code = element.value;
    let countryCode = countryList[code];
    // console.log(countryList[code]);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    //    console.log(img);
    img.src = newSrc;
}
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


const btn = document.querySelector("button");
const amount = document.querySelector(".amount");
const result = document.querySelector(".result ")

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updatExachangeCurrency();
});
btn.addEventListener("dblclick", (evt) => {
    location.reload()
})



const updatExachangeCurrency = async () => {
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 0) {
        alert("Wrong input");
        amount.value = "";
    }
    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL,"GET");
    let data = await response.json();
    console.log(fromCurr.value, toCurr.value)

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    console.log(rate);
    let finalResult = amtValue * rate;
    console.log(finalResult);
    result.innerText = `${amtValue} ${fromCurr.value} = ${finalResult} ${toCurr.value}`;
};