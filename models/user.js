import { Schema,model } from "mongoose";
import * as bcrypt from "bcrypt";

export const User = new Schema ({
    name: {
        type: String,
        required: false
    },
    surname: {
        type: String,
        required: false
    },
    login: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
});

User.pre("save",async function (next) {
    try{
        const hashedPassword = bcrypt.hashSync(this.password,10)//hashing password
        this.password = hashedPassword;
        next();
    }catch(err){
        console.log(err);
    }
})

export const UserModel = model("User",User)