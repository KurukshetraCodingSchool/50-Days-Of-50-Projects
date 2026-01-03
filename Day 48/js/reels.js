/**
 * Kurugram Reels Logic
 * Handles scroll detection, auto-play (progress bars), and double-tap interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    const reels = document.querySelectorAll('.reel');
    const container = document.getElementById('reelsContainer');

    // 1. Intersection Observer for Active Reel
    const observerOptions = {
        root: container,
        threshold: 0.8 // 80% of reel must be visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playReel(entry.target);
            } else {
                pauseReel(entry.target);
            }
        });
    }, observerOptions);

    reels.forEach(reel => observer.observe(reel));

    // 2. Play/Pause Logic (Simulated with progress bars)
    function playReel(reelEl) {
        const progressFill = reelEl.querySelector('.progress-fill');
        // Reset and animate
        gsap.to(progressFill, { width: '0%', duration: 0 });
        gsap.to(progressFill, {
            width: '100%',
            duration: 15, // Simulate a 15s reel
            ease: 'none',
            onComplete: () => {
                // Loop or go to next (simulated loop)
                gsap.set(progressFill, { width: '0%' });
                playReel(reelEl);
            }
        });
    }

    function pauseReel(reelEl) {
        const progressFill = reelEl.querySelector('.progress-fill');
        gsap.killTweensOf(progressFill);
    }

    // 3. Double Tap to Like (GSAP)
    reels.forEach(reel => {
        const videoContainer = reel.querySelector('.reel-video-container');
        let lastTap = 0;

        videoContainer.addEventListener('touchstart', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                handleDoubleTap(videoContainer);
            }
            lastTap = currentTime;
        });

        // For desktop
        videoContainer.addEventListener('dblclick', () => {
            handleDoubleTap(videoContainer);
        });
    });

    function handleDoubleTap(container) {
        // Create the heart element
        const heart = document.createElement('i');
        heart.className = 'ri-heart-fill reel-heart-pop';
        container.appendChild(heart);

        // GSAP Animation
        gsap.fromTo(heart,
            { scale: 0, opacity: 0 },
            {
                scale: 1.2,
                opacity: 0.9,
                duration: 0.4,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    gsap.to(heart, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.3,
                        delay: 0.2,
                        onComplete: () => heart.remove()
                    });
                }
            }
        );

        // Update the action button
        const heartAction = container.querySelector('.ri-heart-line');
        if (heartAction) {
            heartAction.className = 'ri-heart-fill';
            heartAction.style.color = '#ff3040';
            gsap.from(heartAction, { scale: 0.7, duration: 0.2 });
        }
    }

    // 4. Action Toggles
    const actionIcons = document.querySelectorAll('.action-item i');
    actionIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            if (this.classList.contains('ri-heart-line')) {
                this.className = 'ri-heart-fill';
                this.style.color = '#ff3040';
                gsap.from(this, { scale: 1.3, duration: 0.2 });
            } else if (this.classList.contains('ri-heart-fill')) {
                this.className = 'ri-heart-line';
                this.style.color = '';
            } else if (this.classList.contains('ri-bookmark-line')) {
                this.className = 'ri-bookmark-fill';
            } else if (this.classList.contains('ri-bookmark-fill')) {
                this.className = 'ri-bookmark-line';
            }
        });
    });
});
