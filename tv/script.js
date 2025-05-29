document.addEventListener('DOMContentLoaded', function() {
    const mainContentArea = document.getElementById('content');
    // let originalCarouselsHTML = ''; // To store the initial state of carousels - Not effectively used with current renderCarousels

    // Data for video carousels
    // Sourced from: https://www.blender.org/about/projects/
    const carouselsData = [
        {
            title: 'Featured Blender Open Movies',
            videos: [
                { id: '1', title: 'Big Buck Bunny', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Big+Buck+Bunny', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
                { id: '2', title: 'Sintel', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Sintel', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
                { id: '3', title: 'Tears of Steel', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Tears+of+Steel', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
                { id: '4', title: 'Elephants Dream', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Elephants+Dream', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
                { id: '5', title: 'Cosmos Laundromat - First Cycle', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Cosmos+Laundromat', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/CosmosLaundromat.mp4'},
                { id: '1', title: 'Big Buck Bunny', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Big+Buck+Bunny', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
                { id: '2', title: 'Sintel', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Sintel', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' }
            ]
        },
        {
            title: 'Animation & VFX Shorts',
            videos: [
                { id: '6', title: 'Spring', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Spring', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
                { id: '7', title: 'Coffee Run', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Coffee+Run', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
                { id: '8', title: 'Agent 327: Operation Barbershop', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Agent+327', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
                { id: '9', title: 'Caminandes: Llamigos', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Caminandes', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
                { id: '6', title: 'Spring', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Spring', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
                { id: '7', title: 'Coffee Run', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Coffee+Run', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }
            ]
        }
    ];

    function playVideo(videoUrl, videoTitle) {
        mainContentArea.innerHTML = ''; // Clear existing content

        const videoPlayerContainer = document.createElement('div');
        videoPlayerContainer.style.padding = '20px'; // Add some padding around the video
        // videoPlayerContainer.classList.add('video-player-container'); // Optional: for CSS styling

        const videoTitleElement = document.createElement('h2');
        videoTitleElement.textContent = videoTitle;
        videoTitleElement.style.marginBottom = '15px';
        // videoTitleElement.classList.add('video-title-player'); // Optional: for CSS styling
        videoPlayerContainer.appendChild(videoTitleElement);

        const videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.style.width = '100%';
        videoElement.style.height = 'auto';
        videoElement.style.maxHeight = 'calc(100vh - 150px)'; // Ensure video fits viewport reasonably
        // videoElement.style.borderRadius = '4px'; // Optional
        videoPlayerContainer.appendChild(videoElement);

        const backButton = document.createElement('button');
        backButton.textContent = '← Back to Home';
        // backButton.classList.add('back-button'); // Optional: for CSS styling (remove inline styles below if used)
        backButton.style.marginTop = '20px';
        backButton.style.padding = '10px 20px';
        backButton.style.fontSize = '16px';
        backButton.style.backgroundColor = '#555'; // Default, can be overridden by CSS if class is used
        backButton.style.color = '#fff';
        backButton.style.border = 'none';
        backButton.style.borderRadius = '4px';
        backButton.style.cursor = 'pointer';
        backButton.addEventListener('click', renderCarousels);
        videoPlayerContainer.appendChild(backButton);
        
        mainContentArea.appendChild(videoPlayerContainer);
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

        carouselData.videos.forEach(video => {
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.classList.add('thumbnail');
            thumbnailDiv.setAttribute('data-video-id', video.id);
            thumbnailDiv.setAttribute('data-video-url', video.videoUrl);
            thumbnailDiv.setAttribute('data-video-title', video.title);

            const imgElement = document.createElement('img'); 
            imgElement.src = video.thumbnailUrl;
            imgElement.alt = video.title;

            const thumbnailTitle = document.createElement('div');
            thumbnailTitle.classList.add('thumbnail-title');
            thumbnailTitle.textContent = video.title;

            thumbnailDiv.appendChild(imgElement);
            thumbnailDiv.appendChild(thumbnailTitle);
            
            // --- START OF HOVER PREVIEW LOGIC ---
            let previewTimer = null;

            thumbnailDiv.addEventListener('mouseenter', () => {
                if (previewTimer) clearTimeout(previewTimer); // Clear existing timer

                previewTimer = setTimeout(() => {
                    const staticImg = thumbnailDiv.querySelector('img');
                    if (staticImg) {
                        staticImg.style.display = 'none';
                    }

                    const oldPreviewVideo = thumbnailDiv.querySelector('.thumbnail-video-preview');
                    if (oldPreviewVideo) {
                        oldPreviewVideo.remove();
                    }

                    const previewVideo = document.createElement('video');
                    previewVideo.src = video.videoUrl; 
                    previewVideo.autoplay = true;
                    previewVideo.loop = true;
                    previewVideo.muted = true; // Important for autoplay without user interaction
                    previewVideo.classList.add('thumbnail-video-preview');
                    previewVideo.style.display = 'block'; 

                    thumbnailDiv.insertBefore(previewVideo, thumbnailTitle); 
                }, 2000); 
            });

            thumbnailDiv.addEventListener('mouseleave', () => {
                if (previewTimer) {
                    clearTimeout(previewTimer);
                    previewTimer = null;
                }

                const previewVideo = thumbnailDiv.querySelector('.thumbnail-video-preview');
                if (previewVideo) {
                    previewVideo.remove();
                }

                const staticImg = thumbnailDiv.querySelector('img');
                if (staticImg) {
                    staticImg.style.display = 'block';
                }
            });
            // --- END OF HOVER PREVIEW LOGIC ---

            thumbnailDiv.addEventListener('click', function() {
                if (previewTimer) { // Clear hover preview timer if active
                    clearTimeout(previewTimer);
                    previewTimer = null;
                }
                const existingPreview = this.querySelector('.thumbnail-video-preview');
                if (existingPreview) { // Remove preview video if playing
                    existingPreview.remove();
                }
                const staticImg = this.querySelector('img');
                if (staticImg) { // Ensure static image is visible before full playback
                    staticImg.style.display = 'block';
                }

                const videoUrl = this.getAttribute('data-video-url');
                const videoTitle = this.getAttribute('data-video-title');
                playVideo(videoUrl, videoTitle); 
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

    // Initial rendering of carousels
    renderCarousels();
});
