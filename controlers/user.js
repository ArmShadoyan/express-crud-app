import { UserModel } from "../models/user.js";
import  userSchema  from "../userValidator/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function register (req,res) {

    const result = userSchema.validate(req.body)//for validate user's data following user schema //returns value or error in object
    const {value,error} = result;

    if(error){
        const errorMessage = error.details[0].message;
        res.send(errorMessage);//send problem to user
        return;
    }
    const user = await UserModel.findOne({
        "email":req.body.email
    })
    if(user){
        res.status(400).send("email is already exists");
        return
    }
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.send(newUser);
}

export async function login (req,res){
   try {
        const {email ,password} = req.body;
       
        const user = await UserModel.findOne({
           "email":email
        })//finds the user follwing email, sended from user;
        
        if(!user){
            res.status(400).send("incorrect email")
        }

        const result = bcrypt.compareSync(password,user.password);
        //decoding and compare password //returns true or false

    if(result){

        const token = jwt.sign({ "id":user.id  },"secret") //generating jwt token following user id

        res.status(200).send({
            "message":"you are successfuly logged in",
            "access token":token
        });//sending token to user,for accessing some routs
        
    }else{
        res.status(400).send("incorrect password");
    }  

   }
   catch(e) {
    console.log(e);
   }
}

export async function reset (req,res) {
   const result = req.body

   let {email, oldpassword, newpassword} = result;
        const user = await UserModel.findOne({
        "email":email
   })//finds the user follwing email, sended from user;

   const currentPassword = bcrypt.compareSync(oldpassword,user.password);
    //dehashing password and compareing with old password

   if(currentPassword){
        newpassword = bcrypt.hashSync(newpassword,10)
        //hashing new password
        user.password = newpassword
        await UserModel.findByIdAndUpdate(user.id,user)
        //updateing new password
        res.status(200).send("password succesfuly changed");
        return
   }else{
        res.status(400).send("incorrect password");
   }
}

export async function remove (req,res) {

    try{

        await UserModel.findByIdAndDelete(req.body.id);
        res.send("deleted");

    }catch(e){

        console.log(e);
        res.status(400).send("id not found")
        
    }

}