import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema ({
    name: String,
    age: Number,
    email: {
        type: String,
        unique: true
    }
});

const User = model('User', userSchema);

export default User;