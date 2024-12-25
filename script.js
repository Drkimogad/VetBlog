document.addEventListener("DOMContentLoaded", () => {
    // Hero banner functionality
    const heroUpload = document.getElementById("hero-upload");
    const heroBanner = document.getElementById("hero-banner");
    const savedBanner = localStorage.getItem("hero-banner");

    if (savedBanner) {
        heroBanner.src = savedBanner;
        heroBanner.style.display = "block";
    }

    heroUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            heroBanner.src = e.target.result;
            heroBanner.style.display = "block";
            localStorage.setItem("hero-banner", e.target.result);
        };
        if (file) reader.readAsDataURL(file);
    });

    // Editable About Us section
    const aboutUsText = document.getElementById("about-us-text");
    const saveAboutUsBtn = document.getElementById("save-about-us");
    const savedAboutUs = localStorage.getItem("about-us");

    if (savedAboutUs) {
        aboutUsText.value = savedAboutUs;
    }

    saveAboutUsBtn.addEventListener("click", () => {
        localStorage.setItem("about-us", aboutUsText.value);
        alert("About Us content saved!");
    });
});
