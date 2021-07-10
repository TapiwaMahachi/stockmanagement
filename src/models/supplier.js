import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const supplierSchema = Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    url:{type: String},
})

// supplierSchema
// .virtual('url')
// .get(function(){
//     return `/suppliers/supplier/${this._id}`
// });

export default mongoose.model('Supplier', supplierSchema);