import mongoose from 'mongoose';

//creating our product schema
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

//exporting  the model 
export default  mongoose.model('Product', productSchema);
