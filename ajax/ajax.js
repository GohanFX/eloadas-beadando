const API_URL = "http://gamf.nhely.hu/ajax2/";
const MY_CODE = "AHSSPUabc123";

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    initForm();
});

async function fetchData() {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            body: `code=${MY_CODE}&op=read`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        
        if (!response.ok) {
            throw new Error("Hiba történt az adatok lekérésekor!");
        }
        
        const data = await response.json();
        displayData(data.list);
    } catch (error) {
        console.error(error);
        alert("Hiba történt az adatok frissítésekor!");
    }
}

function displayData(records) {
    const content = document.querySelector(".mainSect");
    content.innerHTML = "<h2>Adatok</h2>";
    
    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Magasság</th>
            <th>Súly</th>
            <th>Műveletek</th>
        </tr>
    `;
    
    records.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.height}</td>
            <td>${record.weight}</td>
            <td>
                <button onclick="editData(${record.id})">Szerkesztés</button>
                <button onclick="deleteData(${record.id})">Törlés</button>
            </td>
        `;
        table.appendChild(row);
    });
    
    content.appendChild(table);
}

function initForm() {
    const form = document.createElement("form");
    form.id = "dataForm";
    form.innerHTML = `
        <input type="hidden" id="recordId">
        <input type="text" id="name" placeholder="Név" required>
        <input type="number" id="height" placeholder="Magasság" min="1" required>
        <input type="number" id="weight" placeholder="Súly" min="1" required>
        <button type="submit" id="submitBtn">Hozzáadás</button>
        <button type="button" id="cancelBtn" style="display:none">Mégse</button>
    `;
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const id = document.getElementById("recordId").value;
        const name = document.getElementById("name").value;
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;

        if(name.trim() === "" || height.trim() === "" || weight.trim() === "") return alert("Kérlek töltsd ki az összes mezőt!");
        if(name.length > 30) return alert("A név maximum 30 karakter lehet!");
       
        
        if (id) {
            await updateData(id, name, height, weight);
        } else {
            await createData(name, height, weight);
        }
        
        resetForm();
        await fetchData();
    });
    
    document.getElementById("cancelBtn")?.addEventListener("click", resetForm);
    document.querySelector("#addUser").appendChild(form);
}

function resetForm() {
    document.getElementById("dataForm").reset();
    document.getElementById("recordId").value = "";
    document.getElementById("submitBtn").textContent = "Hozzáadás";
    document.getElementById("cancelBtn").style.display = "none";
}

async function editData(id) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            body: `code=${MY_CODE}&op=read`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        
        if (!response.ok) {
            throw new Error("Hiba történt az adatok lekérésekor!");
        }
        
        const data = await response.json();
        const record = data.list.find(item => item.id == id);
        
        if (record) {
            document.getElementById("recordId").value = record.id;
            document.getElementById("name").value = record.name;
            document.getElementById("height").value = record.height;
            document.getElementById("weight").value = record.weight;
            document.getElementById("submitBtn").textContent = "Frissítés";
            document.getElementById("cancelBtn").style.display = "inline-block";
        }
    } catch (error) {
        console.error(error);
        alert("Hiba történt a rekord betöltésekor!");
    }
}

async function createData(name, height, weight) {
    const params = new URLSearchParams();
    params.append("name", name);
    params.append("height", height);
    params.append("weight", weight);
    params.append("op", "create");
    params.append("code", MY_CODE);
    
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString()
        });
        
        alert("Rekord sikeresen létrehozva!");
    } catch (error) {
        console.error("Hiba történt a rekord létrehozásakor!", error);
        alert("Hiba történt a rekord létrehozásakor!");
    }
}

async function updateData(id, name, height, weight) {
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("name", name);
    params.append("height", height);
    params.append("weight", weight);
    params.append("op", "update");
    params.append("code", MY_CODE);
    
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString()
        });
        
        alert("Rekord sikeresen frissítve!");
    } catch (error) {
        console.error("Hiba történt a rekord frissítésekor!", error);
        alert("Hiba történt a rekord frissítésekor!");
    }
}

async function deleteData(id) {
    if (!confirm("Biztosan törölni szeretnéd ezt a rekordot?")) {
        return;
    }
    
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("code", MY_CODE);
    params.append("op", "delete");
    
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString()
        });
        
        alert("Rekord sikeresen törölve!");
        await fetchData();
    } catch (error) {
        console.error("Hiba történt a rekord törlésekor!", error);
        alert("Hiba történt a rekord törlésekor!");
    }
}

