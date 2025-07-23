// updated nav
document.addEventListener('DOMContentLoaded', function() {
    // Dati del menu (puoi ottenere questi dati da un'API o da un file JSON)
    const menuItems = [
        { text: "Home", link: "index.html", icon: "home" } /* ToDo: 2. Combine Home and Announcements nav (announcements is a portion within Home) 2. Reroute index.html to login.html or dashboard.html depending on if the user is logged in */,
        { text: "Announcements", link: "dashboard.html", icon: "notifications" },
        { text: "Time Clock", link: "timeClock.html", icon: "schedule" },
        { text: "Calendar", link: "calendar.html", icon: "calendar_today" },
        { text: "Create Event", link: "createEvent.html", icon: "add_circle" },
        { text: "Settings", link: "settings.html", icon: "settings" },
        { text: "User Profile", link: "userProfile.html", icon: "account_circle" }
    ];

    // Funzione per creare il menu
    function createMenu(items) {
        const menu = document.createElement("ul");
        menu.classList.add('menu-list'); // Aggiunto per un targeting migliore
        menu.style.listStyle = "none"; // Rimuove i punti elenco

        items.forEach(item => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = item.link;

            // Aggiungi l'icona
            const icon = document.createElement("span");
            icon.className = "material-icons";
            icon.textContent = item.icon;
            link.appendChild(icon);

            // Aggiungi il testo del menu
            link.append(" " + item.text); // Aggiunge uno spazio tra icona e testo

            listItem.appendChild(link);
            menu.appendChild(listItem);
        });

        return menu;
    }

    // Inserisci il menu nel contenitore
    const menuContainer = document.getElementById("menu-container");
    const myMenu = createMenu(menuItems);
    menuContainer.appendChild(myMenu);

    function toggleMenu() {
        const menuContainer = document.getElementById('menu-container');
        menuContainer.classList.toggle('open');
    }
    
    // Add event listener to the menu button
    document.getElementById('menu-toggle').addEventListener('click', function(e) {
        e.stopPropagation(); // Previene la propagazione dell'evento
        toggleMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const menuContainer = document.getElementById('menu-container');
        const menuButton = document.getElementById('menu-toggle');
        
        if (!menuContainer.contains(event.target) && event.target !== menuButton) {
            menuContainer.classList.remove('open');
        }
    });
});