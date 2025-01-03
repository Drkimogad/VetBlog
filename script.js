// Example array of blog posts
const blogPosts = [
  { title: "Blog Post 1", content: "This is the first blog post content.", photo: "", youtube: "", isOwner: true, likes: 0, shares: 0 },
  { title: "Blog Post 2", content: "This is the second blog post content.", photo: "", youtube: "", isOwner: true, likes: 0, shares: 0 },
  { title: "Blog Post 3", content: "This is the third blog post content.", photo: "", youtube: "", isOwner: true, likes: 0, shares: 0 },
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
    photoUploadElement.value = post.photo;
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
  const postImageElement = document.getElementById("postImage");

  const post = blogPosts[currentPostIndex];
  post.title = postTitleElement.innerText;
  post.content = postContentElement.value;
  post.photo = photoUploadElement.value;
  post.youtube = youtubeEmbedElement.value;

  postTitleElement.contentEditable = false;
  postContentElement.readOnly = true;
  postContentElement.style.border = "none";

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
  const shareOptions = `
    <div>
      <button onclick="shareToLinkedIn()">LinkedIn</button>
      <button onclick="shareToFacebook()">Facebook</button>
      <button onclick="shareToWordPress()">WordPress</button>
    </div>
  `;
  document.getElementById("errorMessage").innerHTML = shareOptions;
}

// Function to share to LinkedIn
function shareToLinkedIn() {
  alert("Shared to LinkedIn!");
  blogPosts[currentPostIndex].shares += 1;
}

// Function to share to Facebook
function shareToFacebook() {
  alert("Shared to Facebook!");
  blogPosts[currentPostIndex].shares += 1;
}

// Function to share to WordPress
function shareToWordPress() {
  alert("Shared to WordPress!");
  blogPosts[currentPostIndex].shares += 1;
}

// Function to like the post
function likePost() {
  blogPosts[currentPostIndex].likes += 1;
  alert(`Post liked! Total likes: ${blogPosts[currentPostIndex].likes}`);
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
  document.getElementById("printButton").addEventListener("click", function() {
    window.print();
  });

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
});
