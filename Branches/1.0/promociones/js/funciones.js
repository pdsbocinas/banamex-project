function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function() {
    $('a.modal-productos').colorbox({
        href: "modal-product.html",
        innerWidth: 1700,
        innerHeight: 1000,
        pager: false
    });
    
    $(document).on("click", "a.modal-productos", function(e){          
        $.colorbox({
            href: "modal-product.html",
            innerWidth: 1700,
            innerHeight: 1000,
            pager: false
        });
    });

    $('a.modal-tarjetas').colorbox({
        href: "modal-tarjeta.html",
        innerWidth: 1700,
        innerHeight: 1000,
        pager: false
    });

    $('a.modal-promociones').colorbox({
        href: "modal-promociones.html",
        innerWidth: 1700,
        innerHeight: 1000,
        infiniteLoop: false,
        pager: false
    });

    
    if ( document.location.href.indexOf('sc=TORRE') > -1 ) {
        $('a.btn').removeClass("modal-promociones");
        $('a.btn').addClass("modal-ofertas");
        $('#colorbox').addClass("ofertas");
    }

    $('a.modal-ofertas').colorbox({
        href: "modal-ofertas.html",
        innerWidth: 1700,
        innerHeight: 1000,
        infiniteLoop: false,
        pager: false
    });

    

    $('a.modal-link').click(function(){ 
        linkColorbox();
    })


    $('a.modal-pdf').click(function(){ 
        var iframeSrc = $(this).attr("href");
        $(".iframePdf").attr("src", iframeSrc);
        $('.ayuda .div-iframe img').css('width','1000px');
        $('.ayuda .div-iframe').show();
        $('.ayuda .hide-modal').show(); 
    })
    

    $('.ayuda .hide-modal').click(function(){ 
        $('.ayuda .div-iframe').hide();
        $('.ayuda .hide-modal').hide(); 
    })


    function linkColorbox(){
        var linkExterno = $(this).attr("href");
        $('a.modal-link').colorbox({
            iframe:true,
            href:linkExterno,
            innerWidth: 1200,
            height:1000,
            scrolling:false
        });
        $('#colorbox').addClass('bancos');
    }

    var sliderBeneficio = $('.modal .bxslider').bxSlider({
        infiniteLoop: false,
        slideWidth: 289,
        maxSlides: 200,
        touchEnabled:true,
        pager: false,
        controls: false
    });

    var sliderBancos = $('.bxslider.bancos').bxSlider({
        infiniteLoop: false,
        slideWidth: 200,
        maxSlides: 30,
        touchEnabled:true,
        pager: false,
        controls: true
    });

    var mySwiper = new Swiper('#navSwiper', {        
        speed: 400,
        grabCursor: true,
        simutaleTouch: true,
        onlyExternal:true,
        slidesPerView:'auto',
        freeMode: false, 
        centeredSlides:false,
        loop:true,
        longSwipes:false,
    });

    

    //mySwiper.lockSwipes();

    $('.swiper-wrapper > div').addClass('div-descubre');


    setTimeout(function(){
        if ($('.div-descubre').hasClass('swiper-slide-duplicate')){
            $('.swiper-slide-duplicate').removeClass('div-descubre');
       }

    }, 0);

    setTimeout(function(){ 
        $('div.swiper-slide').css('opacity','1');
    }, 10);
    

    setTimeout(function(){
        var anchoPagina = window.innerWidth;

        if ($('.swiper-wrapper div.div-descubre').length >= 5){
           $('#navSwiper').attr('style', 'width: 92% !important')
         } else if ($('.swiper-wrapper div.div-descubre').length == 4){
           $('#navSwiper').attr('style', 'width: 73% !important');
        } else if ($('.swiper-wrapper div.div-descubre').length == 2) {
            $('#navSwiper').attr('style', 'width: 660px !important');
            if (anchoPagina == 1722) {
                $('#navSwiper').attr('style', 'width: 600px !important');
            } else if (anchoPagina == 1600) {
                $('#navSwiper').attr('style', 'width: 540px !important');
            } else if (anchoPagina == 1440) {
                $('#navSwiper').attr('style', 'width: 500px !important');
            } else if (anchoPagina == 1366) {
                $('#navSwiper').attr('style', 'width: 460px !important');
            } else if (anchoPagina == 1280) {
                $('#navSwiper').attr('style', 'width: 435px !important');
            }
            //$('.swiper-wrapper').css('padding','0 285px');
        } else if ($('.swiper-wrapper div.div-descubre').length == 1) {
            $('#navSwiper').attr('style', 'width: 17% !important');
        } else if ($('.swiper-wrapper div.div-descubre').length == 3) {
            $('#navSwiper').attr('style', 'width: 54% !important');
        }     
    }, 10);    
    
    var cantidadSlides = $('.swiper-wrapper div.div-descubre').length;
    
    if(cantidadSlides > 5){
        new Swiper('#navSwiper', { 
            loopedSlides:cantidadSlides,
            speed: 400,
            grabCursor: true,
            simutaleTouch: true,
            slidesPerView:'5',
            spaceBetween:70,
            freeMode: true, 
            centeredSlides:false,
            loop:false,
            longSwipes:false,
            preventClicks:true,
            onlyExternal:false
        });
    }

    /*if(window.location.href.indexOf("cc=PROM") > -1) {
        $('.promocion #navSwiper div.swiper-slide a').bind('touchstart', function(event) { 
            setTimeout(function(){    
                if($('#navSwiper div.swiper-slide:nth-child(2)').hasClass('swiper-slide-active')){
                      $('#navSwiper').css('width','100%');      
                      $('#navSwiper').css('padding-right','15%');      
                    } else{
                        $('#navSwiper').css('width','92%');      
                        $('#navSwiper').css('padding-right','0%');      
                    } 
                }, 0);        
        })
    }*/
});
