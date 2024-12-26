// script.js
document.addEventListener("DOMContentLoaded", () => {
    const heroUpload = document.getElementById("hero-upload");
    const heroBanner = document.getElementById("hero-banner");

    // Restore saved banner
    const savedBanner = localStorage.getItem("hero-banner");
    if (savedBanner) {
        heroBanner.src = savedBanner;
        heroBanner.style.display = "block";
    }

    // Handle hero banner upload
    heroUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            heroBanner.src = e.target.result;
            heroBanner.style.display = "block";
            localStorage.setItem("hero-banner", e.target.result);
        };
        reader.readAsDataURL(file);
    });

    // Blog section
    const blogList = document.getElementById("blog-list");
    const addBlogBtn = document.getElementById("add-blog-btn");

    // Add new blog post
    addBlogBtn.addEventListener("click", () => {
        const post = document.createElement("div");
        post.classList.add("blog-post");
        post.innerHTML = `
            <textarea placeholder="Write your blog here..."></textarea>
            <button class="publish-btn">Publish</button>
            <button class="like-btn">Like</button>
            <button class="share-btn">Share</button>
        `;
        blogList.appendChild(post);
    });

    // Blog buttons functionality
    blogList.addEventListener("click", (event) => {
        if (event.target.classList.contains("publish-btn")) {
            const content = event.target.previousElementSibling.value;
            alert(`Blog published: ${content}`);
        } else if (event.target.classList.contains("like-btn")) {
            alert("You liked this blog!");
        } else if (event.target.classList.contains("share-btn")) {
            alert("Blog shared!");
        }
    });
});
