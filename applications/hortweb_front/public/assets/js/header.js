var loginBttn = document.getElementById("login");

var accountGrp = document.getElementById("accountGrp");
var accountBttn = document.querySelector("#account");
var interestsBttn = document.querySelector("#interesses");
var myProductsBttn = document.querySelector("#meusProdutos");

window.addEventListener("load", function () {
  checkToken("headerAction");

  var search = new URL(window.location.href).searchParams.get("search");

  if (search != null) 
  {
    const searchBar = document.getElementById("searchBar");
    searchBar.value = search;
  }
});

function headerAction(status) {
  switch (status) {
    case "validToken": 
    {
      setUserHeader();

      if (window.location.pathname === "/accountPage.php")
      {
        setAccountPage(email, nome, phone, img);
      }
      else if (window.location.pathname === "/interestsPage.php")
      {
        setInterestsPage(id);
      }
      else if (window.location.pathname === "/myProductsPage.php")
      {
        setMyProductsPage(id);
      }

      break;
    }
    case "invalidToken": 
    {
      if (window.location.pathname === "/accountPage.php" || window.location.pathname === "/interestsPage.php" || window.location.pathname === "/myProductsPage.php")
      {
        alert("seu usuário foi deslogado, por favor faça login novamente");
        window.location.href = "http://localhost/userLogin.php";
      }

      break;
    }

    case "noToken":
    {
      if (window.location.pathname === "/accountPage.php" || window.location.pathname === "/interestsPage.php"  || window.location.pathname === "/myProductsPage.php")
      {
        window.location.href = "http://localhost";
      }
    }
  }
}

function setUserHeader() {
  loginBttn.setAttribute("hidden", true);
  accountGrp.removeAttribute("hidden");
  accountBttn.innerHTML = "Bem vindo, " + nome.split(" ")[0];

  switch (tipo) {
    case "consumidor": {
      myProductsBttn.setAttribute("hidden", true);
      break;
    }
    case "produtor": 
    {
      if (window.location.pathname === "/productPage.php") 
      {
        setInterestBttn();
      }

      interestsBttn.setAttribute("hidden", true);
      break;
    }
  }
}

function logout() {
  var token = localStorage.getItem("token");

  if (token) {
    console.log("removing token");

    fetch("http://localhost:8080/controller/logout.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchBar = document.getElementById("searchBar").value;
    window.location.href = "http://localhost?search=" + searchBar;
  });
