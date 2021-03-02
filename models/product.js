import mongoose from 'mongoose';

/**
 * product schema
 */
const productSchema = mongoose.Schema({
          title: {
               type: String,
               required: true
          },
          image: {
               type: String, 
               default: "https://pixabay.com/photos/edsel-ranger-taxi-cab-classic-car-392745/",
          },
          price: {
               type: Number, 
               required: true,
               min: 0
          },
          quantity: {
               type: Number, 
               required: true,
               min: 0,
          },
          category: {
               type: String, 
               required: true
          },
});


productSchema
.virtual('url')
.get(function () {
  return '/products/product/'+this._id;
});


export default  mongoose.model('Product', productSchema);
