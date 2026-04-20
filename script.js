const url = "https://jsonplaceholder.typicode.com/users";
async function display() {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
            }

        const users = await response.json();
        
        const List = document.getElementById("list");
        if(users.length > 0){
            List.innerHTML = users.map(user => `
                <li>
                    Imię: <span class="name"> ${user.name} </span>
                    Email: <span class="email"> ${user.email} </span>
                </li>
            `).join("");}
        else{
            List.innerHTML="Nie ma danych w liście"
        }

    } 
    catch (error) {
        console.error(error.message);
  }
}
display();