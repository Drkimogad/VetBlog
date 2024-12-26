document.addEventListener("DOMContentLoaded", () => {
    // Hero banner functionality
    const heroUpload = document.getElementById("hero-upload");
    const heroBanner = document.getElementById("hero-banner");
    const savedBanner = localStorage.getItem("hero-banner");

    // Display saved hero banner if exists
    if (savedBanner) {
        heroBanner.src = savedBanner;
        heroBanner.style.display = "block";  // Ensure the image is shown
    }

    // Update hero banner when file is uploaded
    heroUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            heroBanner.src = e.target.result;
            heroBanner.style.display = "block";  // Ensure the image is shown
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

    addBlogBtn.addEventListener("click", () => {
        const postElement = document.createElement("div");
        postElement.className = "blog-post";
        postElement.innerHTML = `
            <h2>New Blog Post</h2>
            <textarea class="blog-content">This is a new blog post.</textarea>
            <button class="publish-btn">Publish</button>
            <div class="blog-actions">
                <button class="like-btn">Like</button>
                <button class="share-btn">Share</button>
            </div>
        `;
        blogList.appendChild(postElement);
    });

    // Publish button functionality
    blogList.addEventListener("click", (event) => {
        if (event.target.classList.contains("publish-btn")) {
            const blogContent = event.target.previousElementSibling.value;
            console.log("Published blog content:", blogContent);
            // Additional publish logic can be added here
        }
    });
});
