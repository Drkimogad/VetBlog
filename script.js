// General DOM Selectors
document.addEventListener("DOMContentLoaded", () => {
    const aboutUsText = document.querySelector("#aboutUsText");
    const saveAboutUsButton = document.querySelector("#saveAboutUsButton");
    const postContainer = document.querySelector("#postContainer");
    const nextButton = document.querySelector("#nextButton");

    // About Us Save Button Logic
    if (saveAboutUsButton) {
        saveAboutUsButton.addEventListener("click", () => {
            const textContent = aboutUsText.value.trim();
            if (textContent) {
                alert("About Us section saved successfully!");
            } else {
                alert("Please fill out the About Us section before saving.");
            }
        });
    }

    // Adding Interactivity for Post Previews
    const postPreviews = document.querySelectorAll(".postPreview");
    if (postPreviews) {
        postPreviews.forEach((post) => {
            post.addEventListener("click", () => {
                alert(`You clicked on: ${post.textContent}`);
            });
        });
    }

    // Next Button Logic
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            alert("Loading the next content...");
        });
    }
});

// Share Buttons Logic
const shareButtons = document.querySelectorAll(".share-button");
shareButtons.forEach((button) => {
    button.addEventListener("click", () => {
        alert("Share functionality coming soon!");
    });
});

// Print Preview Logic
const printButtons = document.querySelectorAll(".print-button");
printButtons.forEach((button) => {
    button.addEventListener("click", () => {
        window.print();
    });
});

// Blog Post Button Logic
const postButtons = document.querySelectorAll(".post-buttons button");
postButtons.forEach((button) => {
    button.addEventListener("click", () => {
        alert(`${button.textContent} functionality is under development!`);
    });
});

// Dynamic Theme Styling
const applyTheme = () => {
    const root = document.documentElement;

    // Setting theme colors
    root.style.setProperty("--primary-color", "#ffdd00"); // Mustard
    root.style.setProperty("--secondary-color", "#2e2e2e"); // Charcoal
    root.style.setProperty("--background-color", "#ffffff"); // White
};

// Apply theme on load
applyTheme();
