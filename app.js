$(document).ready(function(){
    var departement = null;
    var nomFiltre = null;

    $.get("http://localhost:8080/collaborateurs", function (donnee) {
        var matricule = "";
        var nom = "";
        var prenom = "";
        
        donnee.forEach((el) => {
            if(departement==null || nomFiltre == null){
                $(".table").append(`
                <tr>
                    <td><a class="btn" onclick="getBanque('${el.matricule}')">${el.matricule}</button></td>
                        <td>${el.nom}</td>
                        <td>${el.prenom}</td>
                    </tr>`);
            }else{
                if(el.idDepartement == departement){
                    $(".table").append(`
                    <tr>
                        <td>
                            <a onclick="getBanque('${el.matricule}')">${el.matricule}</button></td><td>${el.nom}</td><td>${el.prenom}
                        </td>
                    </tr>`);
                }
                if(el.nom == nomFiltre){
                    $(".table").append(`
                    <tr>
                        <td>
                            <a onclick="getBanque('${el.matricule}')">${el.matricule}</button></td><td>${el.nom}</td><td>${el.prenom}
                        </td>
                    </tr>`);
                }
            }
        })

    $.get("http://localhost:8080/departements", function (donnee) {
        var nom = "";
        var value = "";
        
        donnee.forEach((el) => {
            $("#departement").append(`
                <option value="${el.value}">${el.nom}</option>`);
         })
    })

});
    $("#filtre").click(function(){
        departement = $("#departement").val();
        nomFiltre = $("#nom").val();
    });

    
});

function sauver(matricule){
    var donnees = {};
    $('#ajout').serializeArray().forEach(don => donnees[don.name] = don.value);

    $.ajax({
        url: "http://localhost:8080/collaborateurs/" + matricule+ "/banque",
        contentType : 'application/json',
        type: 'PUT',
        data: JSON.stringify(donnees)
    });
}

function getBanque(matricule){
    $.get("http://localhost:8080/collaborateurs/" + matricule + "/banque", function (donnee) {
        var banque = "";
        var iban = "";
        var bic = "";
        
        $("#banque").val(donnee.nom);
        $("#iban").val(donnee.iban);
        $("#bic").val(donnee.bic);
        $('#divButton').html(`<input type="button" value="Créer" class="btn btn-default" name="creer" id="submit" onclick="sauver('`+matricule+`')">`);
    });
}






