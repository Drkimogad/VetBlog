// Example array of blog posts
const blogPosts = [
  { title: "Blog Post 1", content: "This is the first blog post content." },
  { title: "Blog Post 2", content: "This is the second blog post content." },
  { title: "Blog Post 3", content: "This is the third blog post content." },
];

// Current index for the blog posts
let currentPostIndex = 0;

// Function to load the post based on the current index
function loadPost(index) {
  const postTitleElement = document.getElementById("postTitle");
  const postContentElement = document.getElementById("postContent");
  const errorMessageElement = document.getElementById("errorMessage");

  // Reset error message if any
  if (errorMessageElement) {
    errorMessageElement.textContent = "";
  }

  // Validate the index
  if (index >= 0 && index < blogPosts.length) {
    const post = blogPosts[index];
    postTitleElement.innerText = post.title;
    postContentElement.innerText = post.content;
  } else {
    if (errorMessageElement) {
      errorMessageElement.textContent = "Error: Invalid blog post.";
    }
    console.error("Invalid index:", index);
  }
}

// Load the first post on initial page load
document.addEventListener("DOMContentLoaded", function() {
  loadPost(currentPostIndex);
});

// Event listener for the "Next Blog" button
document.getElementById("nextButton").addEventListener("click", function() {
  // Move to the next post (loop back to the first post if at the end)
  currentPostIndex = (currentPostIndex + 1) % blogPosts.length;
  loadPost(currentPostIndex);
});
