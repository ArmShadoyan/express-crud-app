import { CarsModel } from "../models/cars.js";
import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.js";
import CarShema from "../carValidator/cars.js";

export async function get(req,res){
    try{
        const token  = req.body.token;
        const decodedd = jwt.verify(token,"secret")
        const user = await UserModel.findOne({
            "_id":decodedd.id
        })

        const cars = await CarsModel.find();
        res.send(cars); 
    }catch(e){
        console.log(e);
        res.status(403).send("forbidden");
    }
}


export async function remove(req,res) {
    try{
        await CarsModel.findByIdAndDelete(req.body.id);
        res.send("deleted");
    }catch(e){
        res.status(400).send("id not found")
        console.log(e); 
    }
}

export async function update (req,res) {
    try{
        await CarsModel.findByIdAndUpdate(req.body.id, req.body);
        res.status(200).send("updated");
    }catch(e){
        res.status(400).send("id not found")
        console.log(e);
    }
}

export async function add (req,res) {
    const val = CarShema.validate(req.body);//for validate cars data following car schema //returns value or error in object
    const {value,error} = val;

    if(error){
        const errorMessage = error.details[0].message;
        res.send(errorMessage);//send problem to user
        console.log(error);
        return;
    }
    try{
        const cars = new CarsModel(req.body)
        await cars.save();
        res.send(cars);
    }catch(e){
        res.status(400).send("some values is not found");
        console.log(e);
    }  
}