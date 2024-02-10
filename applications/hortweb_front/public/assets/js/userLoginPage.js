//hide or show password
const hideIcon = document.querySelector("#hide");
const showIcon = document.querySelector("#show");
const password = document.querySelector("#passInput");

hideIcon.addEventListener("click", () => {
  togglePassword();
  setEyeIcon();
});

showIcon.addEventListener("click", () => {
  togglePassword();
  setEyeIcon();
});

function togglePassword() {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
}

function setEyeIcon() {
  if (password.getAttribute("type") == "text") {
    hideIcon.setAttribute("hidden", true);
    showIcon.removeAttribute("hidden");
  } else {
    hideIcon.removeAttribute("hidden");
    showIcon.setAttribute("hidden", true);
  }
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passInput").value;

  fetch("http://localhost:8080/controller/userAuthentication.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  })
    .then((res) => res.json())
    .then((data) => {

      console.log(data);

      if (data.token) 
      {
        console.log("Login bem sucessido com token: " + data.token);
        localStorage.setItem('token', data.token);
        
        window.location.href = "http://localhost/";
      } 
      else 
      {
        alert(data.error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
