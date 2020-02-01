console.log("client side js file is loaded1");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        // return console.log("error: ", data.error);
      } else {
        messageOne.textContent = `${data.location.lat},${data.location.long}`;
        messageTwo.textContent = `${data.forecast}`;
      }
      // console.log("data: ", data);
    });
  });
});
