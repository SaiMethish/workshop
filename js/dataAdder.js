var script = document.createElement("SCRIPT");
script.src = '';
script.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(script);

let data = []
const addData = () => {
    const usertable = $("tbody");
    for (let i = 0; i < data.length; i++) {
        const component = `
    <tr>
                <td><p>${data[i].name}</p></td>
                <td><p>${data[i].age}</p></td>
                <td><p>${data[i].email}</p></td>
                <td><p>${data[i].ph_number}</p></td>
                <div class="icons">
                <td><button id="delete" onclick="deleteUser('${data[i].id}')">delete</button></td>
                <td><button id="edit" onclick="editUser('${data[i].id}')">edit</button></td>
                </div>
            </tr>
    `;
        usertable.append(component);
    }
}

$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",
        success: (res) => {
            console.log(res);
            data = res;
            addData();
            localStorage.setItem("data", JSON.stringify(data));
        },
        error: (err) => { console.log(err) }
    })
})

function deleteUser(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/users/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (res) => {
            $(`tr[data-id="${id}"]`).remove();
            console.log("data deleted successfully")
        },
        error: (err) => {
            console.log(err)
        }
    })
}

function editUser(id) {
    console.log(id)
    let user;
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/users/${id}`,
        success: (res) => {
            console.log(res);
            user = res;
            editdetails();
        },
        error: (err) => { console.log(err) }
    })
    const editdetails = () => {
        let attr = prompt("enter the attribute to be edited");
        let val = prompt("enter the value to be edited");
        if (attr == "name") {
            user.name = val;
        }
        else if (attr == "age") {
            user.age = val;
        }
        else if (attr == "email") {
            user.email = val;
        }
        else {
            user.ph_number = val;
        }
        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/users/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(user),
            success: (res) => {
                $(`tr[data-id="${id}"]`).remove();
                console.log("data deleted successfully")
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    
}
