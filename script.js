const state = {
    users: [],
    sortDirection: "asc"
};

const elements = {
    list: document.getElementById("list"),
    searchInput: document.getElementById("searchtxt"),
    results: document.getElementById("resultsp"),
    darkSwitch: document.getElementById("darkSwitch")
};

const url = "https://jsonplaceholder.typicode.com/users";

async function fetchUsers() {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Błąd API: ${response_status}`)
    }
    return response.json();
}

function createUserList(user){
    const li = document.createElement("li");
    li.classList.add("list-group-item", "list-group-item-action");

    const name = document.createElement("div");
    name.classList.add("fw-semibold");
    name.textContent = user.name;

    const email = document.createElement("div");
    email.classList.add("text-muted", "small");
    email.textContent = user.email;

    li.append(name, email);
    return li;
}

function renderUserList(users,){
    elements.list.innerHTML = "";

    if(users.length === 0){
        elements.list.textContent = "Nie ma danych w liście";
        return;
    }

    const fragment = document.createDocumentFragment();
    users.forEach(user => {
        fragment.appendChild(createUserList(user));
    });

    elements.list.appendChild(fragment);
}

function updateResultsInfo(filteredCount, totalCount) {
  elements.results.textContent = `Znaleziono: ${filteredCount} z ${totalCount}`;
}

function filterUsers(users, query){
    if(!query) return[...users];

    return users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
}

function sortUsers(users, sortDirection){
    return [...users].sort((a, b) =>
        sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
);
}

function searchUsers(){
    const query = elements.searchInput.value.toLowerCase().trim();

    let result = filterUsers(state.users, query);
    result = sortUsers(result, state.sortDirection);

    renderUserList(result);
    updateResultsInfo(result.length, state.users.length)
}

function resetSearch(){
    elements.searchInput.value = "";
    renderUserList(state.users);
    updateResultsInfo(state.users.length, state.users.length);
}

function toggleSort(){
    state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
    searchUsers();
}

function darkMode(){
    if(localStorage.getItem("darkMode") === "on"){
        document.body.classList.add("dark-mode");
        elements.darkSwitch.checked = true;
    }

    elements.darkSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode", elements.darkSwitch.checked);
        localStorage.setItem(
            "darkMode",
            elements.darkSwitch.checked ? "on" : "off"
        );
    });
}

async function initialize(){
    try {
        state.users = await fetchUsers();
        renderUserList(state.users);
        updateResultsInfo(state.users.length, state.users.length);
        darkMode();
    } catch (error){
        console.error(error);
        alert("Wystąpił błąd w wyświetleniu listy.");
    }
}
initialize();