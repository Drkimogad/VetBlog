document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    // Load blogs from LocalStorage (or set as empty if none)
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    let currentIndex = 0;

    // DOM Elements
    const blogTextarea = document.getElementById("blog-textarea");
    const blogImageUpload = document.getElementById("blog-image-upload");
    const imagePreview = document.getElementById("image-preview");
    const publishBtn = document.getElementById("publish-btn");
    const publishedBlogs = document.getElementById("published-blogs");
    const toggleNextBtn = document.getElementById("toggle-next-btn");
    const togglePrevBtn = document.createElement("button");

    console.log("DOM elements loaded");

    // Setup the Previous button
    togglePrevBtn.textContent = "Previous Blog";
    togglePrevBtn.style.marginRight = "10px";
    togglePrevBtn.disabled = true;
    togglePrevBtn.addEventListener("click", () => {
        console.log("Previous button clicked");
        if (blogs.length === 0) return;
        currentIndex = (currentIndex - 1 + blogs.length) % blogs.length;
        displayBlog(currentIndex);
    });

    // Add the "Previous Blog" button before the "Next Blog" button
    const blogSection = document.getElementById("blogpost");
    blogSection.insertBefore(togglePrevBtn, toggleNextBtn);

    console.log("Previous button added to DOM");

    // Save blogs to LocalStorage
    function saveToLocalStorage() {
        localStorage.setItem("blogs", JSON.stringify(blogs));
        console.log("Blogs saved to LocalStorage");
    }

    // Handle image preview
    blogImageUpload.addEventListener("change", () => {
        console.log("Image upload changed");
        const file = blogImageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                imagePreview.src = reader.result;
                imagePreview.style.display = "block";
                console.log("Image preview updated");
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = "none";
        }
    });

    // Publish a new blog
    publishBtn.addEventListener("click", () => {
        console.log("Publish button clicked");
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
        console.log("Displaying blog at index", index);
        publishedBlogs.innerHTML = ""; // Clear previous content

        if (blogs.length === 0) {
            publishedBlogs.innerHTML = "<p>No blogs available. Write one to get started!</p>";
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

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteBlog(index));
        blogDiv.appendChild(deleteBtn);

        publishedBlogs.appendChild(blogDiv);

        // Disable Previous/Next buttons if at the edges
        togglePrevBtn.disabled = index === 0;
        toggleNextBtn.disabled = index === blogs.length - 1;
    }

    // Navigate to the next blog
    toggleNextBtn.addEventListener("click", () => {
        console.log("Next button clicked");
        if (blogs.length === 0) return;
        currentIndex = (currentIndex + 1) % blogs.length;
        displayBlog(currentIndex);
    });

    // Delete a blog
    function deleteBlog(index) {
        console.log("Deleting blog at index", index);
        blogs.splice(index, 1);
        saveToLocalStorage();

        if (currentIndex >= blogs.length) {
            currentIndex = blogs.length - 1; // Prevent out-of-bounds index
        }

        displayBlog(currentIndex);
        alert("Blog deleted successfully!");
    }

    // Initialize: Load blogs from LocalStorage on page load
    if (blogs.length > 0) {
        displayBlog(currentIndex);
    } else {
        publishedBlogs.innerHTML = "<p>No blogs available. Write one to get started!</p>";
    }
});
