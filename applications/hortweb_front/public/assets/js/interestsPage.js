function setInterestsPage(userId) {
  fetch("http://localhost:8080/controller/listInterests.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  })
    .then((res) => res.json())
    .then((data) => {

      console.log(data);

      if (data.product) {
        updatePage(data.product);
      } 
      else {
        loadPage();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function updatePage(products) {
  var interestListing = document.querySelector("#interestListing");

  products.forEach(function (row) {
    var dateStr = validateDate(row.proddata);
    var dateIconStr = "";

    if (dateStr != "Disponível") {
      dateIconStr = `<img id="dateIcon" src="assets/images/date-icon.png">`;
    }

    var referenceFolder = "assets/images/products/";

    if (row.img == null || row.img == "") {
      row.img = "user-placeholder.png";
      referenceFolder = "assets/images/";
    }

    var desc = row.descricao.substring(0, 15) + "...";

    interestListing.innerHTML += `
        <div class="d-flex justify-content-center">
            <div id="prodCard" class="card p-0" onclick="cardClick(${row.id})">
                <div class="card-body">
                    <div id="productCardContent" class="d-flex">
                        <img id="userImg" src="${referenceFolder}${row.img}">

                        <div class="col">
                            <h2 class="card-text" id="prodName">${row.nome}</h2>
                            <h2 class="card-text" id="prodDesc">${desc}</h2>
                        </div>

                        <div class="col">

                            <div class="d-flex">
                                <h2 class="card-text" id="prodDate">Data de colheita: ${dateStr}</h2>
                                ${dateIconStr}
                            </div>

                            
                            <h2 class="card-text" id="prodPrice">Preço: R$${Number(
                              row.preco
                            ).toFixed(2)} un</h2>
                        </div>


                        <div id="deleteBackground">
                            <div class="d-flex justify-content-end">
                                <img id="deleteIcon" src="assets/images/delete-icon.png" onclick="deleteClick(event, ${row.id})">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
  });

  loadPage();
}

function validateDate(dateData) {
  var date = new Date(dateData);
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  if (date < new Date()) {
    return "Disponível";
  }

  return day + "/" + month;
}

function cardClick(prodId) {
  window.location.href = "productPage.php?id=" + prodId;
}

function deleteClick(event, prodId) {
  event.stopPropagation();
  checkToken("deleteInterest_checkToken", prodId);
}

function deleteInterest_checkToken(status, prodId) {
  switch (status) {
    case "validToken": 
    {
      deleteInterest(id, prodId);
      break;
    }
    case "invalidToken": {
      alert("seu usuário foi deslogado, por favor faça login novamente");
      window.location.href = "http://localhost/userLogin.php";
      break;
    }
    case "noToken": {
      window.location.href = "http://localhost";
      break;
    }
  }
}

function deleteInterest(userId, prodId) 
{
    fetch("http://localhost:8080/controller/deleteInterest.php", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, prodId }),
    })
        .then((res) => res.json())
        .then((data) => {
        if (data.success) {
            window.location.href = "http://localhost/interestsPage.php";
        } else {
            alert(data.error);
        }
        })
        .catch((err) => {
        console.log(err);
        });
}

function loadPage() 
{
    document.body.removeAttribute("hidden");
}
