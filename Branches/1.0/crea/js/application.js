var mySwiper = new Swiper('#navSwiper', {
    speed: 400,
    spaceBetween: 50,
    grabCursor: true,
    simutaleTouch: true,
    slidesPerView: 4,
    freeMode: true,
    loop: false,
    nextButton: '#navBox .swiper-button-next',
    prevButton: '#navBox .swiper-button-prev',
    longSwipes: true

});


var ancho = window.innerWidth;

if (ancho == 1024) {
    var mySwiper = new Swiper('#navSwiper', {
        speed: 400,
        spaceBetween: 50,
        grabCursor: true,
        simutaleTouch: true,
        slidesPerView: 3,
        freeMode: true,
        loop: false,
        nextButton: '#navBox .swiper-button-next',
        prevButton: '#navBox .swiper-button-prev',
        longSwipes: true
    });
}

var swiperScroll = new Swiper('#swiperScroll', {
    scrollbar: '.swiper-scrollbar',
    direction: 'vertical',
    speed: 400,
    spaceBetween: 0,
    grabCursor: true,
    simutaleTouch: true,
    slidesPerView: 5,
    freeMode: true
});

var swiperProductoSlider = new Swiper('#sliderProductosSeleccionados', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '#sliderProductosSeleccionados .swiper-button-next',
    prevButton: '#sliderProductosSeleccionados .swiper-button-prev',
    spaceBetween: 30,
    slidesPerView: 1,
    effect: 'fade',
    fade: {
        crossFade: true
    }
});

var jsonData;
var prodSelData = new Array();
var currentCatNav;

function cargarTarjetas(t) {
    var request = new XMLHttpRequest();
    request.open('GET', './js/data/productos.json', false);
    request.send(null);
    var data = JSON.parse(request.responseText);

    cargarCategorias(data)
    jsonData = data;
}

cargarTarjetas();


function cargarCategorias(data) {
    $("#navSwiper .swiper-wrapper").html("");

    var categorias = _(data).chain().flatten().pluck('Categoria').unique().value();
    var codigoCategorias = _(data).chain().flatten().pluck('CodigoCategoria').unique().value();
    for (var i = 0; i < categorias.length; i++) {
        var catClass = '';
        if (codigoCategorias[i].length >= 25) {
            catClass = 'class="cutText"';
        }
        mySwiper.appendSlide('<div class="swiper-slide"' + catClass + ' data-id="' + codigoCategorias[i] + '" data-hash="' + i + '"><div class="catDesc">' + categorias[i] + '</div></div>');
    }

    //Actualizo luego de cargar manualmente
    mySwiper.updateSlidesSize();

    //Bind de funcion a las subcategorias
    $("#navSwiper .swiper-slide").off('click.c').on('click.c', function(event) {
        event.preventDefault();
        cargarSubCategorias(data, $(this).attr('data-id'));
        $('.breadcrumb').append("<li class='active'><a href='#' data-title='" + $(this).find('.catDesc').html() + "' title='" + $(this).attr('data-id') + "' class='navLink subCatLink'>" + $(this).find('.catDesc').html() + "</a></li>");
        checkLength();
    });
}

