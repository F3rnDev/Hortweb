<?php include 'header.php'; ?>

<body hidden>
    <link href="styles/myProductsPage.css" rel="stylesheet">

    <h1 class="text-center">Meus Produtos</h1>

    <div class="container">
        <button id="newProdBttn" class="btn btn-primary text-start" data-toggle="modal" data-target="#setOrCreateProduct" onclick="displayCreateProductModal()">
            Novo Produto
            <img src="assets/images/plus-icon.png">
        </button>

    </div>

    <div id="prodListing">

    </div>

    <div class="modal fade" id="setOrCreateProduct" tabindex="-1" role="dialog" aria-labelledby="setOrCreateProduct" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered" style="width:100rem;" role="document">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <form>
                    <div class="modal-body">
                        <div id="infoGroup" class="d-flex justify-content-center">
                            <div class="d-flex">
                                <div class="containerBox" onclick="selectImage()">
                                    <img id="imgInput" src="assets/images/user-placeholder.png" />
                                    <input type="file" id="fileInput" style="display:none;">
                                    <h1 class="centered">Selecione uma foto</h1>
                                </div>

                                <div class="d-flex align-items-center">
                                    <div id="prodInfoFields" class="col">
                                        <input class="form-control" type="text" id="prodId" hidden>

                                        <div class="form-group">
                                            <h4>Nome do Produto:</h4>
                                            <input class="form-control" type="text" id="prodNameInput">
                                        </div>

                                        <div class="form-group">
                                            <h4>Preço:</h4>
                                            <input class="form-control" type="text" id="prodPriceInput">
                                        </div>

                                        <div class="form-group">
                                            <h4>Data da colheita:</h4>
                                            <input class="form-control" type="date" id="prodDateInput">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex align-items-center">
                            <div id="prodDescField" class="col">
                                <div class="form-group">
                                    <h4>Descrição:</h4>
                                    <textarea class="form-control" rows="5" id="prodDescInput"></textarea>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="viewProd" onclick="viewProduct()">
                            Visualizar Produto
                        </button>

                        <button type="button" class="btn btn-primary" id="saveChanges" onclick="checkToken('editChanges')">
                            Editar
                            <img id="editIcon" src="assets/images/edit-icon.png">
                        </button>

                        <button hidden type="button" class="btn btn-success" id="createProd" onclick="checkToken('createProduct')">
                            Criar Produto
                            <img id="addIcon" src="assets/images/plus-icon.png">
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deleteProductConfirm" tabindex="-1" role="dialog" aria-labelledby="deleteProductConfirm" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="width:100rem;" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <h4>Tem certeza que quer deletar este produto?</h4>
                </div>

                <div class="modal-footer">

                    <input class="form-control" type="text" id="confirmProdId" hidden>

                    <button type="button" class="btn btn-secondary" id="noDelete" onclick="closeConfirmModal()">
                        Não
                    </button>

                    <button type="button" class="btn btn-danger" id="yesDelete" onclick="checkToken('deleteProduct')">
                        Sim
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/myProductsPage.js"></script>

</body>