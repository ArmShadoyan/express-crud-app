import { Schema, model } from "mongoose";

export const Cars = new Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    speed: {
        type: Number,
        required: false
    },
    date: {
        type: String,
        required: false
    },

})

export const CarsModel = model("Cars", Cars) 

