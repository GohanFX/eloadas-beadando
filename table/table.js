document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('dataForm');
    const tableBody = document.querySelector('#dataTable tbody');

    // Adatok tárolása
    let data = [];

    // Új adat hozzáadása
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const city = document.getElementById('city').value;

        // Validáció
        if (!name || !age || !city) {
            alert("Minden mező kitöltése kötelező!");
            return;
        }

        // Új sor hozzáadása
        const newRow = { name, age, city };
        data.push(newRow);
        renderTable(data);
        form.reset();
    });

    // Táblázat renderelése
    function renderTable(dataToRender) {
        tableBody.innerHTML = '';
        dataToRender.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.city}</td>
                <td>
                    <button onclick="editRow(${index})">Szerkeszt</button>
                    <button onclick="deleteRow(${index})">Töröl</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // Sor szerkesztése
    window.editRow = function (index) {
        const row = data[index];
        document.getElementById('name').value = row.name;
        document.getElementById('age').value = row.age;
        document.getElementById('city').value = row.city;
        data.splice(index, 1); // Régi sor törlése
        renderTable(data);
    };

    // Sor törlése
    window.deleteRow = function (index) {
        data.splice(index, 1);
        renderTable(data);
    };

    window.sortTable = function (columnIndex) {
        data.sort((a, b) => {
            const key = Object.keys(a)[columnIndex];
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        renderTable(data);
    };

    window.filterTable = function () {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const filteredData = data.filter(row => 
            row.name.toLowerCase().includes(searchTerm) ||
            row.age.toString().includes(searchTerm) ||
            row.city.toLowerCase().includes(searchTerm)
        )
        renderTable(filteredData);
    };
});