<!DOCTYPE html>
<html>

<head>
    <title>Login</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link href="styles\userCreationOrLogin.css" rel="stylesheet">
</head>

<body>
    <div class="col d-flex justify-content-center align-items-center min-vh-100">
        <div class="card" style="width:30rem; height:39rem;">
            <div class="card-body">
                <div class="col d-flex justify-content-center">
                    <img src="assets/images/logo.jpeg" class="Logo" width="280" height="280">
                </div>

                <form id="loginForm">
                    <div class="form-group">
                        <input type="email" class="form-control" name="email" id="emailInput" aria-describedby="emailHelp" placeholder="E-mail">
                    </div>

                    <div id="passGroup" class="form-group">
                        <input type="password" name="password" class="form-control" id="passInput" placeholder="Senha">

                        <div class="password-toggle">
                            <img hidden="true" src="assets\images\eye-icon.png" id="show">
                            <img src="assets\images\eye-icon-slash.png" id="hide">
                        </div>
                    </div>

                    <div class="col d-flex justify-content-center">
                        <button id="loginBttn" type="submit" class="btn btn-primary">Login</button>
                    </div>
                </form>

                <div class="col d-flex justify-content-center">
                    <p><a id="noAccount" class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="../userCreation.php">Não tenho uma conta</a></p>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/userLoginPage.js"></script>
</body>