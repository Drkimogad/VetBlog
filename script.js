document.addEventListener("DOMContentLoaded", () => {
    const blogTextarea = document.getElementById("blog-textarea");
    const blogImageUpload = document.getElementById("blog-image-upload");
    const imagePreview = document.getElementById("image-preview");
    const publishBtn = document.getElementById("publish-btn");
    const publishedBlogs = document.getElementById("published-blogs");
    const toggleNextBtn = document.getElementById("toggle-next-btn");
    let currentIndex = 0;

    // Array to store blogs
    const blogs = [];

    // Handle image preview
    blogImageUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    // Publish button functionality
    publishBtn.addEventListener("click", () => {
        const blogText = blogTextarea.value.trim();
        const blogImageSrc = imagePreview.src;

        if (!blogText) {
            alert("Please write something for the blog.");
            return;
        }

        const blog = { text: blogText, image: blogImageSrc };
        blogs.push(blog);

        displayBlog(currentIndex);
        blogTextarea.value = "";
        imagePreview.src = "";
        imagePreview.style.display = "none";
        blogImageUpload.value = "";
        alert("Blog published successfully!");
    });

    // Display the current blog
    function displayBlog(index) {
        publishedBlogs.innerHTML = "";
        if (blogs[index]) {
            const blogDiv = document.createElement("div");
            blogDiv.className = "blog-item";

            const blogContent = document.createElement("p");
            blogContent.textContent = blogs[index].text;
            blogDiv.appendChild(blogContent);

            if (blogs[index].image) {
                const blogImage = document.createElement("img");
                blogImage.src = blogs[index].image;
                blogImage.alt = "Blog Image";
                blogImage.style.maxWidth = "100%";
                blogDiv.appendChild(blogImage);
            }

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteBlog(index));
            blogDiv.appendChild(deleteBtn);

            publishedBlogs.appendChild(blogDiv);
        } else {
            publishedBlogs.innerHTML = "<p>No blogs available</p>";
        }
    }

    // Next blog button functionality
    toggleNextBtn.addEventListener("click", () => {
        if (blogs.length === 0) {
            alert("No blogs to show.");
            return;
        }
        currentIndex = (currentIndex + 1) % blogs.length;
        displayBlog(currentIndex);
    });

    // Delete blog functionality
    function deleteBlog(index) {
        blogs.splice(index, 1);
        if (currentIndex >= blogs.length) {
            currentIndex = blogs.length - 1;
        }
        displayBlog(currentIndex);
        alert("Blog deleted successfully!");
    }
});
