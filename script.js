// Function to load the post based on the current index
function loadPost(index) {
  const postTitleElement = document.getElementById("postTitle");
  const postContentElement = document.getElementById("postContent");
  const photoUploadElement = document.getElementById("photoUpload");
  const youtubeEmbedElement = document.getElementById("youtubeEmbed");
  const errorMessageElement = document.getElementById("errorMessage");
  const postImagesContainer = document.getElementById("postImagesContainer");

  // Reset error message if any
  if (errorMessageElement) {
    errorMessageElement.textContent = "";
  }

  // Validate the index
  if (index >= 0 && index < blogPosts.length) {
    const post = blogPosts[index];
    postTitleElement.innerText = post.title;
    postContentElement.value = post.content;
    youtubeEmbedElement.value = post.youtube;

    // Display uploaded images if they exist
    postImagesContainer.innerHTML = "";
    if (post.photos.length > 0) {
      post.photos.forEach(photo => {
        const imgElement = document.createElement("img");
        imgElement.src = photo;
        imgElement.style.maxWidth = "100%";
        postImagesContainer.appendChild(imgElement);
      });
    }

    // Show or hide owner buttons based on isOwner property
    const ownerButtons = document.querySelectorAll(".owner-buttons");
    ownerButtons.forEach(button => {
      button.style.display = readOnlyMode ? "none" : post.isOwner ? "inline-block" : "none";
    });

    // Toggle read-only mode
    postTitleElement.contentEditable = !readOnlyMode;
    postContentElement.readOnly = readOnlyMode;
    youtubeEmbedElement.readOnly = readOnlyMode;
    photoUploadElement.style.display = readOnlyMode ? "none" : "block";

    // Change the appearance of the content based on read-only mode
    if (readOnlyMode) {
      postContentElement.style.border = "none";
      postContentElement.style.backgroundColor = "#f5f5f5";
    } else {
      postContentElement.style.border = "1px solid #ccc";
      postContentElement.style.backgroundColor = "#fff";
    }

    // Hide toggle button and owner buttons in read-only mode
    document.getElementById("toggleReadOnlyButton").style.display = readOnlyMode ? "none" : "block";
    document.getElementById("saveAboutUsButton").style.display = readOnlyMode ? "none" : "block";

    // Ensure "Next Blog" button works in read-only mode
    document.getElementById("nextButton").style.display = readOnlyMode ? "block" : "none";

    // Ensure sharing, liking, and printing buttons are enabled in read-only mode
    const interactiveButtons = document.querySelectorAll("#shareButton, #likeButton, #printButton");
    interactiveButtons.forEach(button => {
      button.style.display = readOnlyMode ? "block" : "inline-block";
    });

  } else {
    if (errorMessageElement) {
      errorMessageElement.textContent = "Error: Invalid blog post.";
    }
    console.error("Invalid index:", index);
  }
}

// Function to open a blog post in a new window
function openPostInNewWindow(index) {
  const post = blogPosts[index];
  const postContent = `
    <h1>${post.title}</h1>
    <p>${post.content}</p>
    ${post.photos.map(photo => `<img src="${photo}" style="max-width: 100%"/>`).join('')}
    <p><a href="${post.youtube}" target="_blank">Watch on YouTube</a></p>
  `;
  
  const postWindow = window.open("", "PostWindow", "width=800,height=600");
  postWindow.document.write(postContent);
}

// Event listener for the "Next Blog" button
document.getElementById("nextButton").addEventListener("click", function() {
  // Move to the next post (loop back to the first post if at the end)
  currentPostIndex = (currentPostIndex + 1) % blogPosts.length;
  loadPost(currentPostIndex);
});

// Function to toggle read-only mode
function toggleReadOnlyMode() {
  readOnlyMode = !readOnlyMode;  // Toggle the flag
  loadPost(currentPostIndex);    // Reload the current post with the new mode
}

// Function to load existing posts for viewers to click and open
function loadPostsForViewers() {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = ''; // Clear the current content

  blogPosts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post-preview");
    postElement.innerHTML = `
      <h3 onclick="openPostInNewWindow(${index})">${post.title}</h3>
      <p>${post.content.slice(0, 100)}...</p>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Function to initialize the page
document.addEventListener("DOMContentLoaded", function() {
  // Load the first post on initial page load
  loadPost(currentPostIndex);

  // Event listeners for blog post buttons
  document.getElementById("editButton").addEventListener("click", enableEditing);
  document.getElementById("deleteButton").addEventListener("click", deletePost);
  document.getElementById("publishButton").addEventListener("click", savePost);
  document.getElementById("shareButton").addEventListener("click", sharePost);
  document.getElementById("likeButton").addEventListener("click", likePost);
  document.getElementById("printButton").addEventListener("click", printPost);

  // Event listener for photo upload
  document.getElementById("photoUpload").addEventListener("change", function(event) {
    const files = event.target.files;
    const post = blogPosts[currentPostIndex];

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = function(e) {
        post.photos.push(e.target.result);
        loadPost(currentPostIndex);
      };
      reader.readAsDataURL(file);
    }
  });

  // Event listener for toggling read-only mode
  document.getElementById("toggleReadOnlyButton").addEventListener("click", toggleReadOnlyMode);

  // Load posts for viewers
  if (readOnlyMode) {
    loadPostsForViewers();
  }
});

