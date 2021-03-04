import mongoose from "mongoose"; 

/**
 * user schema 
 */
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

userSchema
.virtual('url')
.get(function () {
  return '/users/user/'+this._id;
});


export default  mongoose.model('User', userSchema);
  