document.addEventListener("DOMContentLoaded", () => {
    const blogs = [];
    let currentIndex = 0;

    const blogTextarea = document.getElementById("blog-textarea");
    const blogImageUpload = document.getElementById("blog-image-upload");
    const imagePreview = document.getElementById("image-preview");
    const publishBtn = document.getElementById("publish-btn");
    const publishedBlogs = document.getElementById("published-blogs");
    const toggleNextBtn = document.getElementById("toggle-next-btn");

    console.log("DOM fully loaded!");

    // Handle image preview
    blogImageUpload.addEventListener("change", () => {
        console.log("Image upload changed");
        const file = blogImageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                console.log("Image loaded:", reader.result);
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
        console.log("Publish button clicked");
        const text = blogTextarea.value.trim();
        const image = imagePreview.src;

        if (!text) {
            alert("Please write something for the blog.");
            return;
        }

        blogs.push({ text, image });
        console.log("Blogs array:", blogs);

        blogTextarea.value = "";
        blogImageUpload.value = "";
        imagePreview.style.display = "none";

        displayBlog(blogs.length - 1); // Show the newly added blog
    });

    // Display a specific blog by index
    function displayBlog(index) {
        console.log("Displaying blog at index:", index);
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

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteBlog(index));
        blogDiv.appendChild(deleteBtn);

        publishedBlogs.appendChild(blogDiv);
    }

    // Navigate to the next blog
    toggleNextBtn.addEventListener("click", () => {
        console.log("Next button clicked");
        if (blogs.length === 0) {
            alert("No blogs to show.");
            return;
        }

        currentIndex = (currentIndex + 1) % blogs.length; // Cycle back to the first blog
        displayBlog(currentIndex);
    });

    // Delete a blog
    function deleteBlog(index) {
        console.log("Deleting blog at index:", index);
        blogs.splice(index, 1);

        if (currentIndex >= blogs.length) {
            currentIndex = blogs.length - 1; // Prevent out-of-bounds index
        }

        displayBlog(currentIndex);
        alert("Blog deleted successfully!");
    }
});
