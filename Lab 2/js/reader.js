import { STRINGS } from '../lang/messages/en/user.js';

class Writer {
    constructor() {
       this.messages = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : [];
    }
}

class UserInterface {
    constructor() {
        this.initializeUI();
    }

    initializeUI() {
        this.lastUpdatedElement = document.getElementById('lastUpdated');
        const content = document.getElementById('readerContent');
        const writer = new Writer();
        const messages = writer.messages;
        console.log(messages);

        this.lastUpdatedElement.textContent = `${STRINGS.LAST_UPDATED}${localStorage.getItem('lastUpdate') ? localStorage.getItem('lastUpdate') : 'Never'}`;

        for (var i = 0; i < messages.length; i++) {
            const message = messages[i];
            const messageElement = document.createElement('textarea');
            messageElement.setAttribute('data-index', i);
            messageElement.addEventListener('input', () => this.textAreaChangedHandler(messageElement));
            messageElement.readOnly = true;
            messageElement.textContent = message;

            content.appendChild(messageElement);
            content.appendChild(document.createElement('br'));
        };

        // Every 2 seconds, check for updates in localStorage and update the lastUpdatedElement
        setInterval(() => {
            this.lastUpdatedElement.textContent = `${STRINGS.LAST_UPDATED}${localStorage.getItem('lastUpdate') ? localStorage.getItem('lastUpdate') : 'Never'}`;
            localStorage.setItem('lastUpdate', new Date().toLocaleString());
        }, 2000);

        document.getElementById('home').textContent = STRINGS.HOME;

    }
}


// Entrypoint
new UserInterface();