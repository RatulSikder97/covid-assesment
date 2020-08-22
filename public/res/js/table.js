// *********************************
// Render table
// *********************************

window.onload = function () {
  db.collection("user-info")
    .orderBy("key", "asc")
    .get()
    .then((snapshot) => {
      let cnt = 1;
      snapshot.docs.forEach((data) => {
        let userInfo = data.data();

        renderTable(userInfo, cnt);
        cnt++;
      });
    });
};

function renderTable(data, cnt) {
  // report table
  let table = document.getElementById("reportTab");
  let tr = document.createElement("tr");

  let td = document.createElement("td");
  td.innerText = cnt;
  tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = data.age;
  tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = data.sex;
  tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = data.temp;
  tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = data.date;
  tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = data.ascore;
  tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = data.result;
  tr.appendChild(td);

  table.appendChild(tr);
}
