/**
 * Kurugram Create Post Logic
 * Handles image selection, preview, and simulated sharing
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Elements
    const fileInput = document.getElementById('fileInput');
    const selectBtn = document.getElementById('selectBtn');
    const stepSelect = document.getElementById('stepSelect');
    const stepPreview = document.getElementById('stepPreview');
    const imagePreview = document.getElementById('imagePreview');
    const postDetails = document.getElementById('postDetails');
    const captionInput = document.getElementById('captionInput');

    const cancelBtn = document.getElementById('cancelPost');
    const nextBtn = document.getElementById('nextStep');
    const shareBtn = document.getElementById('sharePost');
    const headerTitle = document.getElementById('createHeaderTitle');

    let currentStep = 1; // 1: Select, 2: Preview, 3: Caption

    // 2. Step Management
    function goToStep(step) {
        currentStep = step;

        // Hide all steps
        stepSelect.style.display = 'none';
        stepPreview.style.display = 'none';
        postDetails.style.display = 'none';

        // Header Reset
        nextBtn.style.display = 'none';
        shareBtn.style.display = 'none';
        cancelBtn.textContent = 'Cancel';

        if (step === 1) {
            stepSelect.style.display = 'flex';
            headerTitle.textContent = 'Create new post';
        } else if (step === 2) {
            stepSelect.style.display = 'none';
            stepPreview.style.display = 'grid'; // Layout check
            postDetails.style.display = 'none';
            headerTitle.textContent = 'Preview';
            nextBtn.style.display = 'block';
            cancelBtn.innerHTML = '<i class="ri-arrow-left-line"></i>';
        } else if (step === 3) {
            stepSelect.style.display = 'none';
            stepPreview.style.display = 'grid';
            postDetails.style.display = 'flex';
            headerTitle.textContent = 'New post';
            shareBtn.style.display = 'block';
            cancelBtn.innerHTML = '<i class="ri-arrow-left-line"></i>';
        }
    }

    // 3. File Handling
    selectBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.src = event.target.result;
                goToStep(2);
            };
            reader.readAsDataURL(file);
        }
    });

    // 4. Navigation Actions
    nextBtn.addEventListener('click', () => {
        if (currentStep === 2) goToStep(3);
    });

    cancelBtn.addEventListener('click', () => {
        if (currentStep === 1) {
            window.location.href = 'feed.html';
        } else if (currentStep === 2) {
            goToStep(1);
            fileInput.value = '';
        } else if (currentStep === 3) {
            goToStep(2);
        }
    });

    // 5. Sharing Simulation
    shareBtn.addEventListener('click', () => {
        const user = KurugramStorage.getCurrentUser();
        const newPost = {
            id: 'post_' + Date.now(),
            userId: user.id,
            username: user.username,
            userImage: user.avatar,
            image: imagePreview.src,
            caption: captionInput.value,
            likes: [],
            comments: [],
            timestamp: Date.now()
        };

        // UI feedback
        shareBtn.disabled = true;
        shareBtn.innerHTML = '<i class="ri-loader-4-line spin"></i> Sharing...';

        // Save and redirect
        setTimeout(() => {
            KurugramStorage.savePost(newPost);
            window.location.href = 'feed.html';
        }, 1500);
    });

    // Inject share spin animation if not exists (redundant since auth.js has it, but safe)
    if (!document.getElementById('shared-animations')) {
        const style = document.createElement('style');
        style.id = 'shared-animations';
        style.textContent = `
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .spin { display: inline-block; animation: spin 1s linear infinite; }
        `;
        document.head.appendChild(style);
    }
});
