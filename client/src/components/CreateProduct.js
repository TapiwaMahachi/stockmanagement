import React, { useState } from 'react'
import '../css/create_product.css'
import ProductInputs from './ProductInputs';

 
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
        ok:false,
        failed: false,
        message: '',
    })
    const {ok, failed, message } = success;
 
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
                 setSuccess({...success, ok: true})       
                //reset the input fields
                setProduct({
                    title: '',
                    price: '',
                    quantity: '',
                    category: '', 
                })
            } 
        }
        addProduct()
        .catch(e => 
            setSuccess({...success, message: e.message,failed: true, ok:true})
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
            {ok && <div className={failed?'error':'success'}>
                    {failed ? <p>{message}</p>:<p>Product successfully added</p>}
                   </div>
            }
            <form className="form" onSubmit={handleSubmit}>
                {<ProductInputs handleChange={handleChange} product={product}/>}
                <div className="create__btns">
                    <button type="submit" className="btn-add">Add</button>
                    <button 
                        type="reset"  
                        className="btn-cancel"
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
