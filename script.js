// Example array of blog posts
let blogPosts = [
  { title: "Blog Post 1", content: "This is the first blog post content.", photo: "", youtube: "", isOwner: true, likes: 0, shares: 0 },
  { title: "Blog Post 2", content: "This is the second blog post content.", photo: "", youtube: "", isOwner: true, likes: 0, shares: 0 },
  { title: "Blog Post 3", content: "This is the third blog post content.", photo: "", youtube: "", isOwner: true, likes: 0, shares: 0 },
];

// Current index for the blog posts
let currentPostIndex = 0;

// Set this to true for viewer mode, false for edit mode
let readOnlyMode = false;

// Function to load the post based on the current index
function loadPost(index) {
  const postTitleElement = document.getElementById("postTitle");
  const postContentElement = document.getElementById("postContent");
  const photoUploadElement = document.getElementById("photoUpload");
  const youtubeEmbedElement = document.getElementById("youtubeEmbed");
  const errorMessageElement = document.getElementById("errorMessage");
  const postImageElement = document.getElementById("postImage");

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

    // Display the uploaded image if it exists
    if (post.photo) {
      postImageElement.src = post.photo;
      postImageElement.style.display = "block";
    } else {
      postImageElement.style.display = "none";
    }

    // Show or hide owner buttons based on isOwner property
    const ownerButtons = document.querySelectorAll(".owner-buttons");
    ownerButtons.forEach(button => {
      button.style.display = post.isOwner ? "inline-block" : "none";
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
  const postImageElement = document.getElementById("postImage");

  const post = blogPosts[currentPostIndex];
  post.title = postTitleElement.innerText;
  post.content = postContentElement.value;
  post.photo = postImageElement.src;
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
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.content)}" target="_blank" class="share-button"><i class="fab fa-linkedin"></i> LinkedIn</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.content)}" target="_blank" class="share-button"><i class="fab fa-facebook"></i> Facebook</a>
      <a href="https://wordpress.com/wp-admin/press-this.php?u=${encodeURIComponent(post.content)}" target="_blank" class="share-button"><i class="fab fa-wordpress"></i> WordPress</a>
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
  const postContainer = document.getElementById("postContainer");
  const originalContent = document.body.innerHTML;
  const printContent = postContainer.innerHTML;

  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
  loadPost(currentPostIndex);
}

// Load the first post on initial page load
document.addEventListener("DOMContentLoaded", function() {
  // Load blog posts from localStorage if available
  const savedPosts = localStorage.getItem("blogPosts");
  if (savedPosts) {
    blogPosts = JSON.parse(savedPosts);
  }

  loadPost(currentPostIndex);

  // Load About Us content from localStorage
  const savedAboutUsContent = localStorage.getItem("aboutUsContent");
  if (savedAboutUsContent) {
    document.getElementById("aboutUsText").value = savedAboutUsContent;
  }

  // Event listener for the "Next Blog" button
  document.getElementById("nextButton").addEventListener("click", function() {
    // Move to the next post (loop back to the first post if at the end)
    currentPostIndex = (currentPostIndex + 1) % blogPosts.length;
    loadPost(currentPostIndex);
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
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const postImageElement = document.getElementById("postImage");
        postImageElement.src = e.target.result;
        postImageElement.style.display = "block";

        // Save the image data to the current post
        blogPosts[currentPostIndex].photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Event listener for toggling read-only mode
  document.getElementById("toggleReadOnlyButton").addEventListener("click", toggleReadOnlyMode);
});
