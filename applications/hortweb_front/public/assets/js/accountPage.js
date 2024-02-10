$(document).ready(function () {
  $("#phoneInput").inputmask("(99) 9999-9999");
});

//hide or show password
const hideIcon = document.querySelector("#passHide");
const showIcon = document.querySelector("#passShow");
const password = document.querySelector("#passInput");

//hide or show new password
const hideIconNew = document.querySelector("#newPassHide");
const showIconNew = document.querySelector("#newPassShow");
const passwordNew = document.querySelector("#newPassInput");

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

hideIconNew.addEventListener("click", () => {
  togglePassword("newPass");
  setEyeIcon("newPass");
});

showIconNew.addEventListener("click", () => {
  togglePassword("newPass");
  setEyeIcon("newPass");
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
    case "newPass": {
      const type =
        passwordNew.getAttribute("type") === "password" ? "text" : "password";
      passwordNew.setAttribute("type", type);
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
    case "newPass": {
      if (passwordNew.getAttribute("type") == "text") {
        hideIconNew.setAttribute("hidden", true);
        showIconNew.removeAttribute("hidden");
      } else {
        hideIconNew.removeAttribute("hidden");
        showIconNew.setAttribute("hidden", true);
      }

      break;
    }
  }
}

function clearPass() {
  password.value = "";
  passwordNew.value = "";
  confirmPassword.value = "";
}

function setAccountPage(userEmail, userName, userPhone, userImg) {
  var emailInput = document.getElementById("emailInput");
  var nomeInput = document.getElementById("nameInput");
  var phoneInput = document.getElementById("phoneInput");
  var imgInput = document.getElementById("imgInput");

  emailInput.value = userEmail;
  nomeInput.value = userName;
  phoneInput.value = userPhone;

  if (userImg != null) {
    imgInput.setAttribute("src", "assets/images/users/" + userImg);
  } else {
    imgInput.setAttribute("src", "assets/images/user-placeholder.png");
  }

  loadPage();
}

function loadPage() {
  document.body.removeAttribute("hidden");
}

var newImgSrc;
var imgExtension;

function selectImage() {
  document.getElementById("fileInput").click();
}

document.getElementById("fileInput").addEventListener("change", function () {
    const selectedFile = this.files[0];

    if (selectedFile) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const imgInput = document.getElementById("imgInput");
        imgInput.src = e.target.result;
  
        // Armazenar a representação base64 da imagem
        newImgSrc = e.target.result.split(',')[1];
      };
  
      // Ler o conteúdo do arquivo como uma URL de dados
      reader.readAsDataURL(selectedFile);

      imgExtension = selectedFile.name.split('.').pop();
    }
});

function validateUserInfo() {
  var email = document.getElementById("emailInput").value;
  var nome = document.getElementById("nameInput").value;
  var phone = document.getElementById("phoneInput").value.replace("(", "").replace(")", "");

  if (email == "" || nome == "" || phone == "") {
    alert("Preencha todos os campos");
    return false;
  }

  var regexLetras = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/;
  if (!regexLetras.test(nome)) {
    alert("O campo nome deve conter apenas letras do alfabeto.");
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

function updateAccount(status) {
  if (validateUserInfo()) {
    switch (status) {
      case "validToken": 
      {
        var email = document.getElementById("emailInput").value;
        var nome = document.getElementById("nameInput").value;
        var phone = document.getElementById("phoneInput").value.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
        var newImg = newImgSrc;

        fetch("http://localhost:8080/controller/updateUserInfo.php", {
          method: "POST",
          body: JSON.stringify({ id, email, nome, phone, newImg, imgExtension}),
        })
          .then((res) => res.json())
          .then((data) => 
          {
            console.log(data);

            if (data.success) 
            {
              alert(data.success);
              window.location.reload();
            } 
            else 
            {
              alert(data.error);
            }
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      }
      case "invalidToken": 
      {
        alert("seu usuário foi deslogado, por favor faça login novamente");
        window.location.href = "http://localhost/userLogin.php";
        break;
      }
      case "noToken": 
      {
        window.location.href = "http://localhost";
        break;
      }
    }
  }
}

function updatePassword(status)
{
    if (validatePassword()) {
        switch (status) {
          case "validToken": 
          {
            var newPassword = document.getElementById("newPassInput").value;
            var password = document.getElementById("passInput").value;
            
            fetch("http://localhost:8080/controller/updateUserPassword.php", 
            {
                method: "POST",
                body: JSON.stringify({ id, password, newPassword}),
                })
                .then((res) => res.json())
                .then((data) => 
                {
                    console.log(data);
        
                    if (data.success) 
                    {
                        alert(data.success);
                        window.location.reload();
                    } 
                    else 
                    {
                        alert(data.error);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            break;
          }
          case "invalidToken": 
          {
            alert("seu usuário foi deslogado, por favor faça login novamente");
            window.location.href = "http://localhost/userLogin.php";
            break;
          }
          case "noToken": 
          {
            window.location.href = "http://localhost";
            break;
          }
        }
    }
}

function validatePassword() 
{
    var password = document.getElementById("passInput").value;
    var newPassword = document.getElementById("newPassInput").value;
    var confirmPassword = document.getElementById("confirmPassInput").value;

    if (password == "" || newPassword == "" || confirmPassword == "") {
        alert("Preencha todos os campos");
        return false;
    }

    if (newPassword != confirmPassword) {
        alert("As senhas não coincidem");
        return false;
    }

    return true;
}
