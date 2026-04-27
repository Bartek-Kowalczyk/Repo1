import {elements} from "./elements.js";

export function showLoader(){
    elements.loader.classList.remove("hidden");
    elements.list.classList.add("hidden");
}

export function hideLoader(){
    elements.loader.classList.add("hidden");
    elements.list.classList.remove("hidden");
}