    var mySwiper = new Swiper('.swiper-container', {
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        // pagination: '.swiper-pagination',
        // paginationType: 'progress',
        scrollbar: '.swiper-scrollbar',
        scrollbarHide: true,
        // slidesPerView: 'auto',
        spaceBetween: 30,
        // grabCursor: true,
        autoHeight: true,
        longSwipesRatio: 1
    });

    $(document).ready(function() {


        $(".menu li a").on('click', function() {
            $(".menu li").removeClass('active');
            $(this).parent().addClass('active');
        });
        $(".menu li a").each(function(idx, el) {

            $(this).on("click", function() {
                mySwiper.slideTo(idx);
            });
        });
    });


   