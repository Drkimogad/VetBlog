document.addEventListener("DOMContentLoaded", () => {
    // Hero banner functionality
    const heroUpload = document.getElementById("hero-upload");
    const heroBanner = document.getElementById("hero-banner");
    const savedBanner = localStorage.getItem("hero-banner");

    // Display saved hero banner if exists
    if (savedBanner) {
        heroBanner.src = savedBanner;
        heroBanner.style.display = "block";
    }

    // Update hero banner when file is uploaded
    heroUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            heroBanner.src = e.target.result;
            heroBanner.style.display = "block";
            localStorage.setItem("hero-banner", e.target.result); // Save the banner to localStorage
        };
        if (file) reader.readAsDataURL(file);
    });

    // About Us contenteditable save
    const aboutUsText = document.getElementById("about-us-text");
    const savedAboutUs = localStorage.getItem("about-us");

    // Load saved About Us text if exists
    if (savedAboutUs) {
        aboutUsText.textContent = savedAboutUs;
    }

    // Save About Us content on input change
    aboutUsText.addEventListener("input", () => {
        localStorage.setItem("about-us", aboutUsText.textContent);
    });

    // Blog posts functionality
    const blogList = document.getElementById("blog-list");
    const addBlogBtn = document.getElementById("add-blog-btn");
    const publishBtn = document.getElementById("publish-btn");
    const newBlogTextarea = document.getElementById("new-blog");

    // Add blog post on click
    addBlogBtn.addEventListener("click", () => {
        newBlogTextarea.value = ''; // Clear the textarea for new post
        newBlogTextarea.style.display = 'block'; // Show textarea
    });

    // Publish blog post
    publishBtn.addEventListener("click", () => {
        const postContent = newBlogTextarea.value;
        if (postContent) {
            const postElement = document.createElement("div");
            postElement.className = "blog-post";
            postElement.innerHTML = `
                <h2>New Blog Post</h2>
                <p>${postContent}</p>
                <div class="blog-actions">
                    <button class="like-btn">Like</button>
                    <button class="share-btn">Share</button>
                </div>
            `;
            blogList.appendChild(postElement);
            newBlogTextarea.value = ''; // Clear after publishing
            newBlogTextarea.style.display = 'none'; // Hide textarea
        }
    });
});
