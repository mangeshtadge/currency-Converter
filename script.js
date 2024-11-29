const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

// Fetch currencies and populate dropdowns
fetch("https://open.er-api.com/v6/latest/USD")
  .then((response) => response.json())
  .then((data) => {
    const currencies = Object.keys(data.rates);
    currencies.forEach((currency) => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = currency;
      option1.textContent = option2.textContent = currency;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });
  })
  .catch((error) => {
    console.error("Error fetching currency data:", error);
    result.textContent = "Failed to load currencies.";
  });

// Convert currency
convertBtn.addEventListener("click", () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = amount.value;

  if (!amountValue || from === "" || to === "") {
    result.textContent = "Please fill all fields.";
    return;
  }

  fetch(`https://open.er-api.com/v6/latest/${from}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[to];
      const convertedAmount = (amountValue * rate).toFixed(2);
      result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
    })
    .catch((error) => {
      console.error("Error converting currency:", error);
      result.textContent = "Conversion failed. Try again.";
    });
});
