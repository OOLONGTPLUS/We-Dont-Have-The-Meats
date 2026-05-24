const surpriseButton = document.getElementById("surpriseButton");
const surpriseText = document.getElementById("surpriseText");
const themeButton = document.getElementById("themeButton");
const heroItemName = document.getElementById("heroItemName");
const heroItemDescription = document.getElementById("heroItemDescription");
const heroRotatorCard = document.querySelector(".rotator-card");
const rotatorDots = document.getElementById("rotatorDots");
const brandLink = document.querySelector(".brand-link");
const arbysAudio = document.getElementById("arbysAudio");
const arbysRareAudio = document.getElementById("arbysRareAudio");

const surpriseMenuItems = [
  {
    name: "Jamocha Shake",
    url: "https://www.arbys.com/menu/categories/desserts/jamocha-shake/"
  },
  {
    name: "Strawberry Lemonade",
    url: "https://www.arbys.com/menu/categories/beverages/strawberry-lemonade/"
  },
  {
    name: "Peach Cobbler Roll 2PC",
    url: "https://www.arbys.com/menu/categories/desserts/peach-cobbler-roll-2pc/"
  },
  {
    name: "Double Big Cheesy Bacon Burger",
    url: "https://www.arbys.com/menu/categories/burgers/double-big-cheesy-bacon-burger/"
  },
  {
    name: "Half Pound Beef 'N Cheddar Meal",
    url: "https://www.arbys.com/menu/categories/meals/half-pound-beef-n-cheddar-meal/"
  },
  {
    name: "Double Roast Beef Meal",
    url: "https://www.arbys.com/menu/categories/meals/double-roast-beef-meal/"
  },
  {
    name: "Classic French Dip & Swiss Meal",
    url: "https://www.arbys.com/menu/categories/meals/classic-french-dip-swiss-meal/"
  },
  {
    name: "White Cheddar Mac 'N Cheese",
    url: "https://www.arbys.com/menu/categories/limited-time/white-cheddar-mac-n-cheese/"
  },
  {
    name: "Honest Kids Organic Apple Juice Drink",
    url: "https://www.arbys.com/menu/categories/kids-menu/honest-kids-organic-apple-juice-drink/"
  },
  {
    name: "Bottled Water",
    url: "https://www.arbys.com/menu/categories/beverages/bottled-water/"
  }
];

const featuredItems = [
  {
    type: "Signature",
    name: "Classic Roast Beef",
    description: "Thin-sliced roast beef stacked warm on a toasted sesame seed bun."
  },
  {
    type: "Crispy",
    name: "Curly Fries",
    description: "Seasoned spirals with crunch, swagger, and serious snack energy."
  },
  {
    type: "Smokehouse",
    name: "Beef 'N Cheddar",
    description: "Roast beef, cheddar sauce, and tangy red ranch on an onion roll."
  },
  {
    type: "Sweet",
    name: "Jamocha Shake",
    description: "A creamy coffee-and-chocolate finish when the meal deserves dessert."
  }
];

let currentFeaturedIndex = 0;
let brandClickTimes = [];

brandLink.addEventListener("click", (event) => {
  event.preventDefault();
  const now = Date.now();
  brandClickTimes = brandClickTimes.filter((time) => now - time <= 3000);
  brandClickTimes.push(now);

  const secretComboTriggered =
    brandClickTimes.length >= 6 &&
    brandClickTimes[brandClickTimes.length - 1] - brandClickTimes[brandClickTimes.length - 6] <= 3000;

  const selectedAudio = secretComboTriggered || Math.floor(Math.random() * 3) === 0 ? arbysRareAudio : arbysAudio;
  const otherAudio = selectedAudio === arbysAudio ? arbysRareAudio : arbysAudio;

  if (secretComboTriggered) {
    brandClickTimes = [];
  }

  otherAudio.pause();
  otherAudio.currentTime = 0;
  selectedAudio.currentTime = 0;
  selectedAudio.play();
});

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
  {
    threshold: 0.16
  }
);

revealItems.forEach((item) => {
  if (!item.classList.contains("visible")) {
    revealObserver.observe(item);
  }
});
