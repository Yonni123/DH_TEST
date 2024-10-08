import React from 'react';

function create_contact() {
    var name = document.getElementById("input_name").value;
    var phone = document.getElementById("input_phone").value;

    if (name === "" || phone === "") {
        alert("Input fields can not be empty!");
        return;
    }

    var xhttp = new XMLHttpRequest();
    var url = 'https://localhost:7277/Contacts/CreateContact?name=' + name + '&phone=' + phone;
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onload = function () {
        if (xhttp.status >= 200 && xhttp.status < 300) {
            // Handle success (status codes 200-299)
            var res = JSON.parse(xhttp.responseText);
            document.getElementById("input_name").value = '';
            document.getElementById("input_phone").value = '';
            alert(res.message)

            // Update table with new contact
            var table = document.getElementById('ContactsTable');
            var id = res.newContact.id
            var name = res.newContact.name
            var phone = res.newContact.phone
            const newRow = `
                            <tr>
                                <td>${id}</td>
                                <td>${name}</td>
                                <td>${phone}</td>
                            </tr>
                            `;
            table.innerHTML += newRow;
        }
        else {
            // Handle errors (other status codes)
            alert(xhttp.responseText);
        }
    };
    xhttp.onerror = function () {
        console.error('Error creating contact!');
    };

    xhttp.send();
}

const CreateContact = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div>
                <h2>Create a new contact</h2>
                <div className='rowC'><p>Name: </p><input type="text" id="input_name" maxLength="50" pattern="^[a-zA-Z\s]+$"></input></div>
                <div className='rowC'><p>Phone: </p><input type="text" id="input_phone" maxLength="50" pattern="^0\d{9}$"></input><button id="submit_btn" onClick={create_contact} type="button">Submit</button></div>
            </div>
        </div>
    );
};

export default CreateContact;