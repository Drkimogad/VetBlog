document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded successfully.");

    // About Us section
    const aboutTextarea = document.getElementById('about-textarea');
    const saveAboutBtn = document.getElementById('save-about-btn');
    const aboutContent = document.getElementById('about-content');

    saveAboutBtn.addEventListener('click', () => {
        const aboutText = aboutTextarea.value.trim();
        if (aboutText) {
            aboutContent.textContent = aboutText;
            console.log("About Us content saved:", aboutText);
        } else {
            console.warn("About Us textarea is empty.");
        }
    });

    // Blog post section
    const blogTextarea = document.getElementById('blog-textarea');
    const publishBtn = document.getElementById('publish-btn');
    const blogImageUpload = document.getElementById('blog-image-upload');
    const imagePreview = document.getElementById('image-preview');
    const publishedBlogs = document.getElementById('published-blogs');
    const toggleNextBtn = document.getElementById('toggle-next-btn');

    blogImageUpload.addEventListener('change', () => {
        const file = blogImageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                imagePreview.src = reader.result;
                imagePreview.style.display = 'block';
                console.log("Image preview updated.");
            };
            reader.onerror = () => console.error("Error reading the uploaded file.");
            reader.readAsDataURL(file);
        } else {
            console.warn("No file selected for upload.");
        }
    });

    publishBtn.addEventListener('click', () => {
        const blogText = blogTextarea.value.trim();
        const blogImage = imagePreview.src;

        if (blogText || blogImage) {
            const blogPost = document.createElement('div');
            blogPost.className = 'blog-post';

            if (blogText) {
                const paragraph = document.createElement('p');
                paragraph.textContent = blogText;
                blogPost.appendChild(paragraph);
                console.log("Blog text added:", blogText);
            }

            if (blogImage) {
                const image = document.createElement('img');
                image.src = blogImage;
                blogPost.appendChild(image);
                console.log("Blog image added.");
            }

            publishedBlogs.appendChild(blogPost);
            console.log("Blog post published.");
            blogTextarea.value = '';
            imagePreview.style.display = 'none';
        } else {
            console.warn("Cannot publish empty blog post.");
        }
    });

    toggleNextBtn.addEventListener('click', () => {
        console.log("Next Blog button clicked.");
        alert("This feature is under development.");
    });
});
