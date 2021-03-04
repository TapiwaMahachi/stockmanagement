import mongoose from 'mongoose';
 const Schema = mongoose.Schema;
/**
 * product schema
 */
const productSchema =Schema({
          title: { type: String, required: true },
          image: {
               type: String, 
               default: "https://pixabay.com/photos/edsel-ranger-taxi-cab-classic-car-392745/",
              },
          price: { type: Number,  required: true, min: 0 },
          quantity: {type: Number, required: true,  min: 0, },
          category: {type: String, required: true},
          threshold: { type:Number,min: 0, default: 0 },
          supplier: [{type: Schema.ObjectId , ref: 'Supplier'}],

});


productSchema
.virtual('url') 
.get(function () {
  return '/products/product/'+this._id;
});


export default  mongoose.model('Product', productSchema);
