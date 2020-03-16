//link data
const noteFile = require("../data/db.json");
//for fs read and write
const fs = require("fs");

//Routing
module.exports = function(app){
    // get request - when user visits page

    app.get("/api/notes", function(req, res) {
        console.log("GET route started");
        //read the db.json file
        fs.readFile("./data/db.json", "utf-8",(err, data)=>{
            if(err) throw err;
            let note;

            try {
                note =[].concat(JSON.parse(data));
            } catch (err){
                note =[];
            }

            res.json(note);
        })
    })

    //Api POST request, when user submits note/ data to server

    app.post("/api/notes", function(req,res){
        console.log("post route started");
        //read JSON file
        fs.readFile("./data/db.json", "utf-8", (err, data)=>{
            //convert to JSON
            let noteArr = JSON.parse(data);
            // add ID
            let currentLength = noteArr[noteArr.length-1].id;
            // add one for the new Id
            let newID = currentLength +1;
            //append new note
            const newNote ={...req.body, id: newID };
            console.log(newNote);

            noteArr = [...noteArr, newNote];

            fs.writeFile("./data/db.json", JSON.stringify(noteArr), err =>{
                if(err) throw err;
                res.json({ success : true, msg: 'new note was created'});

                console.log("note saved", noteArr);
            })
        })
    });

    //delete a specific note by id

    app.delete("api/notes/:id", (req, res)=> {

        let noteID = req.params.id;
        console.log("delete runs", noteID);

        fs.readFile("./data/db.json", "utf-8", (err, data)=>{

            if (err) throw err;

            const noteArr = JSON.parse(data);
            let newArr = noteArr.filter(note=>note.id !=noteID);

            fs.writeFile("./data.db.json", JSON.stringify(newArr, noteFile), (err, data) => {
                if(err) throw err;

                res.json(noteFile);
                console.log("note was deleted", noteID);
            })
        })
    })
   


    
}