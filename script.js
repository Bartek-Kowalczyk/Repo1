const url = "https://jsonplaceholder.typicode.com/users";
let users = [];
async function displayUsers() {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
            }

        users = await response.json();
        
        const List = document.getElementById("list");
        if(users.length > 0){
            List.innerHTML = users.map(user => `
                <li>
                    Imię: <span class="name"> ${user.name} </span>
                    Email: <span class="email"> ${user.email} </span>
                </li>
            `).join("");}
        else{
            List.innerHTML="Nie ma danych w liście"
        }

    } 
    catch (error) {
        alert("There was an error with viewing the list");
  }
}
displayUsers();

function searchUsers() {
  const list = document.getElementById("searchp");
  const text = document.getElementById("searchtxt").value.toLowerCase();
  const result = document.getElementById("resultsp");

  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(text) ||
    user.email.toLowerCase().includes(text)
  );
    const results = filtered.length;
  if(text === ""){
    list.innerHTML="Here you will see all the results that match your search."
  }
  else{
        if (filtered.length > 0) {
            list.innerHTML = filtered.map(user => `
            <li>
                Imię: <span class="name">${user.name}</span>
                Email: <span class="email">${user.email}</span>
            </li>
            `).join("");
            result.innerHTML=`Znaleziono: ${results}`;
    } else {
        list.innerHTML = "Nie znaleziono użytkownika";
        result.innerHTML = ""
    }
  }
}