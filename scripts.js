let currentPostIndex = 0;

// Get blog posts from localStorage
const blogPosts = JSON.parse(localStorage.getItem("blogPosts"));

const titleElement = document.getElementById("post-title");
const contentElement = document.getElementById("post-content");
const youtubeElement = document.getElementById("youtube-video");
const nextButton = document.getElementById("next-blog-btn");

function loadPost(index) {
  const post = blogPosts[index];

  titleElement.textContent = post.title;
  contentElement.textContent = post.content;
  
  // If there's a YouTube video, embed it
  if (post.youtube) {
    youtubeElement.innerHTML = `<iframe width="560" height="315" src="${post.youtube}" frameborder="0" allowfullscreen></iframe>`;
  } else {
    youtubeElement.innerHTML = ""; // No video to display
  }
}

// Load the first blog post
loadPost(currentPostIndex);

// Add event listener for the "Next Blog" button
nextButton.addEventListener("click", () => {
  if (currentPostIndex < blogPosts.length - 1) {
    currentPostIndex++;
    loadPost(currentPostIndex);
  } else {
    alert("You have reached the last blog post.");
  }
});
