<?php include 'header.php'; ?>

<body hidden>
    <link href="styles/accountPage.css" rel="stylesheet">

    <h1 class="text-center">Configurações da Conta</h1>

    <div id="infoGroup" class="d-flex justify-content-center">
        <div class="d-flex">

            <div class="containerBox" onclick="selectImage()">
                <img id="imgInput" src="assets/images/user-placeholder.png"/>
                <input type="file" id="fileInput" style="display:none;">
                <h1 class="centered">Selecione uma foto</h1>
            </div>
            <div class="d-flex align-items-center">
                <div id="userInfoFields" class="col">
                    <div class="form-group">
                        <h4>Email:</h4>
                        <input class="form-control" type="text" id="emailInput">
                    </div>

                    <div class="form-group">
                        <h4>Nome Completo:</h4>
                        <input class="form-control" type="text" id="nameInput">
                    </div>

                    <div class="form-group">
                        <h4>Telefone:</h4>
                        <input class="form-control" type="text" id="phoneInput">
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div id="buttonGroup" class="container d-flex justify-content-end">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#changePasswordModal" id="changePass" onclick="clearPass()">
            Alterar Senha
        </button>

        <div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-labelledby="changePasswordModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" style="width:100rem;" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="modal-title">Alterar Senha</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form>
                        <div class="modal-body">
                            <div id="passGroup" class="form-group">
                                <input type="password" name="password" class="form-control" id="passInput" placeholder="Digite sua Senha">

                                <div class="password-toggle">
                                    <img hidden="true" src="assets\images\eye-icon.png" id="passShow">
                                    <img src="assets\images\eye-icon-slash.png" id="passHide">
                                </div>
                            </div>

                            <div id="newPassGroup" class="form-group">
                                <input type="password" name="newPassword" class="form-control" id="newPassInput" placeholder="Digite sua Nova Senha">

                                <div class="password-toggle">
                                    <img hidden="true" src="assets\images\eye-icon.png" id="newPassShow">
                                    <img src="assets\images\eye-icon-slash.png" id="newPassHide">
                                </div>
                            </div>

                            <div id="confirmPassGroup" class="form-group">
                                <input type="password" name="confirmPassword" class="form-control" id="confirmPassInput" placeholder="Confirme sua Nova Senha">

                                <div class="password-toggle">
                                    <img hidden="true" src="assets\images\eye-icon.png" id="confirmPassShow" style="top: 212px; right: 28px;">
                                    <img src="assets\images\eye-icon-slash.png" id="confirmPassHide" style="top: 212px; right: 28px;">
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="saveChangePass" onclick="checkToken('updatePassword')">
                                Editar
                                <img id="editIcon" src="assets/images/edit-icon.png">
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <button type="button" class="btn btn-primary" id="saveChangeUser" onclick="checkToken('updateAccount')">Salvar Alterações</button>
    </div>

    <script src="assets/js/accountPage.js"></script>

</body>