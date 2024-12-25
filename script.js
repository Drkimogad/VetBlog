document.addEventListener("DOMContentLoaded", () => {
    const heroTitle = document.getElementById("hero-title");
    const heroUpload = document.getElementById("hero-upload");
    const heroBanner = document.getElementById("hero-banner");
    const blogList = document.getElementById("blog-list");

    // Load hero banner image
    const savedBanner = localStorage.getItem("hero-banner");
    if (savedBanner) {
        heroBanner.src = savedBanner;
        heroBanner.style.display = "block";
    }

    // Hero banner image upload
    heroUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            heroBanner.src = e.target.result;
            heroBanner.style.display = "block";
            localStorage.setItem("hero-banner", e.target.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    });

    // Generate blogs dynamically
    const savedVisibleBlogs = parseInt(localStorage.getItem("visibleBlogs"), 10) || 1;

    for (let i = 1; i <= 100; i++) {
        const blogPost = document.createElement("div");
        blogPost.className = "blog-post";
        blogPost.style.display = i <= savedVisibleBlogs ? "block" : "none";

        blogPost.innerHTML = `
            <h3>Blog Post ${i}</h3>
            <textarea placeholder="Write your blog here..." data-index="${i}">${localStorage.getItem(
            `blog-${i}`
        ) || ""}</textarea>
            <button class="like-btn" data-index="${i}">Like (<span id="like-count-${i}">${localStorage.getItem(
            `likes-${i}`
        ) || 0}</span>)</button>
            <button class="share-btn" data-index="${i}">Share</button>
        `;

        blogList.appendChild(blogPost);

        // Load saved blog text
        const blogTextarea = blogPost.querySelector("textarea");
        blogTextarea.addEventListener("input", (e) => {
            const blogIndex = e.target.dataset.index;
            localStorage.setItem(`blog-${blogIndex}`, e.target.value);
        });

        // Like button functionality
        const likeBtn = blogPost.querySelector(".like-btn");
        likeBtn.addEventListener("click", () => {
            const blogIndex = likeBtn.dataset.index;
            const likeCount = document.getElementById(`like-count-${blogIndex}`);
            let count = parseInt(localStorage.getItem(`likes-${blogIndex}`) || 0, 10);
            count += 1;
            likeCount.textContent = count;
            localStorage.setItem(`likes-${blogIndex}`, count);
        });

        // Share button functionality
        const shareBtn = blogPost.querySelector(".share-btn");
        shareBtn.addEventListener("click", () => {
            alert(`Blog Post ${i} shared!`);
        });
    }

    // Add a button to post new blogs
    const postBlogButton = document.createElement("button");
    postBlogButton.textContent = "Post Next Blog";
    postBlogButton.style.marginTop = "20px";
    blogList.appendChild(postBlogButton);

    postBlogButton.addEventListener("click", () => {
        const visibleBlogs = document.querySelectorAll(".blog-post[style='display: block;']").length;
        const nextBlogPost = document.querySelector(`.blog-post:nth-child(${visibleBlogs + 1})`);
        if (nextBlogPost) {
            nextBlogPost.style.display = "block";
            localStorage.setItem("visibleBlogs", visibleBlogs + 1);
        } else {
            alert("All blogs have been posted!");
        }
    });
});
