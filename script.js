        // Display a specific blog by index
        function displayBlog(index) {
            publishedBlogs.innerHTML = ""; // Clear previous content

            if (blogs.length === 0) {
                publishedBlogs.innerHTML = "<p>No blogs available</p>";
                return;
            }

            const blog = blogs[index];
            const blogDiv = document.createElement("div");
            blogDiv.className = "blog-item";

            const blogContent = document.createElement("p");
            blogContent.textContent = blog.text;
            blogDiv.appendChild(blogContent);

            if (blog.image) {
                const blogImage = document.createElement("img");
                blogImage.src = blog.image;
                blogImage.alt = "Blog Image";
                blogImage.style.maxWidth = "100%";
                blogDiv.appendChild(blogImage);
            }

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteBlog(index));
            blogDiv.appendChild(deleteBtn);

            publishedBlogs.appendChild(blogDiv);
        }

        // Move to the next blog
        toggleNextBtn.addEventListener("click", () => {
            if (blogs.length === 0) {
                alert("No blogs to show.");
                return;
            }

            currentIndex = (currentIndex + 1) % blogs.length; // Loop back to the first blog
            displayBlog(currentIndex);
        });

        // Delete a specific blog
        function deleteBlog(index) {
            blogs.splice(index, 1); // Remove the blog from the array

            if (currentIndex >= blogs.length) {
                currentIndex = blogs.length - 1; // Adjust index to show the last blog
            }

            displayBlog(currentIndex);
            alert("Blog deleted successfully!");
        }

        // Initialize with no blogs
        displayBlog(currentIndex);
    });
