$(document).ready(function () {
  $("#prodPriceInput").inputmask('R$ 9{0,1}9{2,3},99 un', { 
    numericInput: true,
    placeholder: '0',
    clearMaskOnLostFocus: true,
  });

  var today = new Date().toISOString().split('T')[0];
  $('#prodDateInput').attr('min', today);
});

function setMyProductsPage(userId) {
  fetch("http://localhost:8080/controller/listMyProducts.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.product) 
      {
        updateMyProductsPage(data.product);
      }
      else
      {
        loadPage();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateMyProductsPage(products) {
  var prodListing = document.getElementById("prodListing");

  products.forEach(function (row) {
    var dateStr = validateDate(row.proddata);
    var dateIconStr = "";

    var referenceFolder = "assets/images/products/";

    if (row.img == null || row.img == "") {
      row.img = "user-placeholder.png";
      referenceFolder = "assets/images/";
    }

    var desc = row.descricao.substring(0, 15) + "...";

    prodListing.innerHTML += `

            <div class="d-flex justify-content-center">
                <div id="prodCard" class="card p-0" data-toggle="modal" data-target="#setOrCreateProduct" data-product='${JSON.stringify(row)}' onclick="displayEditProductModal(this)">
                    <div class="card-body">
                        <div id="productCardContent" class="d-flex">
                            <img id="prodImg" src="${referenceFolder}${row.img}">

                            <div class="col">
                                <h2 class="card-text" id="prodName">${row.nome}</h2>
                                <h2 class="card-text" id="prodDesc">${desc}</h2>
                            </div>

                            <div class="col">

                                <div class="d-flex">
                                    <h2 class="card-text" id="prodDate">Data de colheita: ${dateStr}</h2>
                                    ${dateIconStr}
                                </div>

                                <h2 class="card-text" id="prodPrice">Preço: R$${Number(row.preco).toFixed(2)} un</h2>
                            </div>


                            <div id="deleteBackground">
                                <div class="d-flex justify-content-end">
                                    <img id="deleteIcon" src="assets/images/delete-icon.png" onclick="openDeleteProductModal(event, ${row.id})">
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

function loadPage()
{
  document.body.removeAttribute("hidden");
}

function validateDate(dateData) 
{
  var date = new Date(dateData);
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  return day + "/" + month + "/" + year;
}

function displayEditProductModal(productJSON)
{
  var product = JSON.parse(productJSON.dataset.product);

  document.getElementById("prodId").value = product.id;
  document.getElementById("prodNameInput").value = product.nome;
  document.getElementById("prodDescInput").value = product.descricao;
  document.getElementById("prodPriceInput").value = Number(product.preco).toFixed(2);
  document.getElementById("prodDateInput").value = product.proddata;

  if(product.img == "user-placeholder.png")
  {
    document.getElementById("imgInput").setAttribute("src", "assets/images/user-placeholder.png");
  }
  else
  {
    document.getElementById("imgInput").setAttribute("src", "assets/images/products/" + product.img);
  }

  document.getElementById("viewProd").removeAttribute("hidden");
  document.getElementById("saveChanges").removeAttribute("hidden");
  document.getElementById("createProd").setAttribute("hidden", true);
}

function displayCreateProductModal()
{
  document.getElementById("prodNameInput").value = "";
  document.getElementById("prodDescInput").value = "";
  document.getElementById("prodPriceInput").value = "";
  document.getElementById("prodDateInput").value = "";
  document.getElementById("imgInput").setAttribute("src", "assets/images/user-placeholder.png");

  document.getElementById("createProd").removeAttribute("hidden");
  document.getElementById("saveChanges").setAttribute("hidden", true);
  document.getElementById("viewProd").setAttribute("hidden", true);
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

function viewProduct()
{
  var prodId = document.getElementById("prodId").value;

  window.location.href = "http://localhost/productPage.php?id=" + prodId;
}

const confirm = new bootstrap.Modal(document.getElementById('deleteProductConfirm'));

function openDeleteProductModal(event, productId)
{
  event.stopPropagation();
  confirm.show();

  document.getElementById("confirmProdId").value = productId;
}

function closeConfirmModal()
{
  confirm.hide();
}

function deleteProduct(status)
{
  switch(status)
  {
    case "validToken":
    {
      var prodId = document.getElementById("confirmProdId").value;

      fetch("http://localhost:8080/controller/deleteProduct.php", {
        method: "POST",
        body: JSON.stringify({ prodId }),
      })
        .then((res) => res.json())
        .then((data) => 
        {
          if(data.success)
          {
            window.location.reload();
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

function editChanges(status)
{
  switch(status)
  {
    case "validToken":
    {
      var prodName = document.getElementById("prodNameInput").value;
      var prodPrice = parseFloat(document.getElementById("prodPriceInput").value.replace("R$", "").replace(",", ".").replace("un", "").replace(" ", ""));
      var prodDate = new Date(document.getElementById("prodDateInput").value);
      var prodDesc = document.getElementById("prodDescInput").value;
      var prodId = document.getElementById("prodId").value;
      var newImg = newImgSrc;
    
      if(validateFields())
      {
        fetch("http://localhost:8080/controller/updateProduct.php", {
          method: "POST",
          body: JSON.stringify({ prodId, prodName, prodPrice, prodDate, prodDesc, newImg, imgExtension}),
        })
          .then((res) => res.json())
          .then((data) => 
          {
            if(data.success)
            {
              alert("Produto alterado com sucesso");
              window.location.reload();
            }
            else
            {
              alert("Erro ao alterar o produto");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

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

function createProduct(status)
{
  switch(status)
  {
    case "validToken":
    {
      var prodName = document.getElementById("prodNameInput").value;
      var prodPrice = parseFloat(document.getElementById("prodPriceInput").value.replace("R$", "").replace(",", ".").replace("un", "").replace(" ", ""));
      var prodDate = new Date(document.getElementById("prodDateInput").value);
      var prodDesc = document.getElementById("prodDescInput").value;
      var newImg = newImgSrc;
      var producerId = id;
    
      if(validateFields())
      {
        fetch("http://localhost:8080/controller/createProduct.php", {
          method: "POST",
          body: JSON.stringify({ prodName, prodPrice, prodDate, prodDesc, newImg, imgExtension, producerId}),
        })
          .then((res) => res.json())
          .then((data) => 
          {
            if(data.success)
            {
              alert("Produto criado com sucesso");
              window.location.reload();
            }
            else
            {
              alert("Erro ao criar produto");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

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

function validateFields()
{
  var prodName = document.getElementById("prodNameInput").value;
  var prodPrice = parseFloat(document.getElementById("prodPriceInput").value.replace("R$", "").replace(",", ".").replace("un", "").replace(" ", ""));
  var prodDesc = document.getElementById("prodDescInput").value;
  var prodDate = new Date(document.getElementById("prodDateInput").value);

  if(prodName == "" || prodDate == "" || prodDesc == "")
  {
    alert("Por favor preencha todos os campos");
    return false;
  }

  var regexLetras = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/;
  if (!regexLetras.test(prodName)) {
    alert("O campo do nome do produto deve conter apenas letras do alfabeto.");
    return false;
  }

  if (isNaN(prodDate.getTime())) {
    alert("Data inválida. Por favor, insira uma data válida.");
    return false;
  }

  let currDate = new Date();

  if (prodDate < currDate) {
    alert("A data deve ser igual ou posterior à data atual.");
    return false;
  }

  if(isNaN(prodPrice) || prodPrice <= 0 || prodPrice > 9999.99)
  {
    alert("Por favor insira um preço válido");
    return false;
  }

  return true;
}
