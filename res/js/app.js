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
  // Increase or decrease the current tab by 1:
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

  //   Node Renderning
  confirmCheck.innerHTML = "";
  if (currentTab == 0) {
    let age = document.querySelector("#age");
    let temp = document.querySelector("#temp");
    let sex = document.querySelector("#sex");

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
    val.innerText = temp.value;
    li.appendChild(attr);
    li.appendChild(val);
    confirmCheck.appendChild(li);
  }

  //   final render
  modal.style.display = "block";
  confirmCheck.style.display = "inline-block";

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
