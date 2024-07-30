
$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",
        success: (res) => {
            localStorage.setItem("data",JSON.stringify(res));
        },
        error: (err) => { console.log(err) }
    })
})
const getDetails=()=>{
    const name=document.getElementById("name-input").value;
    const age=document.getElementById("age-input").value;
    const email=document.getElementById("mail-input").value;
    const ph_number=document.getElementById("number-input").value;
    const user={
        name:name,
        age:age,
        email:email,
        ph_number:ph_number,
    }
    $.ajax({
        url:"http://localhost:3000/users",
        type:"POST",
        data:JSON.stringify(user),
        success:(res)=>{
            console.log(res)
        },
        error:(err)=>{
            console.log(err)
        }
    })
}




