document.addEventListener('DOMContentLoaded', function() {
    const mainContentArea = document.getElementById('content');
    // carouselsData definition should be here (taken from previous correct version)
    const carouselsData = [
        {
            title: 'Featured Blender Open Movies',
            videos: [
                { id: '1', title: 'Big Buck Bunny', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
                { id: '2', title: 'Sintel', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
                { id: '3', title: 'Tears of Steel', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
                { id: '4', title: 'Elephants Dream', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
                { id: '5', title: 'Cosmos Laundromat - First Cycle', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/CosmosLaundromat.mp4'},
                { id: '6', title: 'Big Buck Bunny', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
                { id: '7', title: 'Sintel', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' }
            ]
        },
        {
            title: 'Animation & VFX Shorts',
            videos: [
                { id: '8', title: 'Spring', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
                { id: '9', title: 'Coffee Run', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
                { id: '10', title: 'Agent 327: Operation Barbershop', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
                { id: '11', title: 'Caminandes: Llamigos', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
                { id: '12', title: 'Spring', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
                { id: '13', title: 'Coffee Run', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }
            ]
        }
    ];

    function playVideo(videoUrl, videoTitle) {
        mainContentArea.innerHTML = ''; 
        const videoPlayerContainer = document.createElement('div');
        videoPlayerContainer.style.padding = '20px'; 
        const videoTitleElement = document.createElement('h2');
        videoTitleElement.textContent = videoTitle;
        videoTitleElement.style.marginBottom = '15px';
        videoPlayerContainer.appendChild(videoTitleElement);
        const videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.style.width = '100%';
        videoElement.style.height = 'auto';
        videoElement.style.maxHeight = 'calc(100vh - 150px)'; 
        videoPlayerContainer.appendChild(videoElement);
        const backButton = document.createElement('button');
        backButton.textContent = '← Back to Home';
        backButton.style.marginTop = '20px';
        backButton.style.padding = '10px 20px';
        backButton.style.fontSize = '16px';
        backButton.style.backgroundColor = '#555';
        backButton.style.color = '#fff';
        backButton.style.border = 'none';
        backButton.style.borderRadius = '4px';
        backButton.style.cursor = 'pointer';
        backButton.addEventListener('click', renderCarousels);
        videoPlayerContainer.appendChild(backButton);
        mainContentArea.appendChild(videoPlayerContainer);
        backButton.focus();
    }

    function createCarousel(carouselData) {
        const carouselDiv = document.createElement('div');
        carouselDiv.classList.add('carousel');
        const titleElement = document.createElement('h2');
        titleElement.classList.add('carousel-title');
        titleElement.textContent = carouselData.title;
        carouselDiv.appendChild(titleElement);
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.classList.add('thumbnail-container');

        carouselData.videos.forEach(video => { // 'video' object is from this scope
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.classList.add('thumbnail');
            thumbnailDiv.setAttribute('data-video-id', video.id);
            thumbnailDiv.setAttribute('data-video-url', video.videoUrl);
            thumbnailDiv.setAttribute('data-video-title', video.title);
            thumbnailDiv.setAttribute('tabindex', '0');

            // Create and append letterDisplay instead of imgElement
            const letterDisplay = document.createElement('div');
            letterDisplay.classList.add('thumbnail-letter-display');
            const firstLetter = video.title.charAt(0).toUpperCase();
            letterDisplay.textContent = firstLetter;
            thumbnailDiv.appendChild(letterDisplay); // Append letter display first

            const thumbnailTitle = document.createElement('div');
            thumbnailTitle.classList.add('thumbnail-title');
            thumbnailTitle.textContent = video.title;
            thumbnailDiv.appendChild(thumbnailTitle); // Then append title
            
            thumbnailDiv.previewTimer = null;

            thumbnailDiv.addEventListener('mouseenter', function() {
                if (this.previewTimer) clearTimeout(this.previewTimer);
                const currentThumbnailDiv = this;
                this.previewTimer = setTimeout(() => {
                    const staticDisplay = currentThumbnailDiv.querySelector('.thumbnail-letter-display'); // Changed
                    if (staticDisplay) staticDisplay.style.display = 'none';

                    const oldPreviewVideo = currentThumbnailDiv.querySelector('.thumbnail-video-preview');
                    if (oldPreviewVideo) oldPreviewVideo.remove();

                    const previewVideo = document.createElement('video');
                    previewVideo.src = video.videoUrl;
                    previewVideo.autoplay = true;
                    previewVideo.loop = true;
                    previewVideo.muted = true;
                    previewVideo.classList.add('thumbnail-video-preview');
                    previewVideo.style.display = 'block';
                    currentThumbnailDiv.insertBefore(previewVideo, thumbnailTitle); 
                }, 2000);
            });

            thumbnailDiv.addEventListener('mouseleave', function() {
                if (this.previewTimer) {
                    clearTimeout(this.previewTimer);
                    this.previewTimer = null;
                }
                const previewVideo = this.querySelector('.thumbnail-video-preview');
                if (previewVideo) previewVideo.remove();
                const staticDisplay = this.querySelector('.thumbnail-letter-display'); // Changed
                if (staticDisplay) staticDisplay.style.display = 'block';
            });

            thumbnailDiv.addEventListener('click', function() {
                if (this.previewTimer) {
                    clearTimeout(this.previewTimer);
                    this.previewTimer = null;
                }
                const existingPreview = this.querySelector('.thumbnail-video-preview');
                if (existingPreview) existingPreview.remove();
                const staticDisplay = this.querySelector('.thumbnail-letter-display'); // Changed
                if (staticDisplay) staticDisplay.style.display = 'block';

                const videoUrlToPlay = this.getAttribute('data-video-url');
                const videoTitleToPlay = this.getAttribute('data-video-title');
                playVideo(videoUrlToPlay, videoTitleToPlay);
            });

            thumbnailDiv.addEventListener('keydown', function(event) {
                let targetThumbnail = null;
                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    targetThumbnail = this.nextElementSibling;
                    while(targetThumbnail && !targetThumbnail.classList.contains('thumbnail')) {
                        targetThumbnail = targetThumbnail.nextElementSibling;
                    }
                } else if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    targetThumbnail = this.previousElementSibling;
                    while(targetThumbnail && !targetThumbnail.classList.contains('thumbnail')) {
                        targetThumbnail = targetThumbnail.previousElementSibling;
                    }
                } else if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    if (this.previewTimer) {
                        clearTimeout(this.previewTimer);
                        this.previewTimer = null;
                    }
                    const existingPreview = this.querySelector('.thumbnail-video-preview');
                    if (existingPreview) existingPreview.remove();
                    const staticDisplay = this.querySelector('.thumbnail-letter-display'); // Changed
                    if (staticDisplay) staticDisplay.style.display = 'block';

                    const videoUrlToPlay = this.getAttribute('data-video-url');
                    const videoTitleToPlay = this.getAttribute('data-video-title');
                    playVideo(videoUrlToPlay, videoTitleToPlay);
                    return; 
                }

                if (targetThumbnail) {
                    targetThumbnail.focus();
                    targetThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                }
            });
            thumbnailContainer.appendChild(thumbnailDiv);
        });
        carouselDiv.appendChild(thumbnailContainer);
        return carouselDiv;
    }

    function renderCarousels() {
        mainContentArea.innerHTML = ''; 
        carouselsData.forEach(carouselContent => {
            const carouselElement = createCarousel(carouselContent);
            mainContentArea.appendChild(carouselElement);
        });
    }
    renderCarousels();
});
