const express = require("express");
const PORT = process.env.PORT || 4500;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());


require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


app.listen(PORT, () =>{
    console.log(`Server is listening to port: ${PORT}`);
});






