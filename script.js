document.addEventListener('DOMContentLoaded', function() {
    const aboutTextarea = document.getElementById('about-textarea');
    const saveAboutBtn = document.getElementById('save-about-btn');
    const aboutContent = document.getElementById('about-content');
    const blogTextarea = document.getElementById('blog-textarea');
    const blogImageUpload = document.getElementById('blog-image-upload');
    const imagePreview = document.getElementById('image-preview');
    const publishBtn = document.getElementById('publish-btn');
    const publishedBlogs = document.getElementById('published-blogs');
    const toggleNextBtn = document.getElementById('toggle-next-btn');

    // Save "About Us" content
    saveAboutBtn.addEventListener('click', function() {
        const aboutText = aboutTextarea.value;
        aboutContent.innerHTML = aboutText;
        aboutTextarea.value = '';
    });

    // Display uploaded image
    blogImageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Publish a blog post
    publishBtn.addEventListener('click', function() {
        const blogText = blogTextarea.value;
        const blogImageSrc = imagePreview.src;

        if (blogText) {
            const blogPost = document.createElement('div');
            blogPost.className = 'blog-post';

            const blogContent = document.createElement('p');
            blogContent.innerText = blogText;
            blogPost.appendChild(blogContent);

            if (blogImageSrc) {
                const blogImage = document.createElement('img');
                blogImage.src = blogImageSrc;
                blogPost.appendChild(blogImage);
            }

            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', function() {
                publishedBlogs.removeChild(blogPost);
            });
            blogPost.appendChild(deleteBtn);

            publishedBlogs.appendChild(blogPost);

            // Clear inputs
            blogTextarea.value = '';
            blogImageUpload.value = '';
            imagePreview.style.display = 'none';
            imagePreview.src = '';
        }
    });

    // Toggle to the next blog post
    toggleNextBtn.addEventListener('click', function() {
        const blogPosts = publishedBlogs.getElementsByClassName('blog-post');
        if (blogPosts.length > 0) {
            publishedBlogs.appendChild(blogPosts[0]);
        }
    });
});
