<?php include 'header.php'; ?>

<body hidden>

    <link href="styles/productPage.css" rel="stylesheet">

    <br>
    <br>

    <div id="productGroup" class="d-flex justify-content-center">

        <img id="prodImg" src="assets/images/user-placeholder.png">


        <div id="prodCard" class="card p-0">
            <div class="card-body d-flex flex-column">
                <h1 class="card-title text-center" id="prodName">Nome do Produto</h1>

                <div class="container">
                    <h4 class="overflow-auto" id="prodDesc"></h4>
                </div>

                <div class="flex-fill"></div>

                <div class="container">
                    <h2 class="card-text">Por:</h2>
                    <h1 class="card-text" id="prodPrice">R$preço,00 un</h1>
                </div>

                <div class="flex-fill"></div>

                <div id="dateField" class="container">
                    <h2 class="card-text" id="prodDate">Data da colheita: 00/00</h2>
                    <img id="dateIcon" src="assets/images/date-icon.png">
                </div>

                <div class="flex-fill"></div>

                <div class="d-flex justify-content-center">
                    <button id="InterestBttn" class="btn btn-primary" onclick="checkToken('interestAction')">Tenho Interesse</button>
                </div>

            </div>
        </div>
    </div>

    <h1 id="producerSectionText" class="text-center">ENTRE EM CONTATO COM O PRODUTOR</h1>

    <div id="producerGroup" class="d-flex justify-content-center">
        <div id="userCard" class="card p-0">
            <div class="card-body">

                <div id="producerCardContent" class="d-flex">
                    <img id="userImg" src="assets/images/user-placeholder.png">

                    <div class="col">
                        <h2 class="card-text" id="userName">Nome: nome do usuário</h2>
                        <h2 class="card-text" id="userEmail">Email: email do usuário</h2>

                        <h2 class="card-text" id="userPhone">Telefone: telefone do usuário</h2>
                    </div>
                </div>


            </div>
        </div>
    </div>



    <script src="assets\js\productPage.js"></script>
</body>