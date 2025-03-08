import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema ({
    name: String,
    message: String,
    phone: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        unique: true
    }
});

const User = model('User', userSchema);

export default User;