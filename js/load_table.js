const tableBody = document.getElementById('tableBody');


/**
 * Load and populate table from CSV file path
 * @param {string} csvPath - Path to your CSV file
 */
function loadScheduleFromPath(csvPath) {
    fetch(csvPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`File not found: ${csvPath}`);
            }
            return response.text();
        })
        .then(csvText => {
            
            populateTable(csvText);
        })
        .catch(error => {
            console.error(error);
            
            alert(`Could not load "${csvPath}"\n\nMake sure the file exists and the path is correct.`);
            
        });
}

// Populate the table
function populateTable(csvText) {
    const rows = csvText.trim().split('\n');
    tableBody.innerHTML = '';

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].split(',').map(cell => cell.trim());
        if (cells.length < 5) continue;

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

        // Fill empty columns
        while (tr.children.length < 5) {
            const td = document.createElement('td');
            td.textContent = '—';
            td.classList.add('empty');
            tr.appendChild(td);
        }
        
        tableBody.appendChild(tr);
    }

    if (tableBody.children.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:40px; color:#64748b;">
            No data found in CSV file.
        </td></tr>`;
    }
}


// ======================
// AUTO LOAD - CHANGE PATH HERE
// ======================
window.onload = function() {
    
    
    // ←←← CHANGE THIS TO YOUR CSV PATH
    const csvPath = "training-schedule.csv";     // Example: 'data/myschedule.csv' or './schedule.csv'
    
    loadScheduleFromPath(csvPath);
};