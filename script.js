// Load the blog posts from local storage or initialize with default posts
let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [
  { title: "Post 1", content: "Content 1", youtube: "https://youtube.com", photos: [], isOwner: true, published: true },
  { title: "Post 2", content: "Content 2", youtube: "https://youtube.com", photos: [], isOwner: false, published: false }
];

let currentPostIndex = 0;
let readOnlyMode = true;

// Load the post content based on the current index
function loadPost(index) {
  const postTitleElement = document.getElementById("postTitle");
  const postContentElement = document.getElementById("postContent");
  const photoUploadElement = document.getElementById("photoUpload");
  const youtubeEmbedElement = document.getElementById("youtubeEmbed");
  const errorMessageElement = document.getElementById("errorMessage");
  const postImagesContainer = document.getElementById("postImagesContainer");

  if (errorMessageElement) {
    errorMessageElement.textContent = "";
  }

  if (index >= 0 && index < blogPosts.length) {
    const post = blogPosts[index];
    if (readOnlyMode && !post.published) {
      errorMessageElement.textContent = "This post is not published.";
      return;
    }

    postTitleElement.innerText = post.title;
    postContentElement.value = post.content;
    youtubeEmbedElement.value = post.youtube;

    postImagesContainer.innerHTML = "";
    if (post.photos.length > 0) {
      post.photos.forEach(photo => {
        const imgElement = document.createElement("img");
        imgElement.src = photo;
        imgElement.style.maxWidth = "100%";
        postImagesContainer.appendChild(imgElement);
      });
    }

    const ownerButtons = document.querySelectorAll(".owner-buttons");
    ownerButtons.forEach(button => {
      button.style.display = readOnlyMode ? "none" : post.isOwner ? "inline-block" : "none";
    });

    postTitleElement.contentEditable = !readOnlyMode;
    postContentElement.readOnly = readOnlyMode;
    youtubeEmbedElement.readOnly = readOnlyMode;
    photoUploadElement.style.display = readOnlyMode ? "none" : "block";

    // Adjust styling based on read-only mode
    if (readOnlyMode) {
      postContentElement.style.border = "none";
      postContentElement.style.backgroundColor = "#f5f5f5";
    } else {
      postContentElement.style.border = "1px solid #ccc";
      postContentElement.style.backgroundColor = "#fff";
    }

    document.getElementById("toggleReadOnlyButton").style.display = "block";
    document.getElementById("saveAboutUsButton").style.display = readOnlyMode ? "none" : "block";
    document.getElementById("nextButton").style.display = "block";

    const interactiveButtons = document.querySelectorAll("#likeButton, #printButton");
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

// Open the post in a new window for printing
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
  postWindow.document.write('<button onclick="window.print()">Print</button>');
}

// Event listener for the Next Blog button
document.getElementById("nextButton").addEventListener("click", function() {
  currentPostIndex = (currentPostIndex + 1) % blogPosts.length;
  loadPost(currentPostIndex);
});

// Event listener for the Toggle Read-Only Mode button
document.getElementById("toggleReadOnlyButton").addEventListener("click", toggleReadOnlyMode);

// Toggle read-only mode
function toggleReadOnlyMode() {
  readOnlyMode = !readOnlyMode;
  loadPost(currentPostIndex);
}

// Load posts for viewers
function loadPostsForViewers() {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = '';

  blogPosts.forEach((post, index) => {
    if (post.published || !readOnlyMode) {
      const postElement = document.createElement("div");
      postElement.classList.add("post-preview");
      postElement.innerHTML = `
        <h3 onclick="openPostInNewWindow(${index})">${post.title}</h3>
        <p>${post.content.slice(0, 100)}...</p>
        <button class="owner-buttons" onclick="deletePost(${index})" style="display: ${readOnlyMode ? 'none' : 'inline-block'};">Delete</button>
        <button class="owner-buttons" onclick="publishPost(${index})" style="display: ${readOnlyMode ? 'none' : 'inline-block'};">Publish</button>
      `;
      postsContainer.appendChild(postElement);
    }
  });
}

// Event listeners for buttons and file upload
document.addEventListener("DOMContentLoaded", function() {
  loadPost(currentPostIndex);

  document.getElementById("editButton").addEventListener("click", enableEditing);
  document.getElementById("deleteButton").addEventListener("click", () => deletePost(currentPostIndex));
  document.getElementById("publishButton").addEventListener("click", () => publishPost(currentPostIndex));
  document.getElementById("likeButton").addEventListener("click", likePost);
  document.getElementById("printButton").addEventListener("click", printPost);

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

  document.querySelectorAll(".share-button").forEach(button => {
    button.addEventListener("click", sharePost);
  });

  if (readOnlyMode) {
    loadPostsForViewers();
  }
});

// Enable editing mode
function enableEditing() {
  readOnlyMode = false;
  loadPost(currentPostIndex);
}

// Delete a post
function deletePost(index) {
  if (confirm("Are you sure you want to delete this post?")) {
    blogPosts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    currentPostIndex = 0; // Reset to the first post or handle accordingly
    loadPost(currentPostIndex);
    loadPostsForViewers();
  }
}

// Publish a post
function publishPost(index) {
  blogPosts[index].published = true;
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  loadPost(index);
  loadPostsForViewers();
}

// Save the current post
function savePost() {
  const post = blogPosts[currentPostIndex];
  post.title = document.getElementById("postTitle").innerText;
  post.content = document.getElementById("postContent").value;
  post.youtube = document.getElementById("youtubeEmbed").value;

  localStorage.setItem('blogPosts', JSON.stringify(blogPosts)); // Save to local storage
  alert("Post saved successfully!");
}

// Share the current post
function sharePost(event) {
  const post = blogPosts[currentPostIndex];
  const postUrl = encodeURIComponent(window.location.href);
  const postTitle = encodeURIComponent(post.title);
  const postContent = encodeURIComponent(post.content);
  const target = event.target;

  let shareUrl = '';

  if (target.title === "Share on Facebook") {
    shareUrl = `https://www.facebook.com/sharer.php?u=${postUrl}`;
  } else if (target.title === "Share on WordPress") {
    shareUrl = `https://wordpress.com/post?title=${postTitle}&content=${postContent}`;
  } else if (target.title === "Share on LinkedIn") {
    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank');
  }
}

// Like the current post
function likePost() {
  alert('Post liked!');
}

// Print the current post
function printPost() {
  openPostInNewWindow(currentPostIndex);
}

// Save the About Us content
document.getElementById("saveAboutUsButton").addEventListener("click", function() {
  const aboutUsContent = document.getElementById("aboutUsContent").value;
  localStorage.setItem('aboutUsContent', aboutUsContent);
  alert("About Us content saved successfully!");
});

// Load About Us content from local storage
document.addEventListener("DOMContentLoaded", function() {
  const aboutUsContent = localStorage.getItem('aboutUsContent');
  if (aboutUsContent) {
    document.getElementById("aboutUsContent").value = aboutUsContent;
  }
});
