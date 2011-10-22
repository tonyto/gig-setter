$(document).ready(function() {
$('.pinky').click(function() {
    $('.pinky').animate({
        left: $(window).width()/2 - $('.pinky').width()/2,
    }, 
    500, 
    function() {
        $('.pinky').animate({
            height: $(window).height,
        },500,function(){});
    });
});
});
