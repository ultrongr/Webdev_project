document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audio-player');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const stopButton = document.getElementById('stop');
    const seekBar = document.getElementById('seek-bar');
    const currentTimeText = document.getElementById('current-time');
    const durationText = document.getElementById('duration');
    const seekBackwardButton = document.getElementById('seek-backward');
    const seekForwardButton = document.getElementById('seek-forward');

    const pause = () => {
        audio.pause();
        playButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
    const play = () => {
        audio.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }

    seekBar.value = 0;
    pause();

    // set initial duration
    durationText.textContent = formatTime(audio.duration);

    // Play/Pause functionality
    playButton.addEventListener('click', play);
    pauseButton.addEventListener('click', pause);

    // Stop functionality
    stopButton.addEventListener('click', function () {
        audio.pause();
        window.history.back();
    });

    // Update seek bar as audio plays
    audio.addEventListener('timeupdate', function () {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const progress = (currentTime / duration) * 100;
        seekBar.value = progress;
        currentTimeText.textContent = formatTime(currentTime);
    });

    // Seek functionality
    seekBar.addEventListener('input', function () {
        const seekTo = audio.duration * (seekBar.value / 100);
        audio.currentTime = seekTo;
        play();
    });

    // Seek backward
    seekBackwardButton.addEventListener('click', function () {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
        play();
    });

    // Seek forward
    seekForwardButton.addEventListener('click', function () {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        play();
    });

    // Format time as mm:ss
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