function cargarSubCategorias(data, catId) {

    currentCatNav = catId;
    //Elimino slides previos
    mySwiper.removeAllSlides();

    var subcategorias = _.where(data, {CodigoCategoria: catId});
    // Acá filtro para tener solamente las que corresponden a la categoría que eligió.
    // Ver si se puede optimizar esto
    var filteredSubcategorias = _(subcategorias).chain().flatten().pluck('Subcategoria').unique().value();
    var filteredSubcategoriasCode = _(subcategorias).chain().flatten().pluck('CodigoSubcategoria').unique().value();

    for (var i = 0; i < filteredSubcategorias.length; i++) {
        if (filteredSubcategoriasCode[i] == null) {
            continue;
        }

        var subCatClass = '';
        if (filteredSubcategoriasCode[i].length >= 25) {
            subCatClass = 'class="cutText"';
        }
        $('.prodWrapper').fadeOut('slow');
        mySwiper.appendSlide('<div class="swiper-slide" ' + subCatClass + ' data-id="' + currentCatNav + '" id="' + filteredSubcategoriasCode[i] + '" data-hash="' + i + '"><div class="catDesc">' + filteredSubcategorias[i] + '</div></div>');

        if ($("#navSwiper .swiper-slide").attr("data-id") == 'CONS') {
            $('#mainContent #tarjetaBox .prodWrapper #contentWrapper').hide();
            $('#mainContent #tarjetaBox .prodWrapper .imgGeneral').hide();
            $('#mainContent #tarjetaBox .prodWrapper #contentWrapper2').show();
        } else {
            $('#mainContent #tarjetaBox .prodWrapper #contentWrapper').show();
            $('#mainContent #tarjetaBox .prodWrapper .imgGeneral').show();
            $('#mainContent #tarjetaBox .prodWrapper #contentWrapper2').hide();
        }
    }

    //Actualizo luego de cargar manualmente
    mySwiper.updateSlidesSize();

    //Bind de funcion a los productos
    $("#navSwiper .swiper-slide").off('click.d').on('click.d', function(event) {
        event.preventDefault();
        var subCategoriaId = $(this).attr('id');

        $.each(data, function(idx, obj) {
            if (obj.CodigoSubcategoria == subCategoriaId && obj.LinkProducto !== null)
            {
                window.open(obj.LinkProducto, 'newwindow', 'width=1050, height=860', 'left=100', 'top=100', 'position=absolute');
                throw "stop execution";
            } else if(obj.CodigoSubcategoria == subCategoriaId) {
                cargarProductos(data, subCategoriaId, catId);
                checkLength();
            }
        });


        $('.breadcrumb li').removeClass('active');
        $('.breadcrumb').append("<li class='active'><a href='#' data-title='" + $(this).find('.catDesc').html() + "' title='" + $(this).attr('data-id') + "' class='navLink subCatLink'>" + $(this).find('.catDesc').html() + "</a></li>");
    });
}

function cargarProductos(data, subCatId, catId) {

    //Elimino slides previos
    mySwiper.removeAllSlides();
    $.each(data, function(idx, obj) {
        if (obj.CodigoSubcategoria == subCatId) {
            mySwiper.appendSlide('<div class="swiper-slide" id="' + obj.CodigoSubcategoria + '" data-hash="' + idx + '"><div class="catDesc">' + obj.Titulo + '</div></div>');
        }
        ;
    });

    //Actualizo luego de cargar manualmente
    mySwiper.updateSlidesSize();

    //Bind de funcion a las categorias
    $("#navSwiper .swiper-slide").off('click.e').on('click.e', function(event) {
        event.preventDefault();
        visualizarProducto(data, $(this).find('.catDesc').html(), catId);
    });
}

function visualizarProducto(data, prodId, catId) {
    //Vacio tarjeta anterior y la muestro
    $(".homeDesc").hide();
    $("#sliderProductosSeleccionados").hide();
    $("#mainProdWrapper.prodWrapper").fadeIn('slow');
    $("#mainProdWrapper.prodWrapper .prodContentWrapper .prodBeneficios").html(" ");
    var contadorBeneficios = 0;
    $.each(data, function(idx, obj) {
        if (obj.CodigoCategoria == catId) {
            if (obj.Titulo == prodId) {
                $(".prodWrapper").attr("data-CodCat", obj.CodigoCategoria);
                $(".prodWrapper").attr("data-CodSubCat", obj.CodigoSubcategoria);
                $(".prodWrapper").attr('title', obj.Titulo);
                $(".prodWrapper .imgWrapper img").attr({
                    src: './images/' + obj.ImagenProducto,
                    lt: obj.Titulo,
                    width: 434,
                    height: 486
                });
                $(".prodWrapper .prodContentWrapper .prodTitle").html(obj.Titulo);
                $(".prodWrapper .prodContentWrapper .prodSubTitle").html(obj.Subtitulo);
                $(".prodWrapper .prodContentWrapper .prodLegales").css('display', 'block');
                if (obj.LinkLegales !== null) {
                    $(".prodWrapper .prodContentWrapper .prodLegales").attr('href', obj.LinkLegales);
                } else {
                    $(".prodWrapper .prodContentWrapper .prodLegales").css('display', 'none');
                }
                $(".prodWrapper .prodContentWrapper .prodRequisitos").attr('href', obj.LinkRequisitos);

                $.each(obj.Beneficios, function(sub_idx, sub_obj) {
                    if (obj.Beneficios[contadorBeneficios] != null) {
                        if (contadorBeneficios <= 2) {
                            $(".prodWrapper .prodContentWrapper .prodBeneficios.ul1").append("<li>" + obj.Beneficios[contadorBeneficios] + "</li>");
                        } else {
                            $(".prodWrapper .prodContentWrapper .prodBeneficios.ul2").append("<li>" + obj.Beneficios[contadorBeneficios] + "</li>");
                        }
                        contadorBeneficios++;
                    }
                });
            }
            ;
        }
        ;
    });
}





