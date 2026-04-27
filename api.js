const URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers(){
    const response = await fetch(URL);
    if(!response.ok){
        throw new Error("Błąd API");
    }
    return response.json();
}