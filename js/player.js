var playButtons = document.querySelectorAll('.player__control_play');

var PlayerState = {
    SHOW: 'show',
    HIDE: 'hide',
};

var showHideWidget = function (coverElement, widgetElement, state) {
    var isWidgetShown = state === PlayerState.SHOW;
    var coverHiddenClass = 'player__cover_hidden';
    var widgetShowedClass = 'player__widget_show';

    coverElement.classList.toggle(coverHiddenClass, isWidgetShown);
    widgetElement.classList.toggle(widgetShowedClass, isWidgetShown);
};

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
  
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'uXnLyUZYkVw',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

var onPlayButtonClick = function (evt) {
    var playButton = evt.target;
    var container = playButton.closest('.player');
    var cover = playButton.closest('.player__cover');
    var widget = container.querySelector('.player__widget');

    showHideWidget(cover, widget, PlayerState.SHOW);
    player.playVideo();
};

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    playButtons.forEach(function (button) {
        button.addEventListener('click', onPlayButtonClick);
    });
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}



