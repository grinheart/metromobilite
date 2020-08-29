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
    
    // 2. Mes fonctions persos
    
    function listing(data){
        console.log(data)

        for(let i = 0; i < data.length; i++){

            let nomDeLigneLongue = data[i].longName;
            let nomDeLigneCourte = data[i].shortName;
            let modeDeLigne = data[i].mode;
            let couleurLigne = data[i].color;

            console.log( nomDeLigneLongue + ' - ' + data[i].type + ' - #' + data[i].color);

            let nom = "<h2>" + nomDeLigneLongue + "</h2>";
            $('#contentBus').append(nomDeLigneLongue); //injecte de nomDeLigneLongue sur html id contentBus 
            $('#contentBus').css('display', 'block');

            // .html('<p>lkjjflskdfjlsdkfj</p>')
            // .text("du texte")

            modeDeLigne = document.createElement('tr');
            modeDeLigne.innerText = data[i].mode;
            document.body.append (modeDeLigne);

            nomDeLigneCourte = document.createElement('button');
            nomDeLigneCourte.innerText = data[i].shortName;
            //nomDeLigneCourte.innerHTML = data[i].color;
            document.body.append (nomDeLigneCourte);
            $('button').addClass('infoBusClick box').attr('id' , data[i].id);
            // $('.infoBusClick').click(function(){$(s'.infoBus').show();});
            $('button').css('display', 'inline-flex');


            nomDeLigneLongue = document.createElement('tr'); //creation de tr pour nom longue
            nomDeLigneLongue.innerText = data[i].longName; // ajout à HTML
            document.body.append (nomDeLigneLongue); //affichage sur html
            $('tr').addClass('infoBus') //ajout de la class
            $('tr').css('display','none') //ajout display none pour div de nom longue

            
        }

        $('.box').click(function(){
            alert('ok')
    
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
                            $('.infoBus').css('display','block')
                            
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
    
    }
    
    


        });