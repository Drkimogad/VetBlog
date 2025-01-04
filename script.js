document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('postContainer');
    const postForm = document.getElementById('postForm');
    const titleInput = document.getElementById('titleInput');
    const contentInput = document.getElementById('contentInput');
    const nextButton = document.getElementById('nextButton');
    const postsList = document.getElementById('postsList');
    
    // Function to create a new post
    const createPost = (title, content) => {
        const postElement = document.createElement('div');
        postElement.classList.add('postPreview');
        postElement.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
            <div class="post-buttons">
                <button class="printButton">Print</button>
                <button class="editButton">Edit</button>
            </div>
        `;
        
        // Add functionality for print button
        const printButton = postElement.querySelector('.printButton');
        printButton.addEventListener('click', () => {
            window.print();
        });

        // Add functionality for edit button
        const editButton = postElement.querySelector('.editButton');
        editButton.addEventListener('click', () => {
            titleInput.value = title;
            contentInput.value = content;
            postContainer.classList.add('hidden');
            nextButton.classList.remove('hidden');
        });

        // Append the new post to the list of posts
        postsList.appendChild(postElement);
    };

    // Handle form submission to create a new post
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = titleInput.value;
        const content = contentInput.value;
        
        if (title && content) {
            createPost(title, content);
            titleInput.value = '';
            contentInput.value = '';
        }
    });

    // Handle the "Next Blog" button functionality
    nextButton.addEventListener('click', () => {
        postContainer.classList.remove('hidden');
        nextButton.classList.add('hidden');
    });
});
