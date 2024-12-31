document.addEventListener("DOMContentLoaded", () => {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    let currentIndex = 0;

    const blogTextarea = document.getElementById("blog-textarea");
    const blogImageUpload = document.getElementById("blog-image-upload");
    const imagePreview = document.getElementById("image-preview");
    const publishBtn = document.getElementById("publish-btn");
    const publishedBlogs = document.getElementById("published-blogs");

    // Load blogs on page load
    function loadBlogs() {
        if (blogs.length > 0) {
            displayBlog(currentIndex);
        } else {
            publishedBlogs.innerHTML = "<p>No blogs available. Write one to get started!</p>";
        }
    }

    // Save blogs to LocalStorage
    function saveToLocalStorage() {
        localStorage.setItem("blogs", JSON.stringify(blogs));
    }

    // Handle image preview
    blogImageUpload.addEventListener("change", () => {
        const file = blogImageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                imagePreview.src = reader.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = "none";
        }
    });

    // Publish a new blog
    publishBtn.addEventListener("click", () => {
        const text = blogTextarea.value.trim();
        const image = imagePreview.src;

        if (!text) {
            alert("Please write something for the blog.");
            return;
        }

        blogs.push({ text, image });
        saveToLocalStorage();

        blogTextarea.value = "";
        blogImageUpload.value = "";
        imagePreview.style.display = "none";

        currentIndex = blogs.length - 1; // Focus on the newly added blog
        displayBlog(currentIndex);
        alert("Blog published successfully!");
    });

    // Display a specific blog by index
    function displayBlog(index) {
        publishedBlogs.innerHTML = ""; // Clear previous content

        if (blogs.length === 0) {
            publishedBlogs.innerHTML = "<p>No blogs available</p>";
            return;
        }

        const blog = blogs[index];
        const blogDiv = document.createElement("div");
        blogDiv.className = "blog-post";

        const blogContent = document.createElement("p");
        blogContent.textContent = blog.text;
        blogDiv.appendChild(blogContent);

        if (blog.image) {
            const blogImage = document.createElement("img");
            blogImage.src = blog.image;
            blogImage.alt = "Blog Image";
            blogDiv.appendChild(blogImage);
        }

        publishedBlogs.appendChild(blogDiv);
    }

    // Initialize
    loadBlogs();
});
