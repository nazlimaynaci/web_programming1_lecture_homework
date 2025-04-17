const code = ""; 
const apiUrl = "http://gamf.nhely.hu/ajax2/";
function createData() {
    const name = document.getElementById("name").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
  
    if (!name || !height || !weight) {
      alert("Tüm alanları doldurun.");
      return;
    }
  
    if (name.length > 30 || height.length > 30 || weight.length > 30) {
      alert("Alanlar en fazla 30 karakter olabilir.");
      return;
    }
  
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`,
    })
    .then((res) => res.text())
    .then((res) => {
      alert("Kayıt eklendi!");
      readData(); 
    });
}