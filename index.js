const fs = require("fs");
const http = require("http");

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
};

// incoming server mit request handler erstellen
const server = http.createServer( (
    request, 
    response
    ) => {
    console.log("new client request: ", request.url, request.method);

    if (request.url === "/api/guest_entries"){
        readFile("./entries.json")
            .then(file => {
                response.write(file); 
                response.end()})
            .catch(err => console.log(err));
    } else {
        // File Server welcher Dateien aus einem lokalen "public" Ordner anhand des Pfades liefert,
        // indem es aus der route bzw. url einen relativen pfad erzeugt
        const filePath = request.url === "/" ? "./public/pages/home.html" : `./public${request.url}`; 
        readFile(filePath)
            .then(file => {
                response.write(file);
                response.end();
            })
            .catch((err) => {
                console.log("Seite nicht gefunden", err);
                response.writeHead(301, { Location: `/pages/error.html` }).end();
        });
    }
});

// port für server listener bestimmen
const PORT = 8080; 
server.listen(PORT, () => console.log("Server ready at port: ", PORT));
