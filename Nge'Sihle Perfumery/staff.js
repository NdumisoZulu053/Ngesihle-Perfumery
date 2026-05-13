document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]
    if (file) {
        const fr = new FileReader();
        fr.onload = function() {
            try {
                const staff = JSON.parse(fr.result);
                makeStaffTable(staff);
            } catch(error) {
                console.error('Error Parsing JSON:', error);
                document.getElementById('conatinerBox').innerHTML = '<p>Error: Invalid JSON file</p>';
            }
        };
        fr.onerror = function () {
            console.error('Error reading file');
            document.getElementById('containerBox').innerHTML = '<p>Error: Could not read file</p>';
        };
        fr.readAsText(file);
    }
});

function makeStaffTable(staff){
    const containerBox = document.getElementById('conatinerBox');
    containerBox.innerHTML = '';
    if (!staff || !Array.isArray(staff)|| staff.length === 0){
        containerBox.innerHTML= '<p>No Staff DAta Available</p>';
        return;
    }

    const staffTable = document.createElement('table');
    staffTable.id = 'staffTable';

    const headerRow = document.createElememnt('tr');
    const firstEntry = staff[0];
    for (let prop in firstEntry){
        if (firstEntry.hasOwnProperty(prop)){
            const headerCell = document.createElement('th');
            headerCell.textContent = prop;
            headerRow.appendChild(headerCell);
        }
    }
    staffTable.appendChild(headerRow);

    for (let i = 0; i < staff.length; i++){
        const tablerow = document.createElement('tr');
        

        for(let prop in staff[i]){
            if(staff[i].hasOwnProperty(prop)){
                const tableCell = document.createElement('td');
                tableCell.textContent = staff[i][prop];
                tablerow.appendChild(tableCell);
            }
        }
        staffTable.appendChild(tablerow);
    }
    containerBox.appendChild(staffTable)
    
}