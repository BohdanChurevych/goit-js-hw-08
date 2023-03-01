import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const localStorageKey = "videoplayer-current-time";

const onPlay = function(data) {
    const currentTimePlayer = localStorage.setItem(localStorageKey, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = localStorage.getItem(localStorageKey);
if (currentTime) {
    player.setCurrentTime(currentTime);
}