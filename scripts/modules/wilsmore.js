$(document).ready(function() {

    /*
        Add smooth scrolling to all links.
    */
    $("a").on('click', function(event){
        // Ensure this.hash has a value before overriding the default behaviour.
        if (this.hash != "") {
            // Prevent default anchor click behaviour.
            event.preventDefault();
            var hash = this.hash;
            // Use Jquery's animate() method to scroll nicely to specified area.
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                // Add hash (#) to the URL when finished scrolling (default click behaviour).
                window.location.hash = hash;
            });
        }
    });

    /*
        Check to see if the window is top if not then display button.
    */
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    /*
        Click event to scroll to top.
    */
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0}, 800);
        return false;
    });

});