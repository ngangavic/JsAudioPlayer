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

// change volume icon
function changeVolumeIcon(volumeIcon, volume) {
    if (volume >= 0.5) {
        volumeIcon.classList.remove('fa-volume-down');
        volumeIcon.classList.add('fa-volume-up');
    } else if (volume > 0) {
        volumeIcon.classList.add('fa-volume-down');
        volumeIcon.classList.remove('fa-volume-up');
    } else {
        volumeIcon.classList.remove('fa-volume-down');
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-off');
    }
}

//adjust volume function
function adjustVolume(isTouch,myaudio,volumeLevel,e) {
    theRealEvent = isTouch ? e.touches[0] : e;
    let vol =  Math.abs((theRealEvent.pageX - volumeLevel.getBoundingClientRect().x) / 
    	parseFloat(volumeLevel.parentNode.offsetWidth))
    myaudio.volume = (vol > 1) ? 1: vol;
}

//function to set the total duration of the song 
(function setTotalTime() {
    var myaudio = document.getElementsByTagName('audio'),
        currentTimeElement = document.getElementById('current_time'),
        playedProgressBar = document.getElementById('played'),
        durationElement = document.getElementById('total_time'),
        volumeIcon = document.getElementById('volume-icon'),
        volumeLevel = document.getElementById('volume-level'),
        isTouch = 'ontouchstart' in window,
        mouseDown = isTouch ? 'touchstart' : 'mousedown',
        eMove = isTouch ? 'touchmove' : 'mousemove',
        eCancel = isTouch ? 'touchcancel' : 'mouseup'

    // set the time when the audio element has finished loading
    myaudio[0].addEventListener('loadeddata', (event) => {
        var duration = myaudio[0].duration
        durationElement.innerHTML = secondsToTime(duration)
        volumeLevel.style.width = (myaudio[0].volume / 1) * 100 + '%';
        changeVolumeIcon(volumeIcon, myaudio[0].volume)
    })

    // set time and width of progress bar on time update
    myaudio[0].addEventListener('timeupdate', function() {
        currentTimeElement.innerHTML = secondsToTime(myaudio[0].currentTime)
        playedProgressBar.style.width = (myaudio[0].currentTime / myaudio[0].duration) * 100 + '%';
    });

    // volume change event
    myaudio[0].addEventListener('volumechange', event => {
        let level = (myaudio[0].muted) ? 0 : myaudio[0].volume
        if(myaudio[0].volume == 0){
        	myaudio[0].muted = true
        }else{
        	myaudio[0].muted = false;
        }
        changeVolumeIcon(volumeIcon, level)
        volumeLevel.style.width = (level / 1) * 100 + '%';
    });

    //volume icon on click
    volumeIcon.addEventListener('click', event => {
        let bool = (myaudio[0].muted) ? false : true;
        myaudio[0].muted = bool;
    })

    //volume adjusted
    volumeLevel.parentNode.addEventListener(mouseDown, event => {
        if (myaudio[0].muted) myaudio[0].muted = false;
    	adjustVolume(isTouch,myaudio[0],volumeLevel,event)

    	// volumeLevel.parentNode.addEventListener(eMove,event => {
	    // 	adjustVolume(isTouch,myaudio[0],volumeLevel,event)
	    // })
    })
    // volumeLevel.parentNode.addEventListener(eCancel,event => {
    // 	volumeLevel.parentNode.removeEventListener(eMove,()=>{})
    // 	console.log("message");
    // })



})();