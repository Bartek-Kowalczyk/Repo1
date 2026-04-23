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
             list.innerHTML = "";
            const fragment = document.createDocumentFragment();

            users.forEach(user => {
                const wrapper = document.createElement("li");
                wrapper.classList.add("list-group-item", "list-group-item-action");

                const name = document.createElement("div");
                name.classList.add("fw-semibold");
                name.textContent = user.name;

                const email = document.createElement("div");
                email.classList.add("text-muted", "small");
                email.textContent = user.email;

                wrapper.append(name, email);
                fragment.appendChild(wrapper);
            });

            list.appendChild(fragment);
        }
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

  list.innerHTML = "";
  const fragment = document.createDocumentFragment();

  let filtered = text === ""
    ? [...users]
    : users.filter(user =>
        user.name.toLowerCase().includes(text) ||
        user.email.toLowerCase().includes(text)
      );
      
  filtered.sort((a, b) => {
    if (sortDirection == "asc"){
      return a.name.localeCompare(b.name);
    }
    else{
      return b.name.localeCompare(a.name);
    }
  })

         filtered.forEach(user => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";

    const name = document.createElement("div");
    name.className = "fw-semibold";
    name.textContent = user.name;

    const email = document.createElement("div");
    email.className = "user-email small";
    email.textContent = user.email;

    li.append(name, email);
    fragment.appendChild(li);
  });

  list.appendChild(fragment);

  result.textContent =
    filtered.length > 0
      ? `Znaleziono: ${filtered.length} z ${users.length}`
      : `Znaleziono: ${filtered.length} z ${users.length}`;
}

function resetSearch() {
  const input = document.getElementById("searchtxt");
  const list = document.getElementById("list");
  const result = document.getElementById("resultsp");

  input.value = "";

  list.innerHTML = "";
            const fragment = document.createDocumentFragment();

            users.forEach(user => {
                const wrapper = document.createElement("li");
                wrapper.classList.add("list-group-item", "list-group-item-action");

                const name = document.createElement("div");
                name.classList.add("fw-semibold");
                name.textContent = user.name;

                const email = document.createElement("div");
                email.classList.add("text-muted", "small");
                email.textContent = user.email;

                wrapper.append(name, email);
                fragment.appendChild(wrapper);
            });

            list.appendChild(fragment);

  result.textContent = `Znaleziono: ${users.length} z ${users.length}`;
}

function toggleSort(){
  sortDirection = sortDirection === "asc" ? "desc" : "asc";
  searchUsers();
}

const darkSwitch = document.getElementById("darkSwitch");

if (localStorage.getItem("darkMode") === "on") {
  document.body.classList.add("dark-mode");
  darkSwitch.checked = true;
}

darkSwitch.addEventListener("change", () => {
  if (darkSwitch.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "on");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "off");
  }
});