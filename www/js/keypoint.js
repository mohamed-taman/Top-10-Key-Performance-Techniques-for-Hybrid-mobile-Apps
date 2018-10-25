(function() {

    var slides = $(".slide"),
        gallery,
        i,
        page,
        $menu = $("#menu");


    $(function() {
        FastClick.attach(document.body);
    });

    $("#wrapper").on('touchmove', function() {
        return false;
    });

    window.onkeyup = function(event) {
        if (event.keyCode === 39) {
            return gallery.next();
        }
        if (event.keyCode === 37) {
            return gallery.prev();
        }
    };

    $("#menu-btn").on('click', toggleMenu);

    $("#wrapper").on("click", function() {
        if ($menu.hasClass("visible")) {
            $menu.removeClass("visible");
        }
    });

    window.onhashchange = function() {
        var p = parseInt(window.location.hash.substr(1)) || 0;
        gallery.goToPage(p);
    };

    prettyPrint();

    $("#slides").remove();

    var liStr = "";
    for (var x = 0; x < slides.length; x++) {
        var h1 = $("h1", slides[x]);
        liStr += '<li class="topcoat-list__item"><a href="#' + x + '">' + (h1[0] ? h1[0].innerText : '&nbsp;') + "</a></li>";
    }
    $("#list").html(liStr);


    function toggleMenu() {
        if ($menu.hasClass("visible")) {
            $menu.removeClass("visible");
        } else {
            $menu.addClass("visible");
        }
        return false;
    }

    gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });

    for (i = 0; i < 3; i++) {
        page = i == 0 ? slides.length - 1 : i - 1;
        gallery.masterPages[i].appendChild(slides[page]);
    }

    setTimeout(function() {
        var p = parseInt(window.location.hash.substr(1)) || 0;
        gallery.goToPage(p);
    });

    gallery.onFlip(function() {

        var el,
            upcoming,
            i;

        window.location.hash = gallery.pageIndex;

        for (i = 0; i < 3; i++) {
            upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;
            if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
                el = gallery.masterPages[i].querySelector('.slide');
                if (el)
                    gallery.masterPages[i].removeChild(el);
                el = gallery.masterPages[i].appendChild(slides[upcoming]);
                el.className += " loading";
            }
        }

    });

}());