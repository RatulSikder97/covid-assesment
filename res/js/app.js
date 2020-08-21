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
  let review = document.querySelector("#review");

  modal.style.display = "none";
  tab[currentTab].style.display = "none";

  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab == tab.length) {
    userData.score = score;
    form.style.display = "none";
    console.log(userData);
    review.style.display = "inline-block";
    renderReview();
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
  userData.temp = temp.value + "°" + scale.value;
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

  confirmCheck.innerHTML =
    "<h3>Selected health problems you feel.<br/><i style = 'color :#ff4400;'>Check before confirm </i></h3>";
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

      // add symptoms
      userData[`symp_${checkList[i].id}`] = checkList[i].value;
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

  let ageWarn = document.getElementById("age-report");
  let tempWarn = document.getElementById("temp-report");
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");

  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      if (y[i].id == "age") {
        y[i].className += " invalid";
        ageWarn.style.display = "inline-block";
      } else if (y[i].id == "temp") {
        y[i].className += " invalid";
        tempWarn.style.display = "none";
        tempWarn.style.display = "inline-block";
      }

      // and set the current valid status to false:

      valid = false;
    } else {
      y[i].className = "";
      if (y[i].id == "age") {
        ageWarn.style.display = "none";
      } else if (y[i].id == "temp") {
        tempWarn.style.display = "none";
      }
    }
  }

  return valid; // return the valid status
}

// Render review

function renderReview() {
  // render basic
  basicInfo();
}

function basicInfo() {
  let basic = document.querySelector("#basic ul");

  // paint age
  let li = document.createElement("li");
  let attr = document.createElement("p");
  let val = document.createElement("p");

  attr.innerText = "Age:";
  val.innerText = userData.age;
  li.appendChild(attr);
  li.appendChild(val);
  basic.appendChild(li);

  // paint sex
  li = document.createElement("li");
  attr = document.createElement("p");
  val = document.createElement("p");

  attr.innerText = "Sex:";
  val.innerText = userData.sex;
  li.appendChild(attr);
  li.appendChild(val);
  basic.appendChild(li);

  // paint temp
  li = document.createElement("li");
  attr = document.createElement("p");
  val = document.createElement("p");

  attr.innerText = "Body Temparature:";
  val.innerText = userData.temp;
  li.appendChild(attr);
  li.appendChild(val);
  basic.appendChild(li);
}
