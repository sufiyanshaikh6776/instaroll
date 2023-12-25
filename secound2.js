document.addEventListener('DOMContentLoaded', function () {
    const reelButton = document.getElementById('reelButton');
    const reelVideoContainer = document.getElementById('reelVideoContainer');
    const reelVideoPlayer = document.getElementById('reelVideoPlayer');
    const videoButtons = document.getElementById('videoButtons');
  
    // Define an array of reel video URLs
    const reelVideoUrls = [
        'video2.mp4',
        'vedio4.mp4',
        'video1.mp4',
        'video3.mp4',
        'video5.mp4',
        'video6.mp4',
        'video7.mp4',
        'video8.mp4',
        'video9.mp4',
        'video10.mp4',
        'video11.mp4',
        'video12.mp4',
        'video13.mp4',
        'video6.mp4',
        // Add more video URLs as needed
    ];
  
    let currentReelIndex = 0;
  
    reelButton.addEventListener('click', function () {
        reelVideoPlayer.src = reelVideoUrls[currentReelIndex];
        reelVideoContainer.style.display = 'flex';
        videoButtons.style.display = 'flex'; // Show the buttons
  
        currentReelIndex = (currentReelIndex + 1) % reelVideoUrls.length;
  
        // Reset the size of the video player to match the aspect ratio
        resizeVideoPlayer();
    });
  
    // Function to resize the video player based on the aspect ratio
    function resizeVideoPlayer() {
        const aspectRatio = 9 / 16; // Aspect ratio of 9:16
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
  
        let videoWidth, videoHeight;
  
        if (screenWidth / screenHeight > aspectRatio) {
            // If the screen is wider than the aspect ratio
            videoWidth = screenHeight * aspectRatio;
            videoHeight = screenHeight;
        } else {
            // If the screen is taller than the aspect ratio
            videoWidth = screenWidth;
            videoHeight = screenWidth / aspectRatio;
        }
  
        // Set the size of the video player
        reelVideoPlayer.style.width = `${videoWidth}px`;
        reelVideoPlayer.style.height = `${videoHeight}px`;
    }
  
    // Call the resize function initially and on window resize
    resizeVideoPlayer();
    window.addEventListener('resize', resizeVideoPlayer);
  
    // Variables to store the starting coordinates of touch
    let startY;
  
    // Add touchstart event to detect the starting point of the swipe
    reelVideoPlayer.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });
  
    // Add touchmove event to detect the direction of the swipe
    reelVideoPlayer.addEventListener('touchmove', function (e) {
        // Calculate the distance moved
        let deltaY = e.touches[0].clientY - startY;
  
        // Check if the swipe is upward or downward
        if (deltaY < -50) {
            // Swipe upward, play the next video
            playNextVideo();
        } else if (deltaY > 50) {
            // Swipe downward, play the previous video
            playPreviousVideo();
        }
    });
  
    // Add keydown event to handle up and down arrow keys
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp') {
            // Arrow up, play the previous video
            playPreviousVideo();
        } else if (e.key === 'ArrowDown') {
            // Arrow down, play the next video
            playNextVideo();
        }
    });
  
    // Function to play the next video
    function playNextVideo() {
        currentReelIndex = (currentReelIndex + 1) % reelVideoUrls.length;
        reelVideoPlayer.src = reelVideoUrls[currentReelIndex];
        reelVideoPlayer.play();
    }
  
    // Function to play the previous video
    function playPreviousVideo() {
        // Handle the case when currentReelIndex is already 0
        currentReelIndex = (currentReelIndex - 1 + reelVideoUrls.length) % reelVideoUrls.length;
        reelVideoPlayer.src = reelVideoUrls[currentReelIndex];
        reelVideoPlayer.play();
    }
  });
  