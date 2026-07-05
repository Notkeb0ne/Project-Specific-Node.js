const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {

    let filePath = "./public";

    if (req.url === "/") {
        filePath += "/index.html";
    } else {
        filePath += req.url;
    }

    const ext = path.extname(filePath);

    fs.readFile(filePath, (err, content) => {

        if (err) {

            if (err.code === "ENOENT") {

                fs.readFile("./public/404.html", (error404, page404) => {

                    if (error404) {
                        res.writeHead(404);
                        res.end("404 Not Found");
                    } else {
                        res.writeHead(404, {
                            "Content-Type": "text/html"
                        });
                        res.end(page404);
                    }

                });

            } else {

                res.writeHead(500);
                res.end("Server Error");

            }

        } else {

            res.writeHead(200, {
                "Content-Type": mimeTypes[ext] || "text/plain"
            });

            res.end(content);

        }

    });

});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});