// Example array of blog posts
const blogPosts = [
  { title: "Blog Post 1", content: "This is the first blog post content.", photo: "", youtube: "", isOwner: true, likes: 0 },
  { title: "Blog Post 2", content: "This is the second blog post content.", photo: "", youtube: "", isOwner: false, likes: 0 },
  { title: "Blog Post 3", content: "This is the third blog post content.", photo: "", youtube: "", isOwner: true, likes: 0 },
];

// Current index for the blog posts
let currentPostIndex = 0;

// Function to load the post based on the current index
function loadPost(index) {
  const postTitleElement = document.getElementById("postTitle");
  const postContentElement = document.getElementById("postContent");
  const photoUploadElement = document.getElementById("photoUpload");
  const youtubeEmbedElement = document.getElementById("youtubeEmbed");
  const errorMessageElement = document.getElementById("errorMessage");

  // Reset error message if any
  if (errorMessageElement) {
    errorMessageElement.textContent = "";
  }

  // Validate the index
  if (index >= 0 && index < blogPosts.length) {
    const post = blogPosts[index];
    postTitleElement.innerText = post.title;
    postContentElement.value = post.content;
    photoUploadElement.value = post.photo;
    youtubeEmbedElement.value = post.youtube;

    // Show or hide owner buttons based on isOwner property
    const ownerButtons = document.querySelectorAll(".owner-buttons");
    ownerButtons.forEach(button => {
      button.style.display = post.isOwner ? "inline-block" : "none";
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
  const postTitleElement = document.getElementById("postTitle");
  const postContentElement = document.getElementById("postContent");
  postTitleElement.contentEditable = true;
  postContentElement.readOnly = false;
  postContentElement.style.border = "1px solid #ccc";
}

// Function to save the edited post
function savePost() {
  const postTitleElement = document.getElementById("postTitle");
  const postContentElement = document.getElementById("postContent");
  const photoUploadElement = document.getElementById("photoUpload");
  const youtubeEmbedElement = document.getElementById("youtubeEmbed");

  const post = blogPosts[currentPostIndex];
  post.title = postTitleElement.innerText;
  post.content = postContentElement.value;
  post.photo = photoUploadElement.value;
  post.youtube = youtubeEmbedElement.value;

  postTitleElement.contentEditable = false;
  postContentElement.readOnly = true;
  postContentElement.style.border = "none";

  alert("Post saved!");
}

// Function to delete the current post
function deletePost() {
  blogPosts.splice(currentPostIndex, 1);
  if (currentPostIndex >= blogPosts.length) {
    currentPostIndex = 0;
  }
  loadPost(currentPostIndex);
  alert("Post deleted!");
}

// Function to share the post
function sharePost() {
  alert("Post shared!");
}

// Function to like the post
function likePost() {
  blogPosts[currentPostIndex].likes += 1;
  alert(`Post liked! Total likes: ${blogPosts[currentPostIndex].likes}`);
}

// Load the first post on initial page load
document.addEventListener("DOMContentLoaded", function() {
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
  document.getElementById("printButton").addEventListener("click", function() {
    window.print();
  });
});
