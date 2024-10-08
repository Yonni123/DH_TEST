import React from 'react';

function removeTableRows(tableId) {
    const table = document.getElementById(tableId);
    if (table) {
        const rows = table.getElementsByTagName('tr');
        for (let i = rows.length - 1; i >= 0; i--) {
            const cells = rows[i].getElementsByTagName('td');
            if (cells.length > 0) {
                table.deleteRow(i);
            }
        }
    }
}

function get_contacts() {
    var xhttp = new XMLHttpRequest();
    var url = 'https://localhost:7277/Contacts/GetAllContacts';
    xhttp.open('GET', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onload = function () {
        if (xhttp.status >= 200 && xhttp.status < 300) {
            // Handle success (status codes 200-299)
            var data = JSON.parse(xhttp.responseText)
            var table = document.getElementById('ContactsTable');
            removeTableRows("ContactsTable")

            for (const row of data) {
                var tr = document.createElement('tr');

                var td_id = document.createElement('td');
                var td_name = document.createElement('td');
                var td_phone = document.createElement('td');

                var id = document.createTextNode(row.id);
                var name = document.createTextNode(row.name);
                var phone = document.createTextNode(row.phone);

                td_id.appendChild(id);
                td_name.appendChild(name);
                td_phone.appendChild(phone);
                tr.appendChild(td_id);
                tr.appendChild(td_name);
                tr.appendChild(td_phone);

                table.appendChild(tr);
            }
        } else {
            // Handle errors (other status codes)
            alert(xhttp.responseText);
        }
    };
    xhttp.onerror = function () {
        console.error('Error creating contact!');
    };

    xhttp.send();

    return [
        { "id": 1, "name": "John Doe", "phone": "(123) 456-7890" },
        { "id": 2, "name": "Jane Smith", "phone": "(987) 654-3210" },
        { "id": 3, "name": "Sam Johnson", "phone": "(555) 123-4567" }
    ];
}

get_contacts();
const ContactTable = () => {
    return (
        <div>
            <h2>Contact List</h2>
            <table id="ContactsTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    );
};

export default ContactTable;