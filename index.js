import express from "express";
import mongoose, { mongo } from "mongoose";
import cars from "./routes/cars.js";
import user from "./routes/user.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { Server } from "socket.io";
import  {createServer} from "http"

const app = express(); 
const server = createServer(app)


server.listen(5000)
const io = new Server(server)


const db = "mongodb+srv://armenshadoyan2022:armmongodb2023@cluster0.ok6ihnl.mongodb.net/?retryWrites=true&w=majority"
const __dirname = dirname(fileURLToPath(import.meta.url));

mongoose
    .connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
    .then((res) => console.log("connected to db"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: false,limit:"200mb"}));

app.use("/cars", cars);
app.use("/users",user);

app.get("/chat",function(req,res) {
     res.sendFile(__dirname + "/browser/index.html")
});

app.use(express.static(__dirname + "/browser"))


io.on("connection",(socket) => {
    console.log("connected")
    socket.on("chat message",(data) => {
        let {message,name} = data;
        io.emit("chat message",{
            message,
            name,
        })
    })
})


