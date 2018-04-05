   $(document).ready(function(){

 
    
    $('.cards').flip();    
    
    $('.cards-ofertas').flip();
    var checkOutFilter = {
        tieneTarjeta: "",
        edad: "",
        ocupacion: "",
        ingresos: "",
        tieneHijos: "",
        tipoVivienda: "",
        tieneAutomovil: ""
    };

    var sliderAdministracion = $(".backAdministracion").bxSlider({infiniteLoop:false});
    var sliderInversion = $(".backInversiones").bxSlider({infiniteLoop:false});   
    var sliderCoberturas = $(".backCoberturas").bxSlider({infiniteLoop:false});
    var sliderCreditos = $(".backCreditos").bxSlider({infiniteLoop:false});

    var resultadoAdministracion = [];
    var resultadoInversiones = [];
    var resultadoCoberturas = [];
    var resultadoCreditos = [];
    
    $(".edad li a").click(function(event){
        event.preventDefault();
        switch($(this).attr("href")){
            case "Entre 18 y 24 años":
                checkOutFilter.edad = "<24";
                break;
            case "Entre 25 y 34 años":
                checkOutFilter.edad = "<34";
                break;
            case "Más de 35 años":
                checkOutFilter.edad = ">34";
                break;
                
        }        
        $(".resultadoEdad h3 strong").html($(this).attr("href").toLowerCase());
        $(".cardEdad").addClass("hide");
        $(".resultadoEdad").removeClass("hide");
        checkCompleto();
        return false;
    });
   
    $(".modificarEdad").click(function(event){
        event.preventDefault();
        $(".cardEdad").removeClass("hide");
        $(".resultadoEdad").addClass("hide");
        checkOutFilter.edad = "";
        checkCompleto();
        return false;
    });
   
    $(".vivienda li a").click(function(event){
        event.preventDefault();
        checkOutFilter.tipoVivienda = $(this).attr("href");
        $(".resultadoVivienda h3 strong").html("vivienda <br/>" + $(this).attr("href").toLowerCase());
        $(".cardVivienda").addClass("hide");
        $(".resultadoVivienda").removeClass("hide");
        checkCompleto();
        return false;
    });
   
    $(".modificarVivienda").click(function(event){
        event.preventDefault();
        $(".cardVivienda").removeClass("hide");
        $(".resultadoVivienda").addClass("hide");
        checkOutFilter.tipoVivienda = "";
        checkCompleto();
        return false;
    });
   
    $(".credito li a").click(function(event){
        event.preventDefault();
        checkOutFilter.tieneTarjeta = $(this).attr("href");
        
        if($(this).attr("href") == "NO"){
            $(".resultadTarjeta h3").html("No tengo <strong>tarjeta de crédito</strong>");
        }
        else{
            $(".resultadTarjeta h3").html("Tengo <strong>tarjeta de crédito</strong>");
        }
        
        $(".box-credito").addClass("hide");
        $(".resultadTarjeta").removeClass("hide");
        checkCompleto();
        return false;
    });
    
    $(".modificarCredito").click(function(event){
        event.preventDefault();
        $(".box-credito").removeClass("hide");
        $(".resultadTarjeta").addClass("hide");
        checkOutFilter.tieneTarjeta = "";
        checkCompleto();
        return false;
    });
    
    $(".ocupacion li a").click(function(event){
        event.preventDefault();
        checkOutFilter.ocupacion = $(this).attr("href");
        $(".resultadoOcupacion h3 strong").html($(this).attr("href").toLowerCase());
        $(".cardOcupacion").addClass("hide");
        $(".resultadoOcupacion").removeClass("hide");                
        checkCompleto();
        return false;
    });
    
    $(".modificarOcupacion").click(function(event){
        event.preventDefault();
        $(".cardOcupacion").removeClass("hide");
        $(".resultadoOcupacion").addClass("hide");
        checkOutFilter.ocupacion = "";
        checkCompleto();
        return false;
    });
    
    $(".hijos li a").click(function(event){
        event.preventDefault();
        checkOutFilter.tieneHijos = $(this).attr("href");
        
        if($(this).attr("href") == "NO"){
            $(".resultdoHijos h3").html("No tengo <strong>hijos</strong>");
        }
        else{
            $(".resultdoHijos h3").html("Tengo <strong>hijos</strong>");            
        }
        
        $(".cardHijos").addClass("hide");
        $(".resultdoHijos").removeClass("hide");
        
        checkCompleto();
        return false;
    });
    
    $(".modificarHijos").click(function(event){
        event.preventDefault();
        $(".cardHijos").removeClass("hide");
        $(".resultdoHijos").addClass("hide");
        checkOutFilter.tieneHijos = "";
        checkCompleto();
        return false;
    });
    
    $(".ingresos li a").click(function(event){
        event.preventDefault();
        switch($(this).attr("href")){
            case "Menor a $15,000":
                checkOutFilter.ingresos = "<15";
                break;
            case "De $15,000 a $50,000":
                checkOutFilter.ingresos = "<50";
                break;
            case "Mayor a $50,000":
                checkOutFilter.ingresos = ">50";
                break;
        }
        
        $(".resultadoIngresos h3 strong").html($(this).attr("href").toLowerCase());
        $(".cardIngresos").addClass("hide");
        $(".resultadoIngresos").removeClass("hide");
        checkCompleto();
        return false;
    });
   
    $(".modficarIngresos").click(function(event){
        event.preventDefault();
        $(".cardIngresos").removeClass("hide");
        $(".resultadoIngresos").addClass("hide");
        checkOutFilter.ingresos = "";
        checkCompleto();
        return false;
    });
   
    $(".automovil li a").click(function(event){
        event.preventDefault();
        checkOutFilter.tieneAutomovil = $(this).attr("href");
        
        if($(this).attr("href") == "NO"){
            $(".resultadoAutomovil h3").html("No tengo <strong>automóvil propio.</strong>");
        }
        else{
            $(".resultadoAutomovil h3").html("Tengo <strong>automóvil propio.</strong>");
        }
        
        $(".cardAutomovil").addClass("hide");
        $(".resultadoAutomovil").removeClass("hide");
        checkCompleto();
        return false;
    });
   
    $(".modificarAutomovil").click(function(event){
        event.preventDefault();
        $(".cardAutomovil").removeClass("hide");
        $(".resultadoAutomovil").addClass("hide");
        checkOutFilter.tieneAutomovil = "";
        checkCompleto();
        return false;
    });
   
    function checkCompleto(){        
        if(checkOutFilter.edad && checkOutFilter.ingresos && checkOutFilter.ocupacion && checkOutFilter.tieneAutomovil && checkOutFilter.tieneHijos && checkOutFilter.tieneTarjeta && checkOutFilter.tipoVivienda){
            /*
            var jsonAdministracion = $.getJSON("json/administracion.json?v=7");            
            jsonAdministracion.complete(function(data){
                var j = 0;
                $.each(data.responseJSON, function(i, item){                    
                    //if(item.ingresos.indexOf(checkOutFilter.ingresos) >= 0){
                        resultadoAdministracion[j] = generarRegistro(item);
                        j++;
                    //}
                });                
            });            
            var jsonInversiones = $.getJSON("json/inversiones.json?v=7");
            jsonInversiones.complete(function(data){
                var j = 0;
                $.each(data.responseJSON, function(i, item){                    
                    //if((item.edad.indexOf(checkOutFilter.edad) >= 0) && (item.ingresos.indexOf(checkOutFilter.ingresos) >= 0)){
                        resultadoInversiones[j] = generarRegistro(item);
                        j++;                        
                    //}
                });
            });
            var jsonCoberturas = $.getJSON("json/coberturas.json?v=7");
            jsonCoberturas.complete(function(data){
                var j = 0;
                $.each(data.responseJSON, function(i, item){                            
                    //if((item.edad.indexOf(checkOutFilter.edad) >= 0) && (item.ocupacion.indexOf(checkOutFilter.ocupacion) >= 0) && (item.tieneHijos.indexOf(checkOutFilter.tieneHijos) >= 0) && (item.tipoVivienda.indexOf(checkOutFilter.tipoVivienda) >= 0) && (item.tieneAutomovil.indexOf(checkOutFilter.tieneAutomovil) >= 0)){
                        resultadoCoberturas[j] = generarRegistro(item);
                        j++;
                    //}
                });
            });
            var jsonCreditos = $.getJSON("json/creditos.json?v=7");
            jsonCreditos.complete(function(data){
                var j = 0;
                $.each(data.responseJSON, function(i, item){
                    //if((item.tieneTarjeta.indexOf(checkOutFilter.tieneTarjeta) >= 0) &&(item.edad.indexOf(checkOutFilter.edad) >= 0) && (item.ocupacion.indexOf(checkOutFilter.ocupacion) >= 0) && (item.ingresos.indexOf(checkOutFilter.ingresos) >= 0) && (item.tieneHijos.indexOf(checkOutFilter.tieneHijos) >= 0) && (item.tipoVivienda.indexOf(checkOutFilter.tipoVivienda) >= 0)){
                        resultadoCreditos[j] = generarRegistro(item);
                        j++;
                    //}
                });
            });
            /*
             * SI BUSCO EL RESULTADO DE UNA AUN NO LO CARGO EN LA VARIABLE, LE TENGO QUE DAR UN TIEMPO PARA QUE TERMINE DE BUQLEAR EL COMPLETE.
             */
            updateResult();
            //setTimeout(updateResult, 1500);            
        }
        else{
            $(".next").addClass("hide");
        }
        return false;
    }

  
  

    function generarRegistro(item){
        var registro = {
            "oferta": item.oferta,
            "beneficio" : item.beneficio
        };
        return registro;
    }
    
    function updateResult(){
        $(".next").removeClass("hide");
         /*
        htmlAdministracion = "";
        for (i = 0; i < resultadoAdministracion.length; i++) {
            htmlAdministracion += "<li><div class='box-perfil'><h3>Ahorro</h3><h2>" + resultadoAdministracion[i].oferta + "</h2></div></li>";
        }
        
        if(htmlAdministracion == ""){
            htmlAdministracion = "<p class='noFound'>NO SE ENCONTRO COMBIANCIÓN</p>"; //TODO MEJORAR RESPUESTA
        }
        
        htmlInversion = "";
        for (i = 0; i < resultadoInversiones.length; i++) {
            htmlInversion += "<li><div class='box-perfil'><h3>Inversiones</h3><h2>" + resultadoInversiones[i].oferta + "</h2></div></li>";
        }
        
        if(htmlInversion == ""){
            htmlInversion = "<p class='noFound'>NO SE ENCONTRO COMBIANCIÓN</p>"; //TODO MEJORAR RESPUESTA
        }
        
        htmlCoberturas = "";
        for (i = 0; i < resultadoCoberturas.length; i++) {
            htmlCoberturas += "<li><div class='box-perfil'><h3>Coberturas</h3><h2>" + resultadoCoberturas[i].oferta + "</h2></div></li>";
        }
        
        if(htmlCoberturas == ""){
            htmlCoberturas = "<p class='noFound'>NO SE ENCONTRO COMBIANCIÓN</p>"; //TODO MEJORAR RESPUESTA
        }
        
        htmlCreditos = "";
        for (i = 0; i < resultadoCreditos.length; i++) {
            htmlCreditos += "<li><div class='box-perfil'><h3>Créditos</h3><h2>" + resultadoCreditos[i].oferta + "</h2></div></li>";
        }
        
        if(htmlCreditos == ""){
            htmlCreditos = "<p class='noFound'>NO SE ENCONTRO COMBIANCIÓN</p>"; //TODO MEJORAR RESPUESTA
        }
        
        
        $(".backAdministracion").html(htmlAdministracion);        
        sliderAdministracion.reloadSlider();
        $(".backInversiones").html(htmlInversion);
        sliderInversion.reloadSlider();
        $(".backCoberturas").html(htmlCoberturas);
        sliderCoberturas.reloadSlider();
        $(".backCreditos").html(htmlCreditos);
        sliderCreditos.reloadSlider();        
        */ 
    }        
    
    $(".next").click(function(event){
        event.preventDefault();
        $(".content-perfilar").addClass("hide");
        $(".content-resultado").removeClass("hide");
        return false;
    });
    
});
