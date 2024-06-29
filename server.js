require("dotenv").config();
const express = require("express");
const cors = require('cors')
const app = express();
const router = require("./router/auth-router");
const connectDB = require("./utils/db");

// const corsOptions = {
//     origin: "http://localhost:3000",
//     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//     Credential: true,
// }
app.use(cors()) //prove security k ek game to mathi request acceept na kare2
app.use(express.json());
app.use("/api/auth", router);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running`);
    });
});


//http://localhost:5000/api/auth/register


// {
//     "username": "dhruvingabani",
//     "email":"dhruvin5@gamil.com",
//     "phone":"4545455",
//     "password":"qwerty124"
// }

// app.get("/", (req, res) => {
//     res.status(200).send("welcome to wolrd best ");
// })

// app.get("/register", (req, res) => {
//     res.status(200).send("welcome to register best ");
// })