fun main() {
    val audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement
    val playlistItems = document.querySelectorAll(".playlist li") as NodeList
    val playPauseButton = document.getElementById("playPauseButton") as HTMLButtonElement
    val volumeSlider = document.getElementById("volumeSlider") as HTMLInputElement
    val trackProgress = document.getElementById("trackProgress") as HTMLDivElement

    var isPlaying = false

    // Play/Pause button functionality
    playPauseButton.addEventListener("click", {
        if (isPlaying) {
            audioPlayer.pause()
            playPauseButton.innerHTML = "&#9658;"
        } else {
            audioPlayer.play()
            playPauseButton.innerHTML = "&#10074;&#10074;"
        }
        isPlaying = !isPlaying
    })

    // Volume slider functionality
    volumeSlider.addEventListener("input", {
        audioPlayer.volume = volumeSlider.value.toDouble()
    })

    // Update track progress
    audioPlayer.addEventListener("timeupdate", {
        val currentTime = audioPlayer.currentTime
        val duration = audioPlayer.duration
        val minutes = Math.floor(currentTime / 60)
        val seconds = Math.floor(currentTime % 60)
        val durationMinutes = Math.floor(duration / 60)
        val durationSeconds = Math.floor(duration % 60)
        trackProgress.textContent = String.format("%02d:%02d / %02d:%02d", minutes, seconds, durationMinutes, durationSeconds)
    })

    // Playlist functionality
    for (item in playlistItems) {
        item.addEventListener("click", {
            val songSrc = (it.target as HTMLElement).getAttribute("data-src")
            audioPlayer.src = songSrc
            audioPlayer.play()
            isPlaying = true
            playPauseButton.innerHTML = "&#10074;&#10074;"
        })
    }
}