$("document").ready(function() {

    $(".anadir").click(function(event) {
        event.preventDefault();
        addSelectedProduct($("#dropBox").find("listProd"), $(".prodWrapper").attr("data-CodCat"), $(".prodWrapper").attr("data-CodSubCat"), $(".prodWrapper").attr('title'));
    });

    $(".prodWrapper .prodContentWrapper .prodLegales").click(function(event) {
        event.preventDefault();
        var link = $(this).attr("href");                
        /*$(".div-iframe").removeClass("oculto");
        $("#iframeMagico").attr("src", link);*/
        window.open(link, 'newwindow', 'width=1050', 'height=760', 'left=100', 'top=150', 'position=absolute');
        return false;
    });

    $(".prodWrapper .prodContentWrapper .prodRequisitos").click(function(event) {
        event.preventDefault();
        var link = $(this).attr("href");
        //$(".div-iframe").removeClass("oculto");
        //$("#iframeMagico").attr("src", link);
        window.open(link, 'newwindow', 'width=1050', 'height=760', 'left=100', 'top=150', 'position=absolute');        
        return false;
    });


    /*$('.btn-close').click(function(){
        $(".div-iframe").addClass("oculto");
    });*/
    checkLength();
});

function visualizarProductoSlider(data, elemArray) {
    //Vacio tarjeta anterior y la muestro
    $(".homeDesc").hide();
    $("#mainProdWrapper.prodWrapper").hide();
    $("#mainProdWrapper.prodWrapper .prodContentWrapper .prodBeneficios").html(" ");
    $("#sliderProductosSeleccionados .swiper-wrapper").html(" ");
    $("#sliderProductosSeleccionados").fadeIn('slow');

    $.each(elemArray, function(index, val) {
        var contadorBeneficios = 0;
        $.each(data, function(idx, obj) {
            if (obj.CodigoCategoria == $(val).attr("data-CodCat")) {
                if (obj.Titulo == $(val).attr("title")) {

                    var slideToAppend = '<div class="swiper-slide"><div class="imgWrapper"><img width="434" height="486" src="./images/' + obj.ImagenProducto + '" alt="' + obj.Titulo + '"></div><div class="prodContentWrapper"><div class="prodTitle">' + obj.Titulo + '</div><div class="prodSubTitle">' + obj.Subtitulo + '</div><div class="columnLeft"><ul class="prodBeneficios ul1"></ul></div><div class="columnRight"><ul class="prodBeneficios ul2"></ul><div class="clearfix"></div><div class="actionWrapper"><a href="' + obj.LinkLegales + '" class="prodBtn prodLegales" target="_blank">T&eacute;rminos y condiciones</a></div></div><div class="clearfix"></div></div><div class="clearfix"></div> </div>';

                    if ($(val).attr('data-codCat') == 'CONS') {
                        slideToAppend = '<div class="swiper-slide">' +
                                '<div class="prodContentWrapper" id="contentWrapper2" style="display: block">' +
                                '<div class="prodTitle">' + obj.Titulo + '</div>' +
                                '<div class="prodSubtitle">' + obj.Subtitulo + '</div>' +
                                '<div class="columnLeft"><div class="imgWrapper"><img src="./images/' + obj.ImagenProducto + '"alt="' + obj.Titulo + '"/></div></div>' +
                                '<div class="columnRight"><ul class="prodBeneficios ul1"></ul><ul class="prodBeneficios ul2"></ul>' +
                                '<div class="clearfix"></div>' +
                                '<div class="actionWrapper">' +
                                '<a href="' + obj.LinkLegales + '" class="prodBtn prodLegales" target="_blank" >T&eacute;rminos y condiciones</a>' +
                                '</div></div><div class="clearfix"></div></div><div class="clearfix"></div></div>';
                        //slideToAppend = '<div class="swiper-slide">' +
                        //    '<div class="prodContentWrapper">' +
                        //    '<div class="prodTitle">'+obj.Titulo+'</div>' +
                        //    '<div class="prodSubTitle">'+obj.Subtitulo+'</div>' +
                        //    '<div class="columnLeft">' +
                        //    '<div class="imgWrapper"><img width="434" height="486" src="./images/'+obj.ImagenProducto+'" alt="'+obj.Titulo+'"></div></div>' +
                        //    '<div class="columnRight">' +
                        //    '<ul class="prodBeneficios ul1"></ul>' +
                        //    '<ul class="prodBeneficios ul2"></ul>' +
                        //    '<div class="clearfix"></div>' +
                        //    '<div class="actionWrapper">' +
                        //    '<a href="'+obj.LinkLegales+'" class="prodBtn prodLegales" target="_blank">T&eacute;rminos y condiciones</a>' +
                        //    '<a href="'+obj.LinkRequisitos+'" class="prodBtn prodRequisitos" target="_blank">Requisitos</a></div></div><div class="clearfix"></div></div><div class="clearfix"></div> </div>';
                    }

                    swiperProductoSlider.appendSlide(slideToAppend);

                    $(swiperProductoSlider.slides[index]).attr("data-CodCat", obj.CodigoCategoria);
                    $(swiperProductoSlider.slides[index]).attr("data-CodSubCat", obj.CodigoSubcategoria);

                    $.each(obj.Beneficios, function(sub_idx, sub_obj) {
                        if (obj.Beneficios[contadorBeneficios] != null) {
                            if (contadorBeneficios <= 2) {
                                $(swiperProductoSlider.slides[index]).find('.prodContentWrapper .prodBeneficios.ul1').append("<li>" + obj.Beneficios[contadorBeneficios] + "</li>");
                            } else {
                                $(swiperProductoSlider.slides[index]).find('.prodContentWrapper .prodBeneficios.ul2').append("<li>" + obj.Beneficios[contadorBeneficios] + "</li>");
                            }
                        }
                        contadorBeneficios++;
                    });
                }
                ;
            }
            ;
        });
    });

    $(".actionWrapper .prodLegales, .actionWrapper .prodRequisitos").click(function(event) {
            event.preventDefault();
            var link = $(this).attr("href");
            //$(".div-iframe").removeClass("oculto");
            //$("#iframeMagico").attr("src", link);
            window.open(link, 'newwindow', 'width=1050, height=860', 'left=100', 'top=100', 'position=absolute');        
            return false;
        });
}

