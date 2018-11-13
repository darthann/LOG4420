$(document).ready(function() {
    var cartCount = localStorage.getItem("count");
    if (cartCount != null && cartCount != 0) {
        var badge = $(".shopping-cart > .count");
        badge.show();
        badge.text(cartCount);
    }

    //Méthode de validation pour la date d'expiration de la carte de crédit
    $.validator.addMethod("expiryDate", function(value, element) {
        var month = value.charAt(0) + value.charAt(1);
        var year1 = value.charAt(3);
        var year2 = value.charAt(4);
        
        var correctMonth = String(month).search(/01|02|03|04|05|06|07|08|09|10|11|12/i);
        var correctYear1 = year1.search(/[0-9]/i);
        var correctYear2 = year2.search(/[0-9]/i);

        return this.optional(element) || (value.length < 6 && correctMonth != -1 && correctYear1 != -1 
            && correctYear2 != -1 && String(value.charAt(3)).localeCompare("/"));
    }, "La date d'expiration de votre carte de crédit est invalide.");

    //Règles de validation
    $("#order-form").validate({
        rules: {
            fname: {
                required: true,
                minlength: 2
            },
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                phoneUS: true
            },
            creditcard: {
                required: true,
                creditcard: true
            },
            expiry: {
                required: true,
                expiryDate: true
            }
          },
          messages: {
              fname: { 
                 required: "Ce champ est obligatoire.",
                 minlength: "Veuillez fournir au moins 2 caractères."
              },
              name: {
                required: "Ce champ est obligatoire.",
                minlength: "Veuillez fournir au moins 2 caractères."
              },
              email: {
                required: "Ce champ est obligatoire.",
                email: "Veuillez fournir une adresse électronique valide."
                },
                phone: {
                    required: "Ce champ est obligatoire.",
                    phoneUS: "Veuillez fournir un numéro de téléphone valide."
                },
                creditcard: {
                    required: "Ce champ est obligatoire.",
                    creditcard: "Veuillez fournir un numéro de carte de crédit valide."
                    //Un véritable numéro de carte de crédit est nécessaire.
                },
                expiry: {
                    required: "Ce champ est obligatoire."
                }
          }
    });

    //Soumission de la forme
    $("#order-form").submit(function(e) {
        e.preventDefault();

        //On verifie si la form est valid (tous les champs remplis correctement)
        if ($(this).valid()) {
            //On vide le shopping-cart
            for (var i = 1; i <= 13; i++) {
                localStorage.removeItem("item" + i);
            }
            localStorage.setItem("count", parseInt(0));

            var commandCount = localStorage.getItem("commandCount");

            if (commandCount == null) {
                commandCount = 0;
            }
            //Incremente et conserve le numero de commande
            localStorage.setItem("commandCount", parseInt(commandCount) + parseInt(1));
            //Conserve le prénom et le nom pour la page confirmation.html
            localStorage.setItem("first-name", document.getElementById("first-name").value);
            localStorage.setItem("last-name", document.getElementById("last-name").value);

            window.location = 'confirmation.html';
        }
    });
});