const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static("public"));
app.get("/", (req, res) => {
});

app.listen(port,()=>{
    console.log(`Puerto corriendo en ${port}\n htpp://localhost:3000`);
});