window.addEventListener("load", fetchUsers);

async function fetchUsers() {

  let container = document.getElementById("bodyContainer");
  try {
    
    let response = await fetch("http://localhost:8000/api/users", { method: "get", headers: {
      'Content-Type': 'application/json'
    }});
    response = await response.json();
    console.log(response);

    let users = ""; 

    for (const user of response) {
      users+= `<tr>
      <th scope="row">${user.id}</th>
      <td>${user.NumeroEmpleado}</td>
      <td>${user.NombreCompletoEmpleado}</td>
      <td>${user.FechaNacimiento}</td>
      <td>${user.NoCelular}</td>
      <td>${user.Estatus ? "Activo" : "Inactivo" }</td>
      <td><button onclick="deleteUser(${user.id})">Borrar</button></td>
    </tr>`;
    }
    container.innerHTML = users; 

  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id){
  try {
    let response = await fetch(`http://localhost:8000/api/users/${id}`, { method: "delete", headers: {
      'Content-Type': 'application/json'
    }});
    response = await response.json();
    console.log(response);
    fetchUsers();
  } catch (error) {
    console.log(error);
  }
}

async function saveUser() {

  let numberEmployee  = document.getElementById("add-Number").value;
  let nameEmployee    = document.getElementById("add-Name").value;
  let phoneEmployee   = document.getElementById("add-Phone").value;
  let bdayEmployee    = document.getElementById("add-Date").value;

  try {
    
    let body = {
      "NumeroEmpleado": numberEmployee,
      "NombreCompletoEmpleado": nameEmployee,
      "FechaNacimiento": bdayEmployee,
      "NoCelular": phoneEmployee
    }

    let response = await fetch("http://localhost:8000/api/users", { method: "post", body: JSON.stringify(body), 
    headers: {
      'Content-Type': 'application/json'
    }});
    response = await response.json();
    console.log(response);
    await fetchUsers();
  } catch (error) {
    console.log(error);
  }
  
  cleanForm();
}

function cleanForm(){
  document.getElementById("add-Number").value = "";
  document.getElementById("add-Name").value = "";
  document.getElementById("add-Phone").value = "";
  document.getElementById("add-Date").value = "";
}