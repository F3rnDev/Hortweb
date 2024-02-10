window.addEventListener("load", function () {
  checkUrl();
});

var prodId;

function checkUrl() {
  prodId = new URL(window.location.href).searchParams.get("id");

  if (prodId != null) {
    prodId = prodId.replace(/^"(.*)"$/, "$1");
    getProductAndProducer(prodId);
  } else {
    window.location.href = "http://localhost/";
  }
}

function getProductAndProducer(prodId) {
  fetch("http://localhost:8080/controller/getProductAndProducer.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ prodId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.product && data.producer) {
        updatePage(data.product, data.producer);
      } else {
        window.location.href = "http://localhost/";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

var prodName = document.getElementById("prodName");
var prodDesc = document.getElementById("prodDesc");
var prodPrice = document.getElementById("prodPrice");
var prodDate = document.getElementById("prodDate");
var dateIcon = document.getElementById("dateIcon");
var prodImg = document.getElementById("prodImg");

var producerName = document.getElementById("userName");
var producerEmail = document.getElementById("userEmail");
var producerPhone = document.getElementById("userPhone");
var producerImg = document.getElementById("userImg");

function updatePage(productInfo = [], producerInfo = []) {
  prodName.innerHTML = productInfo[0].nome;
  prodDesc.innerHTML = productInfo[0].descricao;
  prodPrice.innerHTML = "R$ " + Number(productInfo[0].preco).toFixed(2) + " un";

  var colheita = formatDate(productInfo[0].proddata);
  if (colheita == "Produto Disponível") {
    dateIcon.setAttribute("hidden", true);
  }
  prodDate.innerHTML = "Data da colheita: " + colheita;

  if (productInfo[0].img == null || productInfo[0].img == "") {
    prodImg.setAttribute("src", "assets/images/user-placeholder.png");
  } else {
    prodImg.setAttribute("src", "assets/images/products/" + productInfo[0].img);
  }

  producerName.innerHTML = "Nome: " + producerInfo[0].nome;
  producerEmail.innerHTML = "Email: " + producerInfo[0].email;
  producerPhone.innerHTML =
    "Telefone: " +
    producerInfo[0].telefone
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

  if (producerInfo[0].img == null || producerInfo[0].img == "") {
    producerImg.setAttribute("src", "assets/images/user-placeholder.png");
  } else {
    producerImg.setAttribute(
      "src",
      "assets/images/users/" + producerInfo[0].img
    );
  }

  loadPage();
}

function setInterestBttn() {
  document.getElementById("InterestBttn").setAttribute("disabled", true);
}

function formatDate(date) {
  var date = new Date(date);
  var day = date.getUTCDate();
  var month = date.getUTCMonth() + 1;
  var year = date.getUTCFullYear();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  if (date < new Date()) {
    return "Produto Disponível";
  }

  return day + "/" + month + "/" + year;
}

function interestAction(status) {
  switch (status) {
    case "validToken": {
      addProductToInterest();
      break;
    }
    case "noToken": {
      window.location.href = "http://localhost/userLogin.php";
      break;
    }
    case "invalidToken": {
      alert("seu usuário foi deslogado, por favor faça login novamente");
      localStorage.removeItem("token");
      window.location.href = "http://localhost/userLogin.php";
      break;
    }
  }
}

function addProductToInterest()
{
  fetch("http://localhost:8080/controller/addToInterestList.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, prodId }),
  })
    .then((res) => res.json())
    .then((data) => 
    {
      if (data.success) 
      {
        alert("produto adicionado na sua lista de interesses");
      }
      else
      {
        alert("esse produto já está na sua lista de interesses");
      }

    })
    .catch((err) => {
      console.log(err);
    });
}

function loadPage() {
  document.body.removeAttribute("hidden");
}
