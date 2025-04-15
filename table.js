function addRow() {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const email = document.getElementById('email').value.trim();
    const city = document.getElementById('city').value.trim();
  
    if (!name || !age || !email || !city) {
      alert("Please fill in all fields.");
      return;
    }
  
    const table = document.getElementById('crud-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
  
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = age;
    newRow.insertCell(2).innerText = email;
    newRow.insertCell(3).innerText = city;
  
    const actionCell = newRow.insertCell(4);
    actionCell.innerHTML = `
      <button onclick="editRow(this)">Edit</button>
      <button onclick="deleteRow(this)">Delete</button>
    `;
  
    // Clear inputs
    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
    document.getElementById('email').value = "";
    document.getElementById('city').value = "";
  } 
  
  function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.remove();
  }
  
  function editRow(btn) {
    const row = btn.parentNode.parentNode;
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
  
  function sortTable(columnIndex) {
    const table = document.getElementById("crud-table");
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);
  
    const sortedRows = rows.sort((a, b) => {
      const valA = a.cells[columnIndex].innerText.toLowerCase();
      const valB = b.cells[columnIndex].innerText.toLowerCase();
      return valA.localeCompare(valB);
    });
  
    tbody.innerHTML = "";
    sortedRows.forEach(row => tbody.appendChild(row));
  }
  
  function filterTable() {
    const input = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#crud-table tbody tr");
  
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(input) ? "" : "none";
    });
  }