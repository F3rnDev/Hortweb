window.addEventListener("load", function () {
  getProducts();
});

function getProducts() 
{
  var search = new URL(window.location.href).searchParams.get("search");

  if(search != null)
  {
    search = search.replace(/^"(.*)"$/, '$1');
  }

  fetch("http://localhost:8080/controller/listProducts.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ search }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.product) {
        console.log(data);
        listProducts(data.product);
      } else {
        alert("Produto não encontrado");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function listProducts(products) {
  const cardListing = document.querySelector("#cardListing");

  products.forEach(function (row) {

    var dateStr = validateDate(row.proddata);
    var dateIconStr = "";

    if(dateStr != "Disponível")
    {
        dateIconStr = `<img id="dateIcon" src="assets/images/date-icon.png">`;
    }

    var referenceFolder = "assets/images/products/";

    if(row.img == null || row.img == "")
    {
      row.img = "user-placeholder.png";
      referenceFolder = "assets/images/";
    }

    cardListing.innerHTML += `
        <div class="card p-0" style="width: 20rem;" onclick="goToProductPage(${row.id})">
            <div class="col d-flex justify-content-center">
                <img class="card-img-top w-100" src="${referenceFolder}${row.img}">
            </div>

            <hr>

            <div class="card-body">
                <h4 class="card-title" id="prodName">${row.nome}</h4>
                <h4 class="card-text">R$${Number(row.preco).toFixed(2)} un</h4>

                <div class="d-flex justify-content-end">
                  ${dateIconStr}
                  <h4 class="card-text" id="date">${dateStr}</h4>
                </div>

            </div>
        </div>
     `;
  });

  loadPage();
}

function goToProductPage(id) {
  window.location.href = `productPage.php?id=${id}`;
}

function validateDate(dateData) 
{
    var date = new Date(dateData);
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();

    if (month < 10) 
    {
        month = "0" + month;
    }

    if (day < 10)
    {
        day = "0" + day;
    }

    if(date < new Date())
    {
        return "Disponível";
    }

    return day + "/" + month;
}

function loadPage() 
{
  document.body.removeAttribute("hidden");
}
