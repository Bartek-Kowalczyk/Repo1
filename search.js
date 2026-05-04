import {state} from "./state.js";
import {elements} from "./elements.js";
import {renderUserList, updateResultsInfo} from "./render.js";

function filterUsers(users, query){
    if (!query) return [...users];

    return users.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
}

export function sortUsers(users){
    return [...users].sort((a, b) => 
        state.sortDirection === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
    );
    console.log("Sortowanie");
}

export function searchUsers(){
    const query = elements.searchInput.value.toLowerCase().trim();

    let result = filterUsers(state.users, query);
    result = sortUsers(result);

    renderUserList(result);
    updateResultsInfo(result.length, state.users.length);
}

export function toggleSort(){
    state.sortDirection =
    state.sortDirection === "asc" ? "desc" : "asc";

    searchUsers();
}