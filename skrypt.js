
async function wyswietlanie() {
  const url = "https://jsonplaceholder.typicode.com/users";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
            }

        const users = await response.json();

        console.log(users);

        
        document.getElementById("listah").innerHTML =
        users.map(user => `<li>Imię: ${user.name} Email:    ${user.email}</li>`).join("");

    } 
    catch (error) {
        console.error(error.message);
  }
}
wyswietlanie();