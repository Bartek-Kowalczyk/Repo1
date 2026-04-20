const url = "https://jsonplaceholder.typicode.com/users";
let users = [];
let sortDirection = "asc"
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
        alert("There was an error with viewing the list");
  }
}
displayUsers();

function searchUsers() {
  const list = document.getElementById("searchp");
  const text = document.getElementById("searchtxt").value.toLowerCase().trim();
  const result = document.getElementById("resultsp");
  const mode = document.getElementById("searchMode").value;

  const filtered = users.filter(user => {
    if(mode === "name"){
      return user.name.toLowerCase().includes(text);
    }
    if(mode === "email"){
      return user.email.toLowerCase().includes(text);
    }
    return(
      user.name.toLowerCase().includes(text) ||
      user.email.toLowerCase().includes(text)
    )
});
  filtered.sort((a, b) => {
    if (sortDirection == "asc"){
      return a.name.localeCompare(b.name);
    }
    else{
      return b.name.localeCompare(a.name);
    }
  })
    const results = filtered.length;
  if(text === ""){
    list.innerHTML="Here you will see all the results that match your search."
    result.innerHTML = ""
  }
  else{
        if (filtered.length > 0) {
            list.innerHTML = filtered.map(user => `
            <li>
                Imię: <span class="name">${highlight(user.name, text)}</span>
                Email: <span class="email">${highlight(user.email, text)}</span>
            </li>
            `).join("");
            result.innerHTML=`Znaleziono: ${results}`;
    } else {
        list.innerHTML = "Nie znaleziono użytkownika";
        result.innerHTML = ""
        
    }
  }
}

function highlight(text, query){
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
}

function resetSearch() {
  const input = document.getElementById("searchtxt");
  const list = document.getElementById("list");
  const info = document.getElementById("searchp");
  const result = document.getElementById("resultsp");

  input.value = "";

  list.innerHTML = users.map(user => `
    <li>
      Imię: <span class="name">${user.name}</span>
      Email: <span class="email">${user.email}</span>
    </li>
  `).join("");

  info.innerHTML = "Here you will see all the results that match your search.";
  result.innerHTML = "";
}

function toggleSort(){
  sortDirection = sortDirection === "asc" ? "desc" : "asc";
  searchUsers();
}