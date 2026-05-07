document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    const csvPath = "data/training-schedule.csv";   // Better folder structure

    fetch(csvPath)
        .then(response => {
            if (!response.ok) throw new Error(`Schedule file not found: ${csvPath}`);
            return response.text();
        })
        .then(csvText => {
            populateTable(csvText);
        })
        .catch(error => {
            console.error(error);
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center; padding:60px 20px; color:#e11d48;">
                        <strong>Trainingsplan konnte nicht geladen werden.</strong><br>
                        Bitte später nochmal versuchen.
                    </td>
                </tr>`;
        });
});

function populateTable(csvText) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const rows = csvText.trim().split('\n');
    
    rows.forEach(row => {
        const cells = row.split(',').map(cell => cell.trim());
        if (cells.length < 5) return;

        const tr = document.createElement('tr');
        
        cells.forEach(cell => {
            const td = document.createElement('td');
            if (!cell || cell.toLowerCase() === 'null' || cell.toLowerCase() === 'n/a') {
                td.textContent = '—';
                td.classList.add('empty');
            } else {
                td.textContent = cell;
            }
            tr.appendChild(td);
        });

        // Fill missing columns
        while (tr.children.length < 5) {
            const td = document.createElement('td');
            td.textContent = '—';
            td.classList.add('empty');
            tr.appendChild(td);
        }
        
        tableBody.appendChild(tr);
    });
}