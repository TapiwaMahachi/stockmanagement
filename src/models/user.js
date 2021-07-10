import mongoose from "mongoose"; 
import bcrypt from  'bcryptjs';

const SALT_ROUNDS = 10;
/**
 * user schema 
 */
const userSchema = new mongoose.Schema({
    name: {type: String,required: true,},
    email: {type: String, required: true},
    password: {
        type: String, 
        required: true,
        min: 6,
        max: 1024,
    },
    date: { type: Date, default: Date.now,},
    admin:{type: Boolean, default: false,}
   },{
    timestamps: true
});

//remove the password property when serializing doc to JSON
userSchema.set('toJSON', {
    transform: (doc, ret)=>{
        delete ret.password;
        return ret;
    }
});

//check if the password has been modifiied
// userSchema.pre('save', function(next){

//     if(!this.isModified('password')) return next();
//     //password has changed - salt and hash it
//     bcrypt.hash(this.password, SALT_ROUNDS, (err, hash)=>{
//         if(err) return next(err);
//         this.password= hash;
//         next();
//     });
// });

// //comparing password
// userSchema.methods.comparePassword =function(tryPassword, cb){
//     bcrypt.compare(tryPassword, this.password, cb);
// };

//used when redirecting from the backend
userSchema
.virtual('url')
.get(function () {
  return '/users/user/'+this._id;
});

export default  mongoose.model('User', userSchema);
  