const path = require("path");


module.exports = function(app){
    // address +/notes responds with notes.html
    app.get("/notes", (req, res)=>{
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    
    });
    // everything else responds with index.html
    app.get("/home",(req, res)=>{
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};