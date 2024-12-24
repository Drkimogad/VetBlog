document.addEventListener("DOMContentLoaded", () => {
    // Editable hero section
    const heroTitle = document.getElementById("hero-title");
    const heroBtn = document.getElementById("edit-hero-btn");

    const aboutText = document.getElementById("about-text");
    const aboutBtn = document.getElementById("edit-about-btn");

    // Load saved hero and about content
    heroTitle.textContent = localStorage.getItem("hero-title") || "Welcome to My Blog";
    aboutText.textContent = localStorage.getItem("about-text") || "This is a customizable section about you or your blog.";

    // Edit hero content
    heroBtn.addEventListener("click", () => {
        const newHeroTitle = prompt("Edit Hero Title:", heroTitle.textContent);
        if (newHeroTitle) {
            heroTitle.textContent = newHeroTitle;
            localStorage.setItem("hero-title", newHeroTitle);
        }
    });

    // Edit about content
    aboutBtn.addEventListener("click", () => {
        const newAboutText = prompt("Edit About Us:", aboutText.textContent);
        if (newAboutText) {
            aboutText.textContent = newAboutText;
            localStorage.setItem("about-text", newAboutText);
        }
    });

    // Generate blogs dynamically
    const blogList = document.getElementById("blog-list");
    for (let i = 1; i <= 100; i++) {
        const blogPost = document.createElement("div");
        blogPost.className = "blog-post";
        blogPost.innerHTML = `<h3>Blog Post ${i}</h3><p>This is the content for blog post ${i}.</p>`;
        blogList.appendChild(blogPost);
    }

    // Social media links
    const tiktokLink = document.getElementById("tiktok-link");
    const wordpressLink = document.getElementById("wordpress-link");

    // Load saved links
    tiktokLink.href = localStorage.getItem("tiktok-link") || "#";
    wordpressLink.href = localStorage.getItem("wordpress-link") || "#";

    // Edit links
    tiktokLink.addEventListener("click", (e) => {
        e.preventDefault();
        const newLink = prompt("Enter your TikTok profile link:", tiktokLink.href);
        if (newLink) {
            tiktokLink.href = newLink;
            localStorage.setItem("tiktok-link", newLink);
        }
    });

    wordpressLink.addEventListener("click", (e) => {
        e.preventDefault();
        const newLink = prompt("Enter your WordPress profile link:", wordpressLink.href);
        if (newLink) {
            wordpressLink.href = newLink;
            localStorage.setItem("wordpress-link", newLink);
        }
    });
});
