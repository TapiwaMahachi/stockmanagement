import React, { useState } from 'react'
import '../css/create_product.css'
import ProductInputs from './ProductInputs';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function CreateProduct(props) {

    //hook to add a new product
    const [product, setProduct] =useState({
        title: '',
        price: '',
        quantity: '',
        category: '',
    })
    //hook to display a message to the user
    const [success, setSuccess] = useState({
        error: false,
        message: '',
    })
    const {error, message } = success;
    
    //notification handle
    const notify =()=>{
        if(error) toast.danger(`Error ${message}`)
        else toast.success('Product sucessfully added')
    }
    //function to add the product to the datatbase
    const handleSubmit= async e =>{
        e.preventDefault();
        
        //product from user input
        const init={
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        }
        const addProduct = async ()=>{
            const res = await fetch('/products/add',init);

            if(res.status === 403)
                throw new Error(res.statusText)
            
            if(res.ok){
                //display success message to the user
                  notify();    
                //reset the input fields
                setProduct({
                    title: '',
                    price: '',
                    quantity: '',
                    category: '', 
                })
                props.reset();
            } 
        }
        addProduct()
        .catch(e => 
            setSuccess({...success, message: e.message,error: true})
        )  
    }

      //getting user input
    const handleChange =e=>{
        e.preventDefault();
        const {name, value} =  e.target;
        setProduct({...product, [name]: value})
    }

    return (
        <div className="create">
            <form className="form" onSubmit={handleSubmit}>
                {<ProductInputs handleChange={handleChange} product={product}/>}
                <div className="create-btns">
                    <button type="submit" className="btn-add">Add</button>
                    <button 
                        type="reset"  
                        className="cancel-btn"
                        onClick={props.reset}
                    >
                        Cancel
                    </button>
                </div>
            </form> 
        </div>
    )
}

export default CreateProduct
