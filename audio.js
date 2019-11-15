//play music function
function play_music(src, icon) {
    var myaudio = document.getElementById(src);
    if (!myaudio.paused) {
        myaudio.pause();
        $("#" + icon).removeClass('fa-pause-circle');
        $("#" + icon).addClass('fa-play-circle');
    } else {
        myaudio.play();
        $("#" + icon).removeClass('fa-play-circle');
        $("#" + icon).addClass('fa-pause-circle');
    }
}

//pause music
function pause_music(src) {
    var myaudio = document.getElementById(src);
    myaudio.pause();
}

//change icon colur
function replace_class(icon) {
    $("#" + icon).css("color", "red");
}

// function convert seconds to hours minute and seconds
function secondsToTime(secs) {
    var hours = Math.floor(secs / 3600),
        minutes = Math.floor(secs % 3600 / 60),
        seconds = Math.ceil(secs % 3600 % 60);
    return (hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0' + hours +
            ':' : hours + ':') + (minutes.toString().length < 2 ? '0' + minutes : minutes) + ':' +
        (seconds.toString().length < 2 ? '0' + seconds : seconds);
}

//function to set the total duration of the song 
(function setTotalTime() {
    var myaudio = document.getElementsByTagName('audio'),
    	currentTimeElement = document.getElementById('current_time'),
    	playedProgressBar = document.getElementById('played'),
        durationElement = document.getElementById('total_time');

    // set the time when the audio element has finished loading
    myaudio[0].addEventListener('loadeddata', (event) => {
        var duration = myaudio[0].duration
        durationElement.innerHTML = secondsToTime(duration)
    })

    // set time and width of progress bar on time update
    myaudio[0].addEventListener('timeupdate', function() {
    	currentTimeElement.innerHTML = secondsToTime(myaudio[0].currentTime)
    	playedProgressBar.style.width = (myaudio[0].currentTime / myaudio[0].duration) * 100 + '%';
    });

})();