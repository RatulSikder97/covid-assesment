// ********************************
// firebase backend
// ********************************

// store to database(firestore)
function storeInfo() {
  db.collection("user-info").add({
    age: userData.age,
    sex: userData.sex,
    temp: userData.temp,
    date: userData.assesDay,
    ascore: userData.score,
    result: userData.covid,
    key: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

// *********************************
// Key event for store  function
// *********************************
let storeKey = document.getElementById("proceed");

storeKey.onclick = function () {
  // Report generation
  genReport();
  // Store data to firebase
  storeInfo();
};
