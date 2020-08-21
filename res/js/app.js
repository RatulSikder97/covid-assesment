let currentTab;
let tab = document.getElementsByClassName("tab");
let confirmCheck = document.querySelector("#confirm-input ul");

let userData = {};

let score = 0;
window.onload = () => {
  currentTab = 0;
  showTab(currentTab);
};

function showTab(n) {
  let nextBtn = document.getElementById("nextBtn");
  if (n < tab.length) {
    tab[n].style.display = "block";
  }

  //Button functionality

  if (n == tab.length - 1) {
    nextBtn.innerHTML = "Submit";
  } else {
    nextBtn.innerHTML = "Confirm";
  }
}

function nextPrev(n) {
  let modal = document.getElementById("myModal");
  let form = document.getElementById("user-input-form");
  modal.style.display = "none";
  tab[currentTab].style.display = "none";

  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab == tab.length) {
    userData.score = score;
    form.style.display = "none";
    console.log(userData);
  } else if (currentTab < tab.length) {
    showTab(currentTab);
  }
  // Otherwise, display the correct tab:
}

function renderConfirm() {
  let editBtn = document.getElementById("editBtn");
  let modal = document.getElementById("myModal");
  if (!validateForm()) return;
  // Render first form

  if (currentTab == 0) {
    firstForm();
  } else if (currentTab == 1) {
    renderCheckbox("symptoms");
  } else {
    renderCheckbox("ad-symptoms");
  }
  // render second form

  //   Modal close handle
  editBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function firstForm() {
  //   Node Renderning
  let editBtn = document.getElementById("editBtn");
  let modal = document.getElementById("myModal");
  confirmCheck.innerHTML = "";

  let age = document.querySelector("#age");
  let temp = document.querySelector("#temp");
  let sex = document.querySelector("#sex");
  let scale = document.querySelector("input[type=radio]:checked");

  let li = document.createElement("li");
  let attr = document.createElement("p");
  let val = document.createElement("p");

  // render age
  attr.innerText = age.name;
  val.innerText = age.value;
  li.appendChild(attr);
  li.appendChild(val);
  confirmCheck.appendChild(li);

  // render sex
  li = document.createElement("li");
  attr = document.createElement("p");
  val = document.createElement("p");

  attr.innerText = sex.name;
  val.innerText = sex.options[sex.selectedIndex].value;
  li.appendChild(attr);
  li.appendChild(val);
  confirmCheck.appendChild(li);

  //render temparature
  li = document.createElement("li");
  attr = document.createElement("p");
  val = document.createElement("p");

  attr.innerText = temp.name;
  val.innerText = temp.value + "°" + scale.value;
  li.appendChild(attr);
  li.appendChild(val);
  confirmCheck.appendChild(li);

  // add to list
  userData.age = age.value;
  userData.sex = sex.options[sex.selectedIndex].value;
  // Add score;
  if (
    (+temp.value > 37.5 && scale.value == "C") ||
    (+temp.value > 99.5 && scale.value == "F")
  ) {
    score += 2;
  }
  //   final render
  modal.style.display = "block";
}

// Render checkbox input
function renderCheckbox(name) {
  let editBtn = document.getElementById("editBtn");
  let modal = document.getElementById("myModal");

  confirmCheck.innerHTML = "";
  let checkList = document.querySelectorAll(`input[name=${name}]:checked`);
  let len = checkList.length;

  confirmCheck.innerHTML = "<h3>Selected health problems you feel.</h3>";
  if (len == 0) {
    confirmCheck.innerHTML =
      "<p style ='color:#ed553b;'> You don't select any of symptoms</p>";
  } else {
    if (name == "symptoms") {
      score += (len - 1) * 1 + 2;
    } else if (name == "ad-symptoms") {
      score += len * 2;
    }

    for (let i = 0; i < len; i++) {
      let li = document.createElement("li");
      let attr = document.createElement("p");
      let val = document.createElement("p");

      attr.innerText = i + 1 + " " + checkList[i].value;
      li.appendChild(attr);
      confirmCheck.appendChild(li);
    }
  }
  modal.style.display = "block";
}

// validate form

function validateForm() {
  // This function deals with validation of the form fields
  let x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }

  return valid; // return the valid status
}
