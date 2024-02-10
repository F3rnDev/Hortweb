$(document).ready(function () {
  $("#phoneInput").inputmask("(99) 9999-9999");
});

//PASSWORD SHOW/HIDE

//hide or show password
const hideIcon = document.querySelector("#passHide");
const showIcon = document.querySelector("#passShow");
const password = document.querySelector("#passInput");

//hide or show confirm password
const confirmHideIcon = document.querySelector("#confirmPassHide");
const confirmShowIcon = document.querySelector("#confirmPassShow");
const confirmPassword = document.querySelector("#confirmPassInput");

hideIcon.addEventListener("click", () => {
  togglePassword("pass");
  setEyeIcon("pass");
});

showIcon.addEventListener("click", () => {
  togglePassword("pass");
  setEyeIcon("pass");
});

confirmHideIcon.addEventListener("click", () => {
  togglePassword("confirmPass");
  setEyeIcon("confirmPass");
});

confirmShowIcon.addEventListener("click", () => {
  togglePassword("confirmPass");
  setEyeIcon("confirmPass");
});

function togglePassword(eyeId) {
  switch (eyeId) {
    case "pass": {
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);
      break;
    }
    case "confirmPass": {
      const type =
        confirmPassword.getAttribute("type") === "password"
          ? "text"
          : "password";
      confirmPassword.setAttribute("type", type);
      break;
    }
  }
}

function setEyeIcon(eyeId) {
  switch (eyeId) {
    case "pass": {
      if (password.getAttribute("type") == "text") {
        hideIcon.setAttribute("hidden", true);
        showIcon.removeAttribute("hidden");
      } else {
        hideIcon.removeAttribute("hidden");
        showIcon.setAttribute("hidden", true);
      }

      break;
    }
    case "confirmPass": {
      if (confirmPassword.getAttribute("type") == "text") {
        confirmHideIcon.setAttribute("hidden", true);
        confirmShowIcon.removeAttribute("hidden");
      } else {
        confirmHideIcon.removeAttribute("hidden");
        confirmShowIcon.setAttribute("hidden", true);
      }

      break;
    }
  }
}

//STEP and VALIDATION system
var step = 0;
const step1 = document.querySelector("#step1");
const step2 = document.querySelector("#step2");
const step3 = document.querySelector("#step3");

const stepText = document.querySelector("#stepText");

const selectType = document.querySelector("#selectType");

const nameInput = document.querySelector("#nameInput");
const passInput = document.querySelector("#passInput");
const confirmPassInput = document.querySelector("#confirmPassInput");

const emailInput = document.querySelector("#emailInput");
const phoneInput = document.querySelector("#phoneInput");

function validateField() {
  switch (step) {
    case 0: {
      sendToStep(1);
      break;
    }

    case 1: {
      if (step2Validation()) {
        sendToStep(1);
      }
      break;
    }

    case 2: {
      if (step3Validation()) {
        checkEmail();
      }
      break;
    }
  }
}

function sendToStep(addStep) {
  step += addStep;
  updatePage();
}

function updatePage() {
  switch (step) {
    case 0: {
      step1.removeAttribute("hidden");
      step2.setAttribute("hidden", true);
      step3.setAttribute("hidden", true);
      stepText.innerHTML = "Vamos Começar?";
      break;
    }

    case 1: {
      step1.setAttribute("hidden", true);
      step2.removeAttribute("hidden");
      step3.setAttribute("hidden", true);
      stepText.innerHTML = "Dados Gerais";
      break;
    }

    case 2: {
      step1.setAttribute("hidden", true);
      step2.setAttribute("hidden", true);
      step3.removeAttribute("hidden");
      stepText.innerHTML = "Dados de Contato";
      break;
    }
  }
}

function step2Validation() {
  var name = nameInput.value;
  var password = passInput.value;
  var confirmPassword = confirmPassInput.value;

  if (name === "" || password === "" || confirmPassword === "") {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  var regexLetras = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/;
  if (!regexLetras.test(name)) {
    alert("O campo nome deve conter apenas letras do alfabeto.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Campos de senha não coincidem.");
    return false;
  }

  return true;
}

function step3Validation() {
  var email = emailInput.value;
  var phone = phoneInput.value.replace("(", "").replace(")", "");

  if (email === "" || phone === "") {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  var regexEmail = /\S+@\S+\.\S+/;
  if (!regexEmail.test(email)) {
    alert("O campo email deve ter um formato válido.");
    return false;
  }

  var regexPhone = /^\d{2} \d{4}-\d{4}$/;
  if (!regexPhone.test(phone)) {
    alert("O campo telefone deve ter um formato válido.");
    return false;
  }

  return true;
}

function checkEmail()
{
    var email = emailInput.value;

    fetch("http://localhost:8080/controller/checkEmail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) 
      {
        submitForm();
      } 
      else 
      {
        console.log("Email already in use");
        alert("Email já cadastrado.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function submitForm() {
  var type = selectType.value;
  var name = nameInput.value;
  var password = passInput.value;
  var email = emailInput.value;
  var phone = phoneInput.value.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");

  fetch("http://localhost:8080/controller/createUser.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, name, password, email, phone }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) 
      {
        logInUser(email, password);
      } 
      else 
      {
        alert("Erro ao criar conta");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function logInUser(email, password) 
{
  fetch("http://localhost:8080/controller/userAuthentication.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        console.log("Login bem sucessido com token: " + data.token);
        localStorage.setItem("token", data.token);

        window.location.href = "http://localhost/";
      } else {
        console.log("Login falhou");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
