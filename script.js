$('document').ready(function(){

    // 1. AJAX CALL
    let url = 'http://data.metromobilite.fr/api/routers/default/index/routes';

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

        if (typeDeLigne == 'TRAM'){ //rewrite to switch-case

            // Création button avec son id + son style
            // tu peux utiliser les `${var}` ou le ' + var + '
            // mettre l'ID dans une variable

           $('#contentTram').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>');  //add color with id for each button; couleurLigne - color's variable, nomDeLigneCourte - shortname's variable
           $('#contentTram').append('<p id="info_' + data[i].id + '">' + nomDeLigneLongue + '</p>');
            //$('#infoTram').append('<p id="' + data[i].id + '">'+ nomDeLigneLongue +'</p>');


          }

        if (typeDeLigne == 'SNC'){
            $('#contentTrain').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>');
            $('#contentTrain').append('<p>' + nomDeLigneLongue + '</p>');

          }

        if (typeDeLigne == 'FLEXO' || typeDeLigne=='Structurantes' || typeDeLigne=='Urbaines'
          || typeDeLigne=='Interurbaines') {
             $('#contentBus').append('<button id="'+data[i].id+'">' + nomDeLigneCourte + '</button>');
             $('#contentBus').append('<p>' + nomDeLigneLongue + '</p>');
           }


        if (typeDeLigne == "C38") {
            $('#contentBusExpress').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>');
            $('#contentBusExpress').append('<p>' + nomDeLigneLongue + '</p>');
            }

        if (typeDeLigne == "SCOL") {
            $('#contentBusScolaires').append('<button id="' + data[i].id + '" style="background: #' + couleurLigne+'">'+ nomDeLigneCourte + '</button>');
            $('#contentBusScolaires').append('<p>' + nomDeLigneLongue + '</p>');
            }


        let transport_id = data[i].id;

                    $.ajax({
                        url: "https://data.metromobilite.fr/api/lines/json?types=ligne",
                        type: "GET", // par défaut
                        dataType: "json", // ou HTML par ex
                        data: {
                          "codes": transport_id.replace(":", "_")
                        },

                        // Si succès
                        success: function(data, statut) {
                            stops = data['features'][0]['properties']['ZONES_ARRET'];
                            for (i in stops) {
                            /*$.ajax({
                                url: "https://data.metromobilite.fr/api/routers/default/index/clusters/" + stops[i].replace("_", ":") + "/stoptimes",
                                type: "GET", // par défaut
                                dataType: "json", // ou HTML par ex

                                // Si succès
                                success: function(data, statut) {
                                    console.log(data);
                                    console.log(transport_id);
                                     console.log(data.filter(transport => transport['pattern']['id'].includes(transport_id)));
                                }
                            });*/
                            /*switch (typeDeLigne) {
                              case 'TRAM':
                                 $('#contentTram').append("<p>" + stops[i] + "</p>");
                                 break;
                              case 'SNC':
                                 $('#contentTrain').append("<p>" + stops[i] + "</p>");
                            }*/
                            //.filter(button => button['id'] == transport_id)
                            //console.log($(".contentButton"), $(".contentButton")[0], $(".contentButton")[0]['id'], transport_id);
                            $("<p class='contentInfo'>" + stops[i] + "</p>").insertAfter($(".contentInfo").filter(button => $(".contentInfo")[button]['id'] === "info_" + transport_id)[0]);
                            //$(".contentButton").filter(button => $(".contentButton")[button]['id'] === transport_id)
                            //map
                          }
                        }
                    });
          }

        $('p').addClass('contentInfo');
        $('button').addClass('contentButton');
        $('.contentInfo').hide();

        $('.contentButton').click(function () {
            let info = $(this).next('.contentInfo');
            if (info.css('display') == 'none')
              {
              $('.contentInfo').hide();
              info.show();
            }
            else {
              info.hide();
            }

          });

    }

    // fenetre modale quand la page se charge
    $(document).ready(function() {

        // Клик по ссылке "Закрыть".
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


    $(document).on('click' , '.btn' , function(){

                $(this).next('.contentInfo').toggle();

                $('#contentTrain').toggle();


                console.log("OK clic sur la box");


                let idTransport = $(this).attr('id');

                let urlId = 'http://data.metromobilite.fr/api/routers/default/index/routes?codes=' + idTransport;


                $.ajax({
                    url: urlId,
                    type: "GET", // par défaut
                    dataType: "json", // ou HTML par ex

                    // Si succès
                    success: function(data, statut) {
                        console.warn("SUCCESS detail");
                        console.log(data);
                        console.log('Statut : ' + statut);

                        // Ma fonction => ne fonctionne que chez moi ^^


                    },

                    // Si erreur
                    error: function(result, statut, erreur){
                        console.warn("ERREUR");
                        console.log(result);
                        console.log("Erreur : " + statut + ' ' + erreur)
                    },

                    // A la fin !
                    complete: function(result, statut){
                        console.warn("AJAX CALL COMPLETE");
                        console.log(result);
                        console.log("Complet : " + statut);
                    }

                });

            });

        });
