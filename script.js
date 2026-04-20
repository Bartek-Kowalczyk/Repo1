const url = "https://jsonplaceholder.typicode.com/users";
let users = [];
async function displayUsers() {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
            }

        users = await response.json();
        
        const list = document.getElementById("list");
        if(users.length > 0){
            list.innerHTML = users.map(user => `
                <li>
                    Imię: <span class="name"> ${user.name} </span>
                    Email: <span class="email"> ${user.email} </span>
                </li>
            `).join("");}
        else{
            list.innerHTML="Nie ma danych w liście"
        }

    } 
    catch (error) {
        alert("There was an error with viewing the list")
  }
}
displayUsers();