//Touche.js Convierto todos los eventos clicks en touchend

$('.swiper-slide, .breadcrumb a, .closeIcon').on('click', function(e) {
    e.preventDefault();
});

//Contador de productos seleccionados
var contadorDeProductos = 0;
var productosSliderOn = false;

function resetProducto(elem) {
    $(elem).css({
        position: 'relative',
        top: '0px',
        left: '0px'
    });
}

function addSelectedProduct(elem, codigoCaterogia, codigoSubcategoria, dataItem) {

    if ($.inArray(dataItem, prodSelData) < 0) {
        prodSelData.push(dataItem);
        swiperScroll.appendSlide('<div class="swiper-slide"><div data-CodCat="' + codigoCaterogia + '" data-CodSubCat="' + codigoSubcategoria + '"  title="' + dataItem + '" class="prodBoxSelected"><div class="item">' + dataItem + '</div><div class="closeIcon"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div><div class="clearfix"></div></div></div>');
        contadorDeProductos++;
        if (contadorDeProductos > 0) {
            //Muestro boton producto
            $(".verProdBtn").fadeIn('slow');

        }
        ;

        if (contadorDeProductos >= 5) {
            scrollUpdate();
        }
        ;

        //Bind accion close btn
        $(document).off('click.f').on("click.f", ".closeIcon", function() {
            //event.preventDefault();
            //Remuevo producto
            removeSelectedProduct($(this));
        });



        $(elem).off('click.g').on("click.g", ".prodBoxSelected .item", function() {
            event.preventDefault();
            //Muestro producto desdes los seleccionados
            visualizarProducto(jsonData, $(this).parent().attr("title"), $(this).parent().attr("data-CodCat"));
        });

        $("#dropBox").off('click.h').on("click.h", ".verProdBtn", function() {
            //event.preventDefault();
            //Muestro producto desde los seleccionados

            visualizarProductoSlider(jsonData, $(".prodBoxSelected").get());
        });

    }
    ;

}

