document.addEventListener('DOMContentLoaded', function() {
    const mainContentArea = document.getElementById('content');
    let originalCarouselsHTML = ''; // To store the initial state of carousels

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
                { id: '5', title: 'Cosmos Laundromat - First Cycle', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Cosmos+Laundromat', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/CosmosLaundromat.mp4'}
            ]
        },
        {
            title: 'Animation & VFX Shorts',
            videos: [
                { id: '6', title: 'Spring', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Spring', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
                { id: '7', title: 'Coffee Run', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Coffee+Run', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
                { id: '8', title: 'Agent 327: Operation Barbershop', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Agent+327', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
                { id: '9', title: 'Caminandes: Llamigos', thumbnailUrl: 'https://via.placeholder.com/280x150.png?text=Caminandes', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' }
            ]
        }
    ];

    function playVideo(videoUrl, videoTitle) {
        mainContentArea.innerHTML = ''; // Clear existing content

        const videoPlayerContainer = document.createElement('div');
        videoPlayerContainer.style.padding = '20px'; // Add some padding around the video

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
        videoElement.style.maxHeight = 'calc(100vh - 150px)'; // Ensure video fits viewport reasonably
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
            thumbnailContainer.appendChild(thumbnailDiv);

            thumbnailDiv.addEventListener('click', function() {
                const videoUrl = this.getAttribute('data-video-url');
                const videoTitle = this.getAttribute('data-video-title');
                playVideo(videoUrl, videoTitle);
            });
        });

        carouselDiv.appendChild(thumbnailContainer);
        return carouselDiv;
    }

    function renderCarousels() {
        mainContentArea.innerHTML = ''; // Clear current content (e.g., video player)
        // For this version, let's always re-render to ensure listeners are attached.
        carouselsData.forEach(carouselContent => {
            const carouselElement = createCarousel(carouselContent);
            mainContentArea.appendChild(carouselElement);
        });
        // Optionally, store the generated HTML to restore it faster next time
        // if (!originalCarouselsHTML) {
        // originalCarouselsHTML = mainContentArea.innerHTML; // This approach has issues with event listeners
        // }
    }

    // Initial rendering of carousels
    renderCarousels();
});
