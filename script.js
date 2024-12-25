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

    const posts = [
        { title: "First Post", content: "This is the content of the first post." },
        { title: "Second Post", content: "This is the content of the second post." },
        { title: "Third Post", content: "This is the content of the third post." }
    ];

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "blog-post";
        postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
        blogList.appendChild(postElement);
    });
});
