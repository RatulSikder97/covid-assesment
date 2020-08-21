let currentTab;
let tab = document.getElementsByClassName("tab");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");

let confirmCheck = document.querySelector("#confirm-input ul");

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
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
  tab[currentTab].style.display = "none";

  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= tab.length) {
    // ... the form gets submitted:
    console.log(document.querySelectorAll("input[type=checkbox]:checked"));
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function renderConfirm() {
  let editBtn = document.getElementById("editBtn");
  let modal = document.getElementById("myModal");

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
  for (let i = 0; i < len; i++) {
    let li = document.createElement("li");
    let attr = document.createElement("p");
    let val = document.createElement("p");

    attr.innerText = i + 1 + " " + checkList[i].value;
    li.appendChild(attr);
    confirmCheck.appendChild(li);
  }

  modal.style.display = "block";
}
