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
        const content = document.getElementById('writerContent');
        const writer = new Writer();
        const messages = writer.messages;
        console.log(messages);

        this.lastUpdatedElement.textContent = `${STRINGS.LAST_UPDATED}${localStorage.getItem('lastUpdate') ? localStorage.getItem('lastUpdate') : 'Never'}`;

        for (var i = 0; i < messages.length; i++) {
            const message = messages[i];
            const messageElement = document.createElement('textarea');
            messageElement.setAttribute('data-index', i);
            messageElement.addEventListener('input', () => this.textAreaChangedHandler(messageElement));
            messageElement.textContent = message;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = STRINGS.DELETE;
            deleteButton.setAttribute('data-index', i);
            deleteButton.addEventListener('click', () => this.deleteButtonClickHandler(deleteButton));

            content.appendChild(messageElement);
            content.appendChild(deleteButton);
            content.appendChild(document.createElement('br'));
        };

        const addButton = document.createElement('button');
        addButton.textContent = STRINGS.ADD_MESSAGE;
        addButton.addEventListener('click', this.addButtonClickHandler);
        content.appendChild(addButton);

        document.getElementById('home').textContent = STRINGS.HOME;

    }

    textAreaChangedHandler(textArea) {
        const index = textArea.getAttribute('data-index');
        const currentMessages = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : [];
        currentMessages[index] = textArea.value;
        localStorage.setItem('messages', JSON.stringify(currentMessages));
        localStorage.setItem('lastUpdate', new Date().toLocaleString());
        this.lastUpdatedElement.textContent = `${STRINGS.LAST_UPDATED}${localStorage.getItem('lastUpdate')}`;

    }

    addButtonClickHandler() {
        const currentMessages = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : [];
        currentMessages.push(STRINGS.NEW_MESSAGE);
        localStorage.setItem('messages', JSON.stringify(currentMessages));
        localStorage.setItem('lastUpdate', new Date().toLocaleString());
        location.reload();
    }

    deleteButtonClickHandler(button) {
        const index = button.getAttribute('data-index');
        const currentMessages = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : [];
        currentMessages.splice(index, 1);
        localStorage.setItem('messages', JSON.stringify(currentMessages));
        localStorage.setItem('lastUpdate', new Date().toLocaleString());
        location.reload();
    }
}


// Entrypoint
new UserInterface();