document.addEventListener("DOMContentLoaded", function() {
  const presetData = [
    { name: "Alice", age: "22", email: "alice@mail.com", city: "Budapest" },
    { name: "Bob", age: "30", email: "bob@mail.com", city: "Debrecen" },
    { name: "Charlie", age: "28", email: "charlie@mail.com", city: "Pécs" },
    { name: "Diana", age: "25", email: "diana@mail.com", city: "Szeged" }
  ];

  presetData.forEach(item => {
    insertRow(item.name, item.age, item.email, item.city);
  });
});


function insertRow(name, age, email, city) {
  const table = document.getElementById("crud-table").getElementsByTagName("tbody")[0];
  const row = table.insertRow();

  row.insertCell().textContent = name;
  row.insertCell().textContent = age;
  row.insertCell().textContent = email;
  row.insertCell().textContent = city;

  const actionCell = row.insertCell();
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => row.remove();
  actionCell.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editRow(row);
  actionCell.appendChild(editBtn);
}

function addRow() {
  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value.trim();
  const email = document.getElementById('email').value.trim();
  const city = document.getElementById('city').value.trim();

  if (!name || !age || !email || !city) {
    alert("Please fill in all fields.");
    return;
  }

  insertRow(name, age, email, city);

  document.getElementById('name').value = "";
  document.getElementById('age').value = "";
  document.getElementById('email').value = "";
  document.getElementById('city').value = "";
}

function editRow(row) {
  const cells = row.querySelectorAll('td');
  const name = prompt("Edit name:", cells[0].innerText);
  const age = prompt("Edit age:", cells[1].innerText);
  const email = prompt("Edit email:", cells[2].innerText);
  const city = prompt("Edit city:", cells[3].innerText);

  if (name && age && email && city) {
    cells[0].innerText = name;
    cells[1].innerText = age;
    cells[2].innerText = email;
    cells[3].innerText = city;
  }
}
function filterTable() {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#crud-table tbody tr");

  rows.forEach(row => {
    const cells = row.getElementsByTagName("td");
    let match = false;

    for (let i = 0; i < cells.length - 1; i++) {
      const cellText = cells[i].textContent.toLowerCase();
      if (cellText.includes(input)) {
        match = true;
        break;
      }
    }

    row.style.display = match ? "" : "none";
  });
}

let sortDirection = true;

function sortTable(columnIndex) {
  const table = document.getElementById("crud-table");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);

  rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();

    const aNumber = parseFloat(aText);
    const bNumber = parseFloat(bText);

    if (!isNaN(aNumber) && !isNaN(bNumber)) {
      return sortDirection ? aNumber - bNumber : bNumber - aNumber;
    }
    return sortDirection
      ? aText.localeCompare(bText)
      : bText.localeCompare(aText);
  });
  rows.forEach(row => tbody.appendChild(row));
  sortDirection = !sortDirection;
}

  