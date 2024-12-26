document.addEventListener("DOMContentLoaded", () => {
    // Hero banner functionality
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

    // About Us contenteditable save
    const aboutUsText = document.getElementById("about-us-text");
    const savedAboutUs = localStorage.getItem("about-us");

    if (savedAboutUs) {
        aboutUsText.textContent = savedAboutUs;
    }

    aboutUsText.addEventListener("input", () => {
        localStorage.setItem("about-us", aboutUsText.textContent);
    });

    // Blog functionality
    const blogList = document.getElementById("blog-list");
    const addBlogBtn = document.getElementById("add-blog-btn");
    const newBlogContent = document.getElementById("new-blog-content");

    addBlogBtn.addEventListener("click", () => {
        const blogPostContent = newBlogContent.value;
        if (!blogPostContent.trim()) return; // Prevent empty blog posts
        const postElement = document.createElement("div");
        postElement.className = "blog-post";
        postElement.innerHTML = `
            <p>${blogPostContent}</p>
            <div class="blog-actions">
                <button class="like-btn">Like</button>
                <button class="share-btn">Share</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        blogList.appendChild(postElement);
        newBlogContent.value = ""; // Clear the text area after adding the blog

        // Handle like button click
        postElement.querySelector(".like-btn").addEventListener("click", () => {
            alert("You liked this post!");
        });

        // Handle share button click
        postElement.querySelector(".share-btn").addEventListener("click", () => {
            alert("Post shared!");
        });

        // Handle delete button click
        postElement.querySelector(".delete-btn").addEventListener("click", () => {
            blogList.removeChild(postElement);
        });
    });
});
