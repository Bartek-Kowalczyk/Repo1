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
                <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm">
                    <div>
                        <div class="fw-semibold">${user.name}</div>
                        <div class="text-muted small">${user.email}</div>
                    </div>
                </li>
            `).join("");}
        else{
            list.innerHTML="Nie ma danych w liście"
        }

    } 
    catch (error) {
        alert("Wystąpił błąd w wyświetleniu listy.");
  }
}
displayUsers();

function searchUsers() {
  const list = document.getElementById("list");
  const text = document.getElementById("searchtxt").value.toLowerCase().trim();
  const result = document.getElementById("resultsp");


  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(text) ||
    user.email.toLowerCase().includes(text)
  );
  const sortinfo = document.getElementById("sortP");
  filtered.sort((a, b) => {
    if (sortDirection == "asc"){
      sortinfo.innerHTML = "Kierunek sortowania: A-Z"
      return a.name.localeCompare(b.name);
    }
    else{
      sortinfo.innerHTML = "Kierunek sortowania: Z-A"
      return b.name.localeCompare(a.name);
    }
  })
    const results = filtered.length;
  if(text === ""){
    list.innerHTML = filtered.map(user => `
            <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm">
                    <div>
                        <div class="fw-semibold">${user.name}</div>
                        <div class="text-muted small">${user.email}</div>
                    </div>
                </li>
            `).join("");
    result.innerHTML = "Tutaj zobaczysz ilość rezultatów."
  }
  else{
        if (filtered.length > 0) {
            list.innerHTML = filtered.map(user => `
            <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm">
                    <div>
                        <div class="fw-semibold">${highlight(user.name, text)}</div>
                        <div class="text-muted small">${highlight(user.email, text)}</div>
                    </div>
                </li>
            `).join("");
            result.innerHTML=`Znaleziono: ${results} z ${users.length}`;
    } else {
        list.innerHTML = "Nie znaleziono użytkownika";
        result.innerHTML = `Znaleziono: ${results} z ${users.length}`
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
  const result = document.getElementById("resultsp");

  input.value = "";

  list.innerHTML = users.map(user => `
                <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm">
                    <div>
                        <div class="fw-semibold">${user.name}</div>
                        <div class="text-muted small">${user.email}</div>
                    </div>
                </li>
  `).join("");

  result.innerHTML = "Tutaj zobaczysz ilość rezultatów.";
}
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        resetSearch();
    }
});

function toggleSort(){
  sortDirection = sortDirection === "asc" ? "desc" : "asc";
  searchUsers();
}