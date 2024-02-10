<!DOCTYPE html>
<html>

<head>
    <title>Login</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link href="styles\userCreationOrLogin.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.5/jquery.inputmask.min.js"></script>
</head>

<body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

    <div class="col d-flex justify-content-center align-items-center min-vh-100">

        <form id="creationForm">
            <div class="card" style="width:30rem; height:5.5rem;">
                <div class="card-body">
                    <h1 id="stepText" class="col d-flex justify-content-center">Vamos Começar?</h1>
                </div>
            </div>

            <!-- First Step of the form -->
            <div id="step1" class="card" style="width:30rem; height:14rem;">
                <div class="card-body">
                    <h3 class="col d-flex justify-content-center">Qual o seu interesse?</h3>

                    <div class="form-group">
                        <select id="selectType" class="form-select" aria-label="Selecione seu interesse">
                            <option value="produtor">Ser um produtor</option>
                            <option value="consumidor">Ser um consumidor</option>
                        </select>
                    </div>

                    <div class="col d-flex justify-content-center">
                        <button id="continue1" type="button" style="margin: 2% 0;" class="btn btn-primary" onclick="validateField()">Continuar</button>
                    </div>
                </div>
            </div>

            <!-- Second Step of the form -->
            <div id="step2" hidden="true" class="card" style="width:30rem; height:23rem;">
                <div class="card-body">
                    <br>
                    <div class="form-group">
                        <input class="form-control" type="text" id="nameInput" placeholder="Nome Completo">
                    </div>

                    <div id="passGroup" class="form-group">
                        <input type="password" name="password" class="form-control" id="passInput" placeholder="Senha">

                        <div class="password-toggle">
                            <img hidden="true" src="assets\images\eye-icon.png" id="passShow">
                            <img src="assets\images\eye-icon-slash.png" id="passHide">
                        </div>
                    </div>

                    <div id="confirmPassGroup" class="form-group">
                        <input type="password" name="confirmPassword" class="form-control" id="confirmPassInput" placeholder="Confirmar Senha">

                        <div class="password-toggle">
                            <img hidden="true" src="assets\images\eye-icon.png" id="confirmPassShow" style="top: 212px; right: 28px;">
                            <img src="assets\images\eye-icon-slash.png" id="confirmPassHide" style="top: 212px; right: 28px;">
                        </div>
                    </div>

                    <br>

                    <div class="col d-flex justify-content-center">
                        <button id="back2" type="button" style="margin: 2% 0; margin-right: 10px;" class="btn btn-primary" onclick="sendToStep(-1)">Voltar</button>
                        <button id="continue2" type="button" style="margin: 2% 0;" class="btn btn-primary" onclick="validateField()">Continuar</button>
                    </div>
                </div>
            </div>

            <!-- Third Step of the form -->
            <div id="step3" hidden="true" class="card" style="width:30rem; height:20rem;">
                <div class="card-body">
                    <br>
                    <div class="form-group">
                        <input type="email" class="form-control" name="email" id="emailInput" aria-describedby="emailHelp" placeholder="E-mail">
                    </div>

                    <div class="form-group">
                        <input class="form-control" type="text" id="phoneInput" placeholder="Telefone">
                    </div>

                    <br>

                    <div class="col d-flex justify-content-center">
                        <button id="back3" type="button" style="margin: 2% 0; margin-right: 10px;" class="btn btn-primary" onclick="sendToStep(-1)">Voltar</button>
                        <button id="continue3" type="button" style="margin: 2% 0;" class="btn btn-primary" onclick="validateField()">Criar Conta</button>
                    </div>
                </div>
            </div>

        </form>
    </div>

    <script src="assets\js\userCreationPage.js"></script>
</body>