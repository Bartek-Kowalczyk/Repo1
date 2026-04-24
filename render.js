import {elements} from "./elements.js";

function createUserList(user){
    const li = document.createElement("li");
    li.classList.add("list-group-item", "list ('div'); li.classList.add('list-group-item', 'list-group-item-action'");
    email.classList.add("text-muted", "small");
    email.textContent = user.email;

    li.append(name, email);
    return li;
}

export function renderUserList(users){
    elements.list.innerHTML = "";

    if(users.length === 0){
        elements.list.textContent = "Nie ma danych w liście";
        return;
    }

    const fragment = document.createDocumentFragment();
    users.forEach(user => fragment.appendChild(createUserList(user)));
    elements.list.appendChild(fragment);
}

export function updateResultsInfo(filtered, total){
    elements.results.textContent = `Znaleziono: ${filtered} z ${total}`;
}

const name = document.createElement("div");
name.classList.add("fw-semibold");
name.textContent = user.name;