---
description: How to implement and maintain advanced Kurugram features (Smart Feed, Reels, Stories, GSAP)
---

This workflow outlines the steps to implement and maintain the premium features of Kurugram, including the Smart Feed, Reels system, Stories, and advanced GSAP animations.

### 1. Data Layer Implementation (LocalStorage)
Manage data persistence using a centralized storage utility.
- Use `js/storage.js` to handle `localStorage` keys for `posts`, `users`, and `likes`.
- Initialize default data if the storage is empty.

### 2. Component-Based UI Rendering
Modularize UI elements for scalability and consistency.
- Define `js/components.js` with functions for `PostCard`, `StoryItem`, and `SuggestionItem`.
- Use template literals to inject dynamic data into HTML.

### 3. Smart Feed & Logic
Implement sorting and filtering in the main feed.
- Add "Latest" and "Popular" sorting tabs in `feed.html`.
- Use `KurugramStorage.getPosts()` and JavaScript `.sort()` to reorder the feed.
- Implement intersection observer for lazy loading or play/pause logic.

### 4. Premium Reels UI (Vertical Scroll)
Create a TikTok/Instagram Reels style vertical scroll experience.
- Define `reels.html` with `scroll-snap-type: y mandatory`.
- Implement `js/reels.js` for:
    - Auto-playing videos using `IntersectionObserver`.
    - Double-tap GSAP heart animation.
    - Progress bars linked to `video.currentTime`.

### 5. Advanced Stories System
IG-style stories with auto-progress.
- Use `js/stories.js` to manage story indexes and progress bars.
- Integrate GSAP for:
    - Smooth progress bar filling.
    - Modal open/close transitions (scale/fade).
    - Closing gestures (swipe down).

### 6. Global UX & Animations (GSAP)
Add premium Polish.
- Use `js/navigation.js` for:
    - Page transition animations (`gsap.from('main', ...)`).
    - Navbar hide/show on scroll behavior.
- Implement like button bounce effects in `feed.js`.

### 7. PWA Readiness
Make the app installable.
- Ensure `manifest.json` is linked in all HTML headers.
- Define app icons, theme colors, and start URL.
