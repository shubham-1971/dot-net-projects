function getRemainingTime(eventDate){

  const now = new Date().getTime();
  const target = new Date(eventDate).getTime();

  const gap = target - now;

  if(gap <= 0){
    return "Live";
  }

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
        const minutes = Math.floor(
        (gap % (1000 * 60 * 60)) / (1000 * 60)
    );
      const seconds = Math.floor(
        (gap % (1000 * 60)) / 1000
    );

  return `${days}D : ${hours}H : ${minutes}M :${seconds}S `;
}
function updateTimers(){

  document.querySelectorAll(".event-card").forEach(card => {

    const date = card.dataset.date;
    const timer = card.querySelector(".timer-text");

    if(timer){
      timer.innerText = getRemainingTime(date);
    }

  });

}

// run immediately
updateTimers();

// update every minute
setInterval(() => {
  updateTimers();
}, 1000); // updates every 1 second


//Sorting
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".event-card");


let activeCategory = "All";
let searchText = "";

function filterAndSort(){

  let filteredCards = [...cards];

  // 1. CATEGORY FILTER
  if(activeCategory !== "All"){
    filteredCards = filteredCards.filter(card =>
      card.dataset.category === activeCategory
    );
  }

  // 2. SEARCH FILTER
  filteredCards = filteredCards.filter(card =>
    card.dataset.title.toLowerCase().includes(searchText)
  );
  //3.sort
  const value = sortSelect.value;

  if(value === "Newest"){
    filteredCards.sort((a, b) =>
      new Date(b.dataset.date) - new Date(a.dataset.date)
    );
  }

  if(value === "Oldest"){
    filteredCards.sort((a, b) =>
      new Date(a.dataset.date) - new Date(b.dataset.date)
    );
  }

  // 4. SHOW/HIDE CARDS
  cards.forEach(card => card.style.display = "none");

  filteredCards.forEach(card => {
    card.style.display = "block";
  });
  // RE-ORDER DOM (IMPORTANT)
  eventGrid.innerHTML = "";

  filteredCards.forEach(card => {
    eventGrid.appendChild(card);
  });

}


//Search filter
searchInput.addEventListener("input", (e) => {
  searchText = e.target.value.toLowerCase();
  filterAndSort();
});

///Category filtering
filterButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    document.querySelector(".filter-btn.active")
      .classList.remove("active");

    btn.classList.add("active");

    activeCategory = btn.textContent.trim();

    filterAndSort();
  });

});

sortSelect.addEventListener("change", () => {
  filterAndSort();
});

