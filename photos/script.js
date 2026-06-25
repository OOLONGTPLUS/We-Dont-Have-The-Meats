// 1. DOM Elements (Fixed naming conflicts)
const surpriseButton = document.getElementById("surpriseButton");
const surpriseText = document.getElementById("surpriseText");
const themeButton = document.getElementById("themeButton");
const heroItemName = document.getElementById("heroItemName");
const heroItemDescription = document.getElementById("heroItemDescription");
const heroRotatorCard = document.querySelector(".rotator-card");
const rotatorDots = document.getElementById("rotatorDots");
const brandLink = document.querySelector(".brand-link");
const addCodeButton = document.getElementById("addCodeButton");
const codeModal = document.getElementById("codeModal");
const closeCodeModalButton = document.getElementById("closeCodeModalButton");
const codeSearchInput = document.getElementById("codeSearchInput");
const codeModalStatus = document.getElementById("codeModalStatus");

// HTML Audio Elements
const arbysAudio = document.getElementById("arbysAudio");
const arbysRareAudio = document.getElementById("arbysRareAudio");
const rickrollAudio = document.getElementById("rickroll");

// 2. Separate Secret Code Phrases
const arbySecretPhrases = new Set(["let's get married", "lets get married"]);
const rickrollPhrases = new Set(["give up"]);

// 3. App State
let currentFeaturedIndex = 0;
let secretAudioArmed = false;
let otherSecretAudioArmed = false;

// Ensure preloading is active
if (arbysRareAudio) arbysRareAudio.preload = "auto";
if (rickrollAudio) rickrollAudio.preload = "auto";

// Data Arrays
const surpriseMenuItems = [
  { name: "Jamocha Shake", url: "https://www.arbys.com/menu/categories/desserts/jamocha-shake/" },
  { name: "Strawberry Lemonade", url: "https://www.arbys.com/menu/categories/beverages/strawberry-lemonade/" },
  { name: "Peach Cobbler Roll 2PC", url: "https://www.arbys.com/menu/categories/desserts/peach-cobbler-roll-2pc/" },
  { name: "Double Big Cheesy Bacon Burger", url: "https://www.arbys.com/menu/categories/burgers/double-big-cheesy-bacon-burger/" },
  { name: "Half Pound Beef 'N Cheddar Meal", url: "https://www.arbys.com/menu/categories/meals/half-pound-beef-n-cheddar-meal/" },
  { name: "Double Roast Beef Meal", url: "https://www.arbys.com/menu/categories/meals/double-roast-beef-meal/" },
  { name: "Classic French Dip & Swiss Meal", url: "https://www.arbys.com/menu/categories/meals/classic-french-dip-swiss-meal/" },
  { name: "White Cheddar Mac 'N Cheese", url: "https://www.arbys.com/menu/categories/limited-time/white-cheddar-mac-n-cheese/" },
  { name: "Honest Kids Organic Apple Juice Drink", url: "https://www.arbys.com/menu/categories/kids-menu/honest-kids-organic-apple-juice-drink/" },
  { name: "Bottled Water", url: "https://www.arbys.com/menu/categories/beverages/bottled-water/" }
];

const featuredItems = [
  { type: "Signature", name: "Classic Roast Beef", description: "Thin-sliced roast beef stacked warm on a toasted sesame seed bun." },
  { type: "Crispy", name: "Curly Fries", description: "Seasoned spirals with crunch, swagger, and serious snack energy." },
  { type: "Smokehouse", name: "Beef 'N Cheddar", description: "Roast beef, cheddar sauce, and tangy red ranch on an onion roll." },
  { type: "Sweet", name: "Jamocha Shake", description: "A creamy coffee-and-chocolate finish when the meal deserves dessert." }
];

// 4. Logo Click Handler (Determines which SINGLE track plays)
brandLink.addEventListener("click", (event) => {
  event.preventDefault();

  let trackToPlay = arbysAudio; // Default fallback

  if (secretAudioArmed) {
    trackToPlay = arbysRareAudio;
  } else if (otherSecretAudioArmed) {
    trackToPlay = rickrollAudio;
  }

  // Stop all sounds before playing the new one
  [arbysAudio, arbysRareAudio, rickrollAudio].forEach(audio => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });

  // Play selected sound
  if (trackToPlay) {
    trackToPlay.play().catch(err => console.log("Playback blocked or failed:", err));
  }

  // Reset armed states
  secretAudioArmed = false;
  otherSecretAudioArmed = false;
});

// 5. Code Input Modal Handlers
addCodeButton.addEventListener("click", () => {
  codeModal.hidden = false;
  codeSearchInput.value = "";
  codeModalStatus.textContent = "No code entered yet.";
  codeSearchInput.focus();
});

closeCodeModalButton.addEventListener("click", () => {
  codeModal.hidden = true;
});

codeSearchInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  const normalizedValue = codeSearchInput.value
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'");

  if (arbySecretPhrases.has(normalizedValue)) {
    secretAudioArmed = true;
    codeModalStatus.textContent = "Code accepted. Click the Arby's logo.";
  } else if (rickrollPhrases.has(normalizedValue)) {
    otherSecretAudioArmed = true;
    codeModalStatus.textContent = "Code accepted. Click the Arby's logo.";
  } else {
    codeModalStatus.textContent = "Invalid code. Try again.";
    return;
  }

  window.setTimeout(() => {
    codeModal.hidden = true;
  }, 180);
});

codeModal.addEventListener("click", (event) => {
  if (event.target === codeModal) {
    codeModal.hidden = true;
  }
});

// 6. Menu / Rotator / UI Interactivity
surpriseButton.addEventListener("click", () => {
  const randomItemIndex = Math.floor(Math.random() * surpriseMenuItems.length);
  const selectedItem = surpriseMenuItems[randomItemIndex];

  surpriseText.style.opacity = "0";
  surpriseText.style.transform = "translateY(6px)";

  window.setTimeout(() => {
    surpriseText.textContent = `Opening ${selectedItem.name}.`;
    surpriseText.style.opacity = "1";
    surpriseText.style.transform = "translateY(0)";
  }, 120);

  window.setTimeout(() => {
    window.location.href = selectedItem.url;
  }, 220);
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("alt-theme");
});

function renderRotatorDots(activeIndex) {
  rotatorDots.innerHTML = "";
  featuredItems.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === activeIndex) {
      dot.classList.add("active");
    }
    rotatorDots.appendChild(dot);
  });
}

function showFeaturedItem(index) {
  const item = featuredItems[index];
  const itemType = heroRotatorCard.querySelector(".rotator-type");

  heroRotatorCard.classList.add("is-fading");

  window.setTimeout(() => {
    itemType.textContent = item.type;
    heroItemName.textContent = item.name;
    heroItemDescription.textContent = item.description;
    heroRotatorCard.classList.remove("is-fading");
    renderRotatorDots(index);
  }, 180);
}

window.setInterval(() => {
  currentFeaturedIndex = (currentFeaturedIndex + 1) % featuredItems.length;
  showFeaturedItem(currentFeaturedIndex);
}, 2600);

renderRotatorDots(currentFeaturedIndex);

// Intersection Observer for Scroll Animations
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => {
  if (!item.classList.contains("visible")) {
    revealObserver.observe(item);
  }
});