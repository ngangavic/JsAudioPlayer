//js file
class myAudioPlayer extends Audio {
    constructor(element, options) {
        super();
        this.element = element;
        
        this.config = this.extend({
            autoplay: false,
            loop: false,
            playlist: null
        }, options);

        console.log(this.element);
        console.log(typeof this.element[0].children);
    }
    // function to convert seconds to hours minutes and seconds
    secondsToTime = function(secs) {
        let hours = Math.floor(secs / 3600),
            minutes = Math.floor(secs % 3600 / 60),
            seconds = Math.ceil(secs % 3600 % 60);
        return (hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0' + hours + ':' : hours + ':') + (minutes.toString().length < 2 ? '0' + minutes : minutes) + ':' + (seconds.toString().length < 2 ? '0' + seconds : seconds);
    }

    // function to check if the provided element is audio
    checkIfAudioTag(element) {
        return (element[0].tagName.toLowerCase() != 'audio') ? false : true;
    }

    // extend function for extending the configs with user given
    extend = function(defaults, options) {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };

}