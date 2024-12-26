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
        const postElement = document.createElement("div");
        postElement.className = "blog-post";
        postElement.innerHTML = `
            <p>${blogPostContent}</p>
            <textarea class="blog-content" placeholder="Add photo to your post..."></textarea>
            <button class="publish-btn">Publish</button>
            <button class="delete-btn">Delete</button>
        `;
        blogList.appendChild(postElement);
        newBlogContent.value = ""; // Clear the text area after adding the blog

        // Handle publish button click
        postElement.querySelector(".publish-btn").addEventListener("click", () => {
            const blogContent = postElement.querySelector(".blog-content").value;
            postElement.querySelector("p").textContent = blogContent; // Update the post content with image or text
        });

        // Handle delete button click
        postElement.querySelector(".delete-btn").addEventListener("click", () => {
            blogList.removeChild(postElement);
        });
    });
});
