document.addEventListener("DOMContentLoaded", () => {
    const publishBtn = document.getElementById("publish-btn");
    const toggleNextBtn = document.getElementById("toggle-next-btn");
    const blogTextarea = document.getElementById("blog-textarea");
    const blogImageUpload = document.getElementById("blog-image-upload");
    const publishedBlogs = document.getElementById("published-blogs");

    let blogs = [];
    let currentBlogIndex = 0;

    // Publish Blog Functionality
    publishBtn.addEventListener("click", () => {
        const content = blogTextarea.value.trim();
        const imageFile = blogImageUpload.files[0];

        if (content === "") {
            alert("Blog content cannot be empty!");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const blog = {
                content,
                image: e.target.result || null,
            };
            blogs.push(blog);
            displayBlog(blog);
            blogTextarea.value = "";
            blogImageUpload.value = "";
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            const blog = { content, image: null };
            blogs.push(blog);
            displayBlog(blog);
            blogTextarea.value = "";
            blogImageUpload.value = "";
        }
    });

    // Display Blog
    const displayBlog = (blog) => {
        const blogPost = document.createElement("div");
        blogPost.className = "blog-post";

        const content = document.createElement("p");
        content.textContent = blog.content;

        const image = document.createElement("img");
        if (blog.image) {
            image.src = blog.image;
            image.style.maxWidth = "100%";
            image.style.height = "auto";
        }

        const actions = document.createElement("div");
        actions.className = "blog-actions";

        const likeBtn = document.createElement("button");
        likeBtn.textContent = "Like";
        likeBtn.className = "like-btn";
        actions.appendChild(likeBtn);

        const shareBtn = document.createElement("button");
        shareBtn.textContent = "Share";
        shareBtn.className = "share-btn";
        actions.appendChild(shareBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => {
            publishedBlogs.removeChild(blogPost);
            blogs = blogs.filter(b => b !== blog);
        });
        actions.appendChild(deleteBtn);

        blogPost.appendChild(content);
        if (blog.image) blogPost.appendChild(image);
        blogPost.appendChild(actions);

        publishedBlogs.appendChild(blogPost);
    };

    // Toggle to Next Blog
    toggleNextBtn.addEventListener("click", () => {
        if (blogs.length === 0) {
            alert("No blogs available!");
            return;
        }

        currentBlogIndex = (currentBlogIndex + 1) % blogs.length;
        const blog = blogs[currentBlogIndex];
        publishedBlogs.innerHTML = "";
        displayBlog(blog);
    });
});
