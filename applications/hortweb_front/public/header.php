<!DOCTYPE html>
<html>

<head>
    <title>Hortweb</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link href="styles/header.css" rel="stylesheet">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.5/jquery.inputmask.min.js"></script>
</head>

<body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

    <nav id="navbar" class="navbar sticky-top border-bottom border-body">
        <div class="container-fluid">
            <a href="http://localhost">
                <img src="assets/images/logo text.png" class="logo" width="170" height="85">
            </a>

            <form id="searchForm" class="col d-flex justify-content-center" role="search">
                <input id="searchBar" class="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search">
            </form>

            <a href="userLogin.php">
                <button id="login" type="button" class="btn">Login</button>
            </a>

            <div id="accountGrp" hidden="true" class="dropdown">
                <button id="account" class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Bem vindo, Fulano
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="accountPage.php">Conta</a></li>
                    <li><a id="interesses" class="dropdown-item" href="interestsPage.php">Lista de Interesses</a></li>
                    <li><a id="meusProdutos" class="dropdown-item" href="myProductsPage.php">Meus Produtos</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="javascript:void(0)" onclick="logout()">Logout</a></li>
                </ul>
            </div>
        </div>

    </nav>

    <script src="assets/js/checkUser.js"></script>
    <script src="assets/js/header.js"></script>