function removeSelectedProduct(elem) {

    for (i in prodSelData) {
        if (prodSelData[i] == $(elem).parent().attr('title')) {
            prodSelData[i] = '';
        }
        ;

    }

    $(elem).parent().parent().fadeOut('slow').remove();
    contadorDeProductos--;

    if (contadorDeProductos == 0) {
        //Muestro boton producto
        $(".verProdBtn").fadeOut('slow');
        $('.prodWrapper').fadeOut('slow');
    }
    ;
    scrollUpdate();
}

function scrollUpdate() {
    swiperScroll.update();
}

// Funcion que controla en base a la cantidad de elementos del slider si se muestra o no la flecha "next"
function checkLength() {
    if ($('#navBox .swiper-wrapper').children().length > 4) {
        $('#navBox .swiper-button-next').show();
    }else{
        $('#navBox .swiper-button-next').hide();
    };
}

//Hago .prodWrapper draggable con jquery ui
$('#mainProdWrapper.prodWrapper').draggable({
    start: function() {
    },
    drag: function() {
    },
    stop: function() {
    }
});

//Hago #dropBox dropeable con jquery ui
$("#dropBox").droppable({
    tolerance: "touch",
    drop: function(event, ui) {
        var dropBox = $(this);
        $('.prodWrapper').fadeOut('fast', function() {

            $(".homeDesc").show();

            //Despues de dropear reseteo la posicion inicial del producto
            resetProducto($(this));

            //Agrego producto a la lista                
            addSelectedProduct(dropBox.find(".listProd"), $(this).attr('data-CodCat'), $(this).attr('data-CodSubCat'), $(this).attr('title'));

        });
    }
});

//Navegacion Breadcrumb
$(".breadcrumb").off("click.k").on('click.k', 'a.navLink', function(event) {
    event.preventDefault();
    $(".homeDesc").hide();
    $("#mainProdWrapper.prodWrapper").hide();
    $("#mainProdWrapper.prodWrapper .prodContentWrapper .prodBeneficios").html(" ");
    $("#sliderProductosSeleccionados .swiper-wrapper").html(" ");
    /* Act on the event */
    if ($(this).hasClass('catLink')) {
        cargarCategorias(jsonData);
        $('.breadcrumb').html("").append('<li><a href="#" id="homeNav" class="navLink catLink">Home</a></li>');
        //Actualizo luego de cargar manualmente
        mySwiper.updateSlidesSize();
    } else {
        cargarSubCategorias(jsonData, currentCatNav);
        $('.breadcrumb').html("").append('<li><a href="#" id="homeNav" class="navLink catLink">Home</a></li><li class="active"><a href="#" data-title="' + $(this).attr('data-title') + '" title="' + $(this).attr('title') + '" class="navLink subCatLink">' + $(this).attr('data-title') + '</a></li>');
        //Actualizo luego de cargar manualmente
        mySwiper.updateSlidesSize();
    };



    checkLength();
});

