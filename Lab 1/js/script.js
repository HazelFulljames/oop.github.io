import { STRINGS } from '../lang/messages/end/user.js';

class Helper {
    constructor() {}
    
    // Get a random color in hex format, because it's funny to do it this way and I'm bored
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

class AppController {
    constructor() {
        this.currentButton = 1;
        this.totalButtons = 0;
    }
    
    createButtons(amount) 
    {
        this.totalButtons = amount;
        // Step 1: Make N buttons with random colors and a size of 5em by 10em in a row
        let buttons = [];
        const container = document.getElementById('buttonContainer');

        for (let i = 0; i < amount; i++) {
            const button = document.createElement('button');
            button.style.width = '10em';
            button.style.height = '5em';
            button.style.backgroundColor = new Helper().getRandomColor();
            button.disabled = true;
            button.textContent = `${i + 1}`;
            button.id = `${i + 1}`;
            button.onclick = () => this.checkButtonOrder(button);
            container.appendChild(button);
            buttons.push(button);
        }

        // Step 2: Hide all elements with ids "prompt", "buttonCount", and "go"
        document.getElementById('prompt').style.display = 'none';
        document.getElementById('buttonCount').style.display = 'none';
        document.getElementById('go').style.display = 'none';

        // Step 3: Wait N seconds where N is the number of buttons
        setTimeout(() => {
            // Step 4: Shuffle the buttons to random locations on the screen N times, pause for 2 seconds in between each shuffle
            buttons.forEach(button => button.textContent = "");
            this.shuffleButtons(buttons);
            let shuffleCount = 0;
            const shuffleInterval = setInterval(() => {
                this.shuffleButtons(buttons);
                shuffleCount++;
                if (shuffleCount >= amount - 1) {
                    clearInterval(shuffleInterval);
                }
            }, 2000);
        }, amount * 1000);
        setTimeout(() => {
            buttons.forEach(button => button.disabled = false);
        }, amount * 1000 * 3);
    }

    // Step 6: Check the order    
    checkButtonOrder(button) {
        
        const buttonId = parseInt(button.id);
        if (parseInt(buttonId) == this.currentButton) {
            button.textContent = buttonId;
            this.currentButton++;
            if (this.currentButton > this.totalButtons) {
                alert(STRINGS.WIN_MESSAGE);
                location.reload();
            }
        } else {
            alert(STRINGS.WRONG_ORDER);
            document.querySelectorAll('button').forEach(button => button.textContent = button.id);
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    }

    // Set the location of all elements in the given array to a random position within the screen
    shuffleButtons(buttons) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        buttons.forEach(button => {
            const randomX = Math.floor(Math.random() * (screenWidth - button.offsetWidth));
            const randomY = Math.floor(Math.random() * (screenHeight - button.offsetHeight));
            button.style.position = 'absolute';
            button.style.left = `${randomX}px`;
            button.style.top = `${randomY}px`;
        });
    }
}

class UserInterface {
    constructor() {
        this.rootElement = document.getElementById('buttonContainer');
        this.appController = new AppController();
        this.initializeUI();
    }

    initializeUI() {
        const text = document.createElement('p');
        text.id = 'prompt';
        text.textContent = STRINGS.PROMPT;
        this.rootElement.appendChild(text);

        const input = document.createElement('input');
        input.id = 'buttonCount';
        this.rootElement.appendChild(input);

        const button = document.createElement('button');
        button.id = 'go';
        button.textContent = STRINGS.BUTTON_TEXT;
        button.onclick = () => {
            const amount = parseInt(input.value);
            if (!isNaN(amount) && amount >= 3 && amount <= 7) {
                this.appController.createButtons(amount);
            } else {
                alert(STRINGS.INVALID_BUTTON_COUNT);
            }
        };
        this.rootElement.appendChild(button);
    }
}


// Entrypoint
new UserInterface();