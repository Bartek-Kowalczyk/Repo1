import {state} from "./state.js";
import {elements} from "./elements.js";
import {fetchUsers} from "./api.js"
import {debounce} from "./utils.js";
import {searchUsers} from "./search.js";
import {renderUserList, updateResultsInfo} from "./render.js";
import {theme} from "./theme.js";
import {showLoader, hideLoader} from "./loader.js";

async function initialize(){
    try {
        showLoader();

        state.users = await fetchUsers();
        renderUserList(state.users);
        updateResultsInfo(state.users.length, state.users.length);

        const debouncedSearch = debounce(searchUsers, 400);
        elements.searchInput.addEventListener("input", debouncedSearch);

        theme();
    }
    catch (err){
        console.error(err);
        alert("Błąd ładowania danych");
    } finally {
        hideLoader();
    }
}

initialize();