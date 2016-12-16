/**
 * Created by hasanm on 12/16/2016.
 */
$(document).ready(function () {
    $("#conceptModelButton").click(function () {
        $("#conceptModelPanel").slideToggle("slow", function () {
            if($(this).is(':hidden')){
                $("#conceptModelIcon").removeClass(".glyphicon glyphicon-collapse-down").addClass("glyphicon glyphicon-collapse-up");
            }else{
                $("#conceptModelIcon").removeClass(".glyphicon glyphicon-collapse-up").addClass("glyphicon glyphicon-collapse-down");
            }
        });
    });
});
