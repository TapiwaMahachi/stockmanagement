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
               required: true
          },
          quantity: {
               type: Number, 
               required: true
          },
          category: {
               type: String, 
               required: true
          },
});

/**
 * creating the product from schema
 */
export default  mongoose.model('Product', productSchema);
