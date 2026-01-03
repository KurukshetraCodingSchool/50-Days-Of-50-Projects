/**
 * Kurugram Stories Logic
 * Handles viewing stories, progress bars, and navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    const storyViewer = document.getElementById('storyViewer');
    const storyDisplayImg = document.getElementById('storyDisplayImg');
    const storyUserAvatar = document.getElementById('storyUserAvatar');
    const storyUsername = document.getElementById('storyUsername');
    const storyProgress = document.getElementById('storyProgress');
    const closeBtn = document.getElementById('closeStory');
    const prevBtn = document.getElementById('prevStory');
    const nextBtn = document.getElementById('nextStory');

    const storyItems = document.querySelectorAll('.story-item');

    // Mock Data for Stories
    const storiesData = [
        {
            user: 'alex_dev',
            avatar: 'https://i.pravatar.cc/150?u=1',
            images: [
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'
            ]
        },
        {
            user: 'design_pro',
            avatar: 'https://i.pravatar.cc/150?u=2',
            images: [
                'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800'
            ]
        },
        {
            user: 'travel_x',
            avatar: 'https://i.pravatar.cc/150?u=3',
            images: [
                'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
            ]
        },
        {
            user: 'foodie_99',
            avatar: 'https://i.pravatar.cc/150?u=4',
            images: [
                'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800'
            ]
        },
        {
            user: 'fitness_j',
            avatar: 'https://i.pravatar.cc/150?u=5',
            images: [
                'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800'
            ]
        },
        {
            user: 'kurukshetra',
            avatar: 'https://i.pravatar.cc/150?u=6',
            images: [
                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'
            ]
        }
    ];

    let currentStoryUserIndex = 0;
    let currentImageIndex = 0;
    let storyTimer = null;
    const STORY_DURATION = 5000; // 5 seconds

    const openStory = (userIndex) => {
        currentStoryUserIndex = userIndex;
        currentImageIndex = 0;
        showStory();

        storyViewer.style.display = 'flex';
        gsap.fromTo(storyViewer.querySelector('.story-modal-content'),
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" }
        );
        document.body.style.overflow = 'hidden';
    };

    const showStory = () => {
        const currentUser = storiesData[currentStoryUserIndex];
        const currentImage = currentUser.images[currentImageIndex];

        storyDisplayImg.src = currentImage;
        storyUserAvatar.src = currentUser.avatar;
        storyUsername.textContent = currentUser.user;

        // Reset and rebuild progress bars
        storyProgress.innerHTML = '';
        currentUser.images.forEach((_, idx) => {
            const bar = document.createElement('div');
            bar.className = 'progress-bar';
            const fill = document.createElement('div');
            fill.className = 'progress-fill';

            if (idx < currentImageIndex) {
                fill.style.width = '100%';
            }

            bar.appendChild(fill);
            storyProgress.appendChild(bar);
        });

        startTimer();
    };

    const startTimer = () => {
        if (storyTimer) clearTimeout(storyTimer);

        const currentFill = storyProgress.querySelectorAll('.progress-fill')[currentImageIndex];

        // GSAP for progress bar for smoother control
        gsap.killTweensOf(currentFill);
        gsap.set(currentFill, { width: '0%' });

        // Initial image zoom
        gsap.fromTo(storyDisplayImg, { scale: 1.1 }, { scale: 1, duration: STORY_DURATION / 1000, ease: "none" });

        gsap.to(currentFill, {
            width: '100%',
            duration: STORY_DURATION / 1000,
            ease: "none",
            onComplete: nextStory
        });
    };

    const nextStory = () => {
        const currentUser = storiesData[currentStoryUserIndex];

        // Crossfade animation
        gsap.to(storyDisplayImg, {
            opacity: 0,
            scale: 1.1,
            duration: 0.3,
            onComplete: () => {
                if (currentImageIndex < currentUser.images.length - 1) {
                    currentImageIndex++;
                    showStory();
                } else if (currentStoryUserIndex < storiesData.length - 1) {
                    currentStoryUserIndex++;
                    currentImageIndex = 0;
                    showStory();
                } else {
                    closeStoryViewer();
                }
                gsap.to(storyDisplayImg, { opacity: 1, scale: 1, duration: 0.3 });
            }
        });
    };

    const prevStory = () => {
        gsap.to(storyDisplayImg, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            onComplete: () => {
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    showStory();
                } else if (currentStoryUserIndex > 0) {
                    currentStoryUserIndex--;
                    currentImageIndex = storiesData[currentStoryUserIndex].images.length - 1;
                    showStory();
                }
                gsap.to(storyDisplayImg, { opacity: 1, scale: 1, duration: 0.3 });
            }
        });
    };

    const closeStoryViewer = () => {
        if (storyTimer) clearTimeout(storyTimer);
        const modalContent = storyViewer.querySelector('.story-modal-content');

        gsap.to(modalContent, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                storyViewer.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    };

    // Hold to Pause Logic
    let isPaused = false;
    const pauseStory = () => {
        isPaused = true;
        const currentFill = storyProgress.querySelectorAll('.progress-fill')[currentImageIndex];
        gsap.getTweensOf(currentFill).forEach(t => t.pause());
        gsap.getTweensOf(storyDisplayImg).forEach(t => t.pause());
    };

    const resumeStory = () => {
        isPaused = false;
        const currentFill = storyProgress.querySelectorAll('.progress-fill')[currentImageIndex];
        gsap.getTweensOf(currentFill).forEach(t => t.resume());
        gsap.getTweensOf(storyDisplayImg).forEach(t => t.resume());
    };

    storyViewer.addEventListener('mousedown', pauseStory);
    storyViewer.addEventListener('mouseup', resumeStory);
    storyViewer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        pauseStory();
    });
    storyViewer.addEventListener('touchend', resumeStory);

    // Swipe down to close gesture
    let touchStartY = 0;
    storyViewer.addEventListener('touchmove', (e) => {
        const touchMoveY = e.touches[0].clientY;
        const diffY = touchMoveY - touchStartY;
        if (diffY > 100) { // Swipe down threshold
            closeStoryViewer();
        }
    });

    // Event Listeners
    storyItems.forEach((item, index) => {
        item.addEventListener('click', () => openStory(index));
    });

    closeBtn.addEventListener('click', closeStoryViewer);
    nextBtn.addEventListener('click', nextStory);
    prevBtn.addEventListener('click', prevStory);

    // Close on overlay click
    storyViewer.querySelector('.story-modal-overlay').addEventListener('click', closeStoryViewer);
});
