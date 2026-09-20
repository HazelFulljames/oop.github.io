import { STRINGS } from '../lang/messages/en/user.js';

class UserInterface {
    constructor() {
        this.initializeUI();
    }

    initializeUI() {
        document.getElementById('homePageMessage').textContent = STRINGS.HOME_PAGE_MESSAGE;
        document.getElementById('writerLink').textContent = STRINGS.WRITER;
        document.getElementById('readerLink').textContent = STRINGS.READER;
    }
}


// Entrypoint
new UserInterface();