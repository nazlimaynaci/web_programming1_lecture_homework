const code = "H25GW8ajax123";
const apiUrl = "http://gamf.nhely.hu/ajax2/";

function createData() {
  const name = document.getElementById("name").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;

  if (!name || !height || !weight) {
    alert("Please fill in all the fields.");
    return;
  }

  if (name.length > 30 || height.length > 30 || weight.length > 30) {
    alert("Fields can contain a maximum of 30 characters.");
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`,
  })
    .then((res) => res.text())
    .then(() => {
      alert("Record added!");
      readData();
    })
    .catch((err) => console.error("Create Error:", err));
}

function readData() {
  const formData = new FormData();
  formData.append("op", "read");
  formData.append("code", code);

  fetch(apiUrl, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      const output = document.getElementById("output");
      output.innerHTML = "";
      let sum = 0;
      let max = 0;

      data.list.forEach((item) => {
        const div = document.createElement("div");
        div.innerText = `ID: ${item.id} | Name: ${item.name} | Height: ${item.height} | Weight: ${item.weight}`;
        output.appendChild(div);

        const h = parseFloat(item.height);
        if (!isNaN(h)) {
          sum += h;
          if (h > max) max = h;
        }
      });

      const avg = data.list.length > 0 ? (sum / data.list.length).toFixed(2) : 0;
      output.innerHTML += `<hr>Total Height: ${sum}, Average: ${avg}, Max: ${max}`;
    })
    .catch((err) => console.error("Read Error:", err));
}

function getDataForId() {
  const id = document.getElementById("updateId").value;

  const formData = new FormData();
  formData.append("op", "read");
  formData.append("code", code);

  fetch(apiUrl, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      const item = data.list.find((x) => x.id === id);
      if (item) {
        document.getElementById("update-name").value = item.name;
        document.getElementById("update-height").value = item.height;
        document.getElementById("update-weight").value = item.weight;
      } else {
        alert("ID not found.");
      }
    })
    .catch((err) => console.error("GetDataForId Error:", err));
}

function updateData() {
  const id = document.getElementById("updateId").value;
  const name = document.getElementById("update-name").value;
  const height = document.getElementById("update-height").value;
  const weight = document.getElementById("update-weight").value;

  if (!id || !name || !height || !weight) {
    alert("Please fill in all the fields.");
    return;
  }

  if (name.length > 30 || height.length > 30 || weight.length > 30) {
    alert("Fields can contain a maximum of 30 characters.");
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`,
  })
    .then((res) => res.text())
    .then(() => {
      alert("Record updated!");
      readData();
    })
    .catch((err) => console.error("Update Error:", err));
}

function deleteData() {
  const id = document.getElementById("delete-id").value;
  if (!id) {
    alert("Please enter an ID!");
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=delete&id=${id}&code=${code}`,
  })
    .then((res) => res.text())
    .then(() => {
      alert("Record deleted!");
      readData();
    })
    .catch((err) => console.error("Delete Error:", err));
}

window.onload = readData;
