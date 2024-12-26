document.addEventListener("DOMContentLoaded", () => {
    const heroUpload = document.getElementById("hero-upload");
    const heroBanner = document.getElementById("hero-banner");
    const savedBanner = localStorage.getItem("hero-banner");

    if (savedBanner) {
        heroBanner.src = savedBanner;
        heroBanner.style.display = "block";
    }

    heroUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            heroBanner.src = e.target.result;
            heroBanner.style.display = "block";
            localStorage.setItem("hero-banner", e.target.result);
        };
        if (file) reader.readAsDataURL(file);
    });

    const aboutUsText = document.getElementById("about-us-text");
    const savedAboutUs = localStorage.getItem("about-us");

    if (savedAboutUs) {
        aboutUsText.textContent = savedAboutUs;
    }

    aboutUsText.addEventListener("input", () => {
        localStorage.setItem("about-us", aboutUsText.textContent);
    });

    const blogList = document.getElementById("blog-list");
    const addBlogBtn = document.getElementById("add-blog-btn");
    const blogTextArea = document.getElementById("blog-textarea");
    const blogImageInput = document.getElementById("blog-image-input");

    addBlogBtn.addEventListener("click", () => {
        const postElement = document.createElement("div");
        postElement.className = "blog-post";
        postElement.innerHTML = `
            <h2>New Blog Post</h2>
            <textarea class="blog-content" placeholder="Write your blog content..."></textarea>
            <input type="file" class="blog-image-upload" />
            <button class="publish-btn">Publish</button>
            <button class="delete-btn">Delete</button>
            <div class="blog-actions">
                <button class="like-btn">Like</button>
                <button class="share-btn">Share</button>
            </div>
        `;
        blogList.appendChild(postElement);
    });

    blogList.addEventListener("click", (event) => {
        if (event.target.classList.contains("publish-btn")) {
            const blogContent = event.target.previousElementSibling.previousElementSibling.value;
            const blogImage = event.target.previousElementSibling.previousElementSibling.previousElementSibling.files[0];
            const reader = new FileReader();
            if (blogImage) {
                reader.onload = (e) => {
                    const publishedPost = document.createElement("div");
                    publishedPost.classList.add("published-post");
                    publishedPost.innerHTML = `
                        <div class="post-content">
                            <img src="$
