import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true,
        min: 6,
        max: 1024,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    admin:{
        type: Boolean,
        default: false,
    }
});

export default  mongoose.model('User', userSchema);
  