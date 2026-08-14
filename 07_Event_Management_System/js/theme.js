const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme){

  if(theme === "dark"){
    document.body.classList.add("dark-theme");

    if(themeBtn){
      themeBtn.innerHTML =
        `<i class="fa-solid fa-sun"></i>`;
    }
  }
  else{
    document.body.classList.remove("dark-theme");

    if(themeBtn){
      themeBtn.innerHTML =
        `<i class="fa-solid fa-moon"></i>`;
    }
  }
}

/* LOAD SAVED THEME */

const savedTheme = localStorage.getItem("theme");

if(savedTheme){
  applyTheme(savedTheme);
}

/* TOGGLE THEME */

if(themeBtn){

  themeBtn.addEventListener("click", () => {

    const isDark =
      document.body.classList.contains("dark-theme");

    if(isDark){
      localStorage.setItem("theme", "light");
      applyTheme("light");
    }
    else{
      localStorage.setItem("theme", "dark");
      applyTheme("dark");
    }

  });

}

