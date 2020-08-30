$('document').ready(function(){

    // 1. AJAX CALL
    let url = 'http://dfdgtrgfata.metromobilite.fr/api/routers/default/index/routes';
    
    $.ajax({
        url: url,
        type: "GET", // par défaut
        dataType: "json", // ou HTML par ex
        
        // Si succès 
        success: function(data, statut) {
            console.warn("SUCCESS");
            // console.log(data);
            console.log('Statut : ' + statut);
            
            // Ma fonction => ne fonctionne que chez moi ^^
            listing(data);
            
        },
        
        // Si erreur
        error: function(result, statut, erreur){ //add "try again" button
            console.warn("ERREUR");
            console.log(result);
            console.log("Erreur : " + statut + ' ' + erreur)

            let buttonRestart = '<button id="buttonRestart"> Button restart </button>' //bouton pour recharger la page
			let btn = $("body").append(buttonRestart);
             $(btn).click(function() { //fonction qui recharge la page
                    location.reload();
                 });
                
        },
        
        // A la fin !
        complete: function(result, statut){
            console.warn("AJAX CALL COMPLETE");
            console.log(result);
            console.log("Complet : " + statut);
        }
        
    });
 
    // 2. Mes fonctions persos
    
    function listing(data){
        console.log(data)

        for(let i = 0; i < data.length; i++){ //ma boucle

            let nomDeLigneLongue = data[i].longName; //mes variables
            let nomDeLigneCourte = data[i].shortName;
            let modeDeLigne = data[i].mode;
            let couleurLigne = data[i].color;
            let typeDeLigne = data[i].type;

            console.log(data[i].id)

            let btn = '<button id="'+ data[i].id +'" class="box"></button>'; //variable btn crée des boutons avec ajout d'un id pour chaque bouton et class box pour chaque bouton
            
            $(btn).attr('id'); //ajout à ma variable btn un id 
            $('#contentTram').css('display', 'none'); 
            $('#contentTrain').css('display', 'none');
            $('#contentBus').css('display', 'none');
            $('#contentBusExpress').css('display', 'none');
            $('#contentBusScolaires').css('display', 'none');
            $('#infoTram').css('display', 'none');
           


            $('#tramLines').click(function(){ //si je clique sur #tramLines, ça m'affiche contentTram 
                $('#contentTram').toggle()
            })

            $('#trainLines').click(function(){
                $('#contentTrain').toggle()
   
            })

            $('#busLines').click(function(){
                $('#contentBus').toggle()
   
            })

            $('#busExpressLines').click(function(){
                $('#contentBusExpress').toggle()
   
            })

            $('#busScolaireLines').click(function(){
                $('#contentBusScolaires').toggle()
   
            }) 
            
            console.log(couleurLigne)

            switch(typeDeLigne) {

                case 'TRAM' :
                     $('#contentTram').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>'); 
                     $('#contentTram').append('<p id="info_' + data[i].id + '" >' + nomDeLigneLongue + '</p>'); //ajout un id pour chaque <p> de contentTram
                     break;

                case 'SNC' :
                    $('#contentTrain').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>'); 
                    $('#contentTrain').append('<p id="info_' + data[i].id + '" >' + nomDeLigneLongue + '</p>');
                    break;

                case 'FLEXO' , 'Structurantes' , 'Urbaines' , 'Interurbaines':
                    $('#contentBus').append('<button id="'+data[i].id+'">' + nomDeLigneCourte + '</button>');
                    $('#contentBus').append('<p id="info_' + data[i].id + '" >' + nomDeLigneLongue + '</p>');
                    break;

                case 'C38' : 
                    $('#contentBusExpress').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>');
                    $('#contentBusExpress').append('<p id="info_' + data[i].id + '" >' + nomDeLigneLongue + '</p>');
                    break;

                case 'SCOL' :
                    $('#contentBusScolaires').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>');
                    $('#contentBusScolaires').append('<p id="info_' + data[i].id + '" >' + nomDeLigneLongue + '</p>');
                    break;

            }
             

        // if (typeDeLigne == 'TRAM'){ //rewrite to switch-case

        //     // Création button avec son id + son style
        //     // tu peux utiliser les `${var}` ou le ' + var + '
        //     // mettre l'ID dans une variable

        //     $('#contentTram').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>');  //add color with id for each button; couleurLigne - color's variable, nomDeLigneCourte - shortname's variable 
        //     $('#contentTram').append('<p>' + nomDeLigneLongue + '</p>');
        //     //$('#infoTram').append('<p id="' + data[i].id + '">'+ nomDeLigneLongue +'</p>');
           
        //   }

        // if (typeDeLigne == 'SNC'){
        //     $('#contentTrain').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>'); 
        //     $('#contentTrain').append('<p>' + nomDeLigneLongue + '</p>');
            
        //   }

        // if (typeDeLigne == 'FLEXO' || typeDeLigne=='Structurantes' || typeDeLigne=='Urbaines'
        //   || typeDeLigne=='Interurbaines') {
        //      $('#contentBus').append('<button id="'+data[i].id+'">' + nomDeLigneCourte + '</button>');
        //      $('#contentBus').append('<p>' + nomDeLigneLongue + '</p>');
        //    }
        

        // if (typeDeLigne == 'C38') {
        //     $('#contentBusExpress').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>');
        //     $('#contentBusExpress').append('<p>' + nomDeLigneLongue + '</p>');
        //     }  
        
        // if (typeDeLigne == 'SCOL') {
        //     $('#contentBusScolaires').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>');
        //     $('#contentBusScolaires').append('<p>' + nomDeLigneLongue + '</p>');
        //     }   

         }

        $('p').addClass('contentInfo'); //add class contentInfo to <p>
        $('button').addClass('contentButton'); //add class contentButton to button
        $('.contentInfo').hide(); // hide class contentInfo by default

        $('.contentButton').click(function () { //i click on button with class contentButton 
            let info = $(this).next('.contentInfo'); //veriable info search for next object of contentInfo. It's <p> 
            if (info.css('display') == 'none') //if my veriable info have display none, 
              {
              $('.contentInfo').hide(); //i hide <p> with class contentInfo
              info.show(); //i show <p> with class info 
            }
            else {
              info.hide(); //else i hide info
            }

          });

        


    }

     // fenetre modale quand la page se charge
     $(document).ready(function() {
        // fermeture du lien 
        $('.popup-close').click(function() {
            $(this).parents('.popup-fade').fadeOut();
            return false;
        }); 

    // fonction qui permet d'afficher le message chaque minute    
        setInterval(function(){
            $('.popup-close').click(function() {
                $(this).parents('.popup-fade').fadeIn();
                return false;
            });
        }, 10000);

    });

        });