let currentTab;
let tab = document.getElementsByClassName("tab");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");

window.onload = () => {
  currentTab = 0;
  showTab(currentTab);
};

function showTab(n) {
  tab[n].style.display = "block";

  //Button functionality

  if (n == 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline";
  }
  if (n == tab.length - 1) {
    nextBtn.innerHTML = "Submit";
  } else {
    nextBtn.innerHTML = "Next";
  }
}

function nextPrev(n) {
  tab[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= tab.length) {
    // ... the form gets submitted:
    document.getElementById("user-input-form").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
