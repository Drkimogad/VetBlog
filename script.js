// Example array of blog posts
let blogPosts = new Array(50).fill(null).map((_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  content: `This is the content of blog post ${i + 1}.`,
  photos: [],
  youtube: "",
  isOwner: true,
  likes: 0,
  shares: 0
}));

// Current index for the blog posts
let currentPostIndex = 0;

// Set this to true for viewer mode, false for edit mode
let readOnlyMode = false;

// Function to load all posts in the opening view
function loadAllPosts() {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = ""; // Clear previous posts

  blogPosts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.className = "postPreview";
    postElement.innerHTML = `
      <h3 onclick="openPost(${index})">${post.title}</h3>
      <p>${post.content.substring(0, 100)}...</p>
    `;
    postsContainer.appendChild(postElement);
  });
}

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

// Function to enable editing
function enableEditing() {
  readOnlyMode = false;
  loadPost(currentPostIndex);
}

// Function to save the edited post
function savePost() {
  const postTitleElement = document.getElementById("postTitle");
  const postContentElement = document.getElementById("postContent");
  const youtubeEmbedElement = document.getElementById("youtubeEmbed");

  const post = blogPosts[currentPostIndex];
  post.title = postTitleElement.innerText;
  post.content = postContentElement.value;
  post.youtube = youtubeEmbedElement.value;

  // Save the post to localStorage
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

  alert("Post saved!");
}

// Function to delete the current post
function deletePost() {
  blogPosts.splice(currentPostIndex, 1);
  if (currentPostIndex >= blogPosts.length) {
    currentPostIndex = 0;
  }

  // Save the updated posts to localStorage
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

  loadPost(currentPostIndex);
  alert("Post deleted!");
}

// Function to share the post
function sharePost() {
  const post = blogPosts[currentPostIndex];
  const shareOptions = `
    <div>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-button"><i class="fab fa-linkedin"></i> LinkedIn</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-button"><i class="fab fa-facebook"></i> Facebook</a>
      <a href="https://wordpress.com/wp-admin/press-this.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-button"><i class="fab fa-wordpress"></i> WordPress</a>
    </div>
  `;
  document.getElementById("errorMessage").innerHTML = shareOptions;
}

// Function to like the post
function likePost() {
  blogPosts[currentPostIndex].likes += 1;
  alert(`Post liked! Total likes: ${blogPosts[currentPostIndex].likes}`);
}

// Function to toggle read-only mode
function toggleReadOnlyMode() {
  readOnlyMode = !readOnlyMode;  // Toggle the flag
  loadPost(currentPostIndex);    // Reload the current post with the new mode
}

// Function to print the current post
function printPost() {
  const originalContent = document.body.innerHTML;
  const printContent = `
    <div>
      ${document.getElementById("postTitle").outerHTML}
      ${document.getElementById("postContent").outerHTML}
      ${document.getElementById("postImagesContainer").outerHTML}
      ${document.getElementById("youtubeEmbed").outerHTML}
    </div>
  `;

  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
  loadPost(currentPostIndex);
}

// Function to open a blog post in the same page
function openPost(index) {
  document.getElementById("postContainer").style.display = "block";
  loadPost(index);
  currentPostIndex = index;
}

// Load the first post on initial page load
document.addEventListener("DOMContentLoaded", function() {
  // Load blog posts from localStorage if available
  const savedPosts = localStorage.getItem("blogPosts");
  if (savedPosts) {
    blogPosts = JSON.parse(savedPosts);
  }

  loadAllPosts();

  // Load About Us content from localStorage
  const savedAboutUsContent = localStorage.getItem("aboutUsContent");
  if (savedAboutUsContent) {
    document.getElementById("aboutUsText").value = savedAboutUsContent;
  }

  // Hide the post container initially
  document.getElementById("postContainer").style.display = "none";

  // Event listener for the "Next Blog" button
  document.getElementById("nextButton").addEventListener("click", function() {
    // Move to the next post (loop back to the first post if at the end)
    currentPostIndex = (currentPostIndex + 1) % blogPosts.length;
    openPost(currentPostIndex);
  });

  // Event listener for the "Save" button in the About Us section
  document.getElementById("saveAboutUsButton").addEventListener("click", function() {
    const aboutUsContent = document.getElementById("aboutUsText").value;
    localStorage.setItem("aboutUsContent", aboutUsContent);
    alert("About Us content saved!");
  });

  // Event listeners for the blog post buttons
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
});
