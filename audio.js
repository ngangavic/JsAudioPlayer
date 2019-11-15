//play music function
function play_music(src,icon) {
    var myaudio = document.getElementById(src);

    if (!myaudio.paused) {
        myaudio.pause();
        $("#"+icon).removeClass('fa-pause-circle');
        $("#"+icon).addClass('fa-play-circle');
    } else {
        myaudio.play();
        $("#"+icon).removeClass('fa-play-circle');
        $("#"+icon).addClass('fa-pause-circle');
    }
}

//pause music
function pause_music(src) {
    var myaudio = document.getElementById(src);
    myaudio.pause();
}

//change icon colur
function replace_class(icon) {
    $("#"+icon).css("color","red");
}