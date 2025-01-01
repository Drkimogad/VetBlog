// Debugging logs to trace the flow of the code

// About Us Section Save Button
document.getElementById('save-about-btn').addEventListener('click', () => {
    const aboutText = document.getElementById('about-textarea').value;
    if (aboutText.trim() === '') {
        console.log('Error: About Us section is empty.');
    } else {
        document.getElementById('about-content').innerHTML = `<p>${aboutText}</p>`;
        console.log('About Us content saved:', aboutText);
    }
});

// Blog Post Section
const blogImageInput = document.getElementById('blog-image-upload');
const imagePreview = document.getElementById('image-preview');
const publishBtn = document.getElementById('publish-btn');

// Handle image preview
blogImageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.style.display = 'block';
            imagePreview.src = e.target.result;
            console.log('Image selected:', file.name);
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none';
        console.log('No image selected.');
    }
});

// Publish the blog post
publishBtn.addEventListener('click', () => {
    const blogContent = document.getElementById('blog-textarea').value;
    if (blogContent.trim() === '') {
        console.log('Error: Blog post content is empty.');
    } else {
        const blogPost = document.createElement('div');
        blogPost.classList.add('blog-post');
        blogPost.innerHTML = `<p>${blogContent}</p>`;
        if (imagePreview.style.display === 'block') {
            const imgElement = document.createElement('img');
            imgElement.src = imagePreview.src;
            blogPost.appendChild(imgElement);
            console.log('Image added to post.');
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            blogPost.remove();
            console.log('Blog post deleted.');
        });
        blogPost.appendChild(deleteBtn);
        document.getElementById('published-blogs').appendChild(blogPost);
        console.log('Blog post published:', blogContent);
        document.getElementById('blog-textarea').value = '';
        imagePreview.style.display = 'none';
    }
});

// Next Blog Button (Optional)
document.getElementById('toggle-next-btn').addEventListener('click', () => {
    console.log('Next blog post button clicked.');
});
