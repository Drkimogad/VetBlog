// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Hero Banner Functionality
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

    // Blog Posts Functionality
    const blogList = document.getElementById("blog-list");
    const addBlogBtn = document.getElementById("add-blog-btn");

    addBlogBtn.addEventListener("click", () => {
        const postElement = document.createElement("div");
        postElement.className = "blog-post";
        postElement.innerHTML = `
            <textarea class="blog-content">Write your blog here...</textarea>
            <button class="publish-btn">Publish</button>
            <button class="like-btn">Like</button>
            <button class="share-btn">Share</button>
        `;
        blogList.appendChild(postElement);
    });

    blogList.addEventListener("click", (event) => {
        if (event.target.classList.contains("publish-btn")) {
            const blogContent = event.target.previousElementSibling.value;
            alert("Published: " + blogContent);
        } else if (event.target.classList.contains("like-btn")) {
            alert("You liked this post!");
        } else if (event.target.classList.contains("share-btn")) {
            alert("Post shared!");
        }
    });
});
