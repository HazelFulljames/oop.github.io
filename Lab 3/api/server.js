class Server {
    constructor() {
        this.http = require('http');
        this.url = require('url');
        this.utils = require('./modules/utils');
        this.messages = require('./lang/en/en');

        this.PORT = 3000;
        this.HOSTNAME = 'localhost';

        this.server = this.http.createServer((req, res) => {
            // Parse
            const parsedUrl = this.url.parse(req.url, true);
            const pathname = parsedUrl.pathname;
            const query = parsedUrl.query;

            if (pathname === '/getDate') {
                const name = query.name || 'Guest';
                const currentDateTime = this.utils.getDate();
                
                const greetingMessage = `<p style="color: blue;">${this.messages.GREETING} ${name}, ${this.messages.MESSAGE} ${currentDateTime}</p>`;
                
                res.writeHead(200);
                res.end(greetingMessage);
            } else {
                res.writeHead(404);
                res.end('<p style="color: red;">404 - Endpoint not found</p>');
            }
        });
    }

    startServer() {
        this.server.listen(this.PORT, this.HOSTNAME, () => {
            console.log(`Server running at http://${this.HOSTNAME}:${this.PORT}/`);
        });
    }
}


const server = new Server();
server.startServer();
