import React,{useEffect, useState} from 'react'
import {useHistory, useParams } from 'react-router-dom';
import ProductInputs from './ProductInputs';


function ViewProduct(props) {

    //hook to add a new product
    const [product, setProduct] =useState({
        title: '',
        price: '',
        quantity: '',
        category: '',
    })
    //hook to display a message to the user
    const [success, setSuccess] =useState({
        err: false,
        ok: false,
        message: ''
    })
    const {err, ok, message} = success;

    //getting id from the url
    const {id} =useParams();
    
    //redirecting 
    const history= useHistory();

    //getting user input
    const handleChange =e=>{
        e.preventDefault();
        ///name and value of the input field
        const {name, value} =  e.target;

        setProduct({...product, [name]: value})
    }

    //function to update the product 
    const handleSubmit= e =>{
        e.preventDefault();
        
        //product from user input
        const init={
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        }
        const updateProduct = async()=>{

            const res = await fetch(`/products/product/update/${id}`,init);

            if(res.status===403)
                throw new Error(res.statusText);

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
                //go back to main page
                history.push('/admin/')
            } 
        }
        updateProduct()
        .catch(e=> setSuccess({
            ...success, 
            message: e.message, 
            ok: true, 
            err: true
        }));
      
    }

    //function called to delete the product
    const handleDelete=()=>{
        //delete based on id
        const deleteProduct = async()=>{
            const res = await fetch(`/products/product/delete/${id}`,{
                method: 'delete'
            });
            if(res.status===403)
                throw new Error(res.statusText);

            if(res.ok){
                history.push('/admin')
                props.setView(false);   
            }
        }
        deleteProduct()
        .catch(e =>setSuccess({
            ...success, 
            message:e.message, 
            ok: true, 
            err: true
        }));  
    };
    //reset and cancel 
    const handleCancel=()=>{
        setSuccess({
            ...success, 
            message:'', 
            ok: false, 
            err: false
        })
        props.setView(false)
    }

    //populating the input feilds with the product properties
    useEffect(()=>{
        const fetchProduct = async ()=>{
            
            if(id === undefined) return
            const res = await fetch(`/products/product/${id}`);

            if(res.ok){
                const data = await res.json();
                setProduct(data);
            }
        }
        fetchProduct();
    },[id])

    return (
        <div className="create">
            {ok && 
                <div className={err ?'error':'success'}>
                    <p>{err ? message : "Product SuccessFully Updated"}</p>
                </div>
            }
            <form className="form" onSubmit={handleSubmit}>
                {<ProductInputs 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} 
                    product={product}
                />
                }
                <div className="create__btns">
                    <button 
                        type="submit" 
                        className="btn-add"
                    >
                        Update Product
                    </button>
                </div>
            </form> 
             <div className="create__delete">
                <button 
                    type="submit"  
                    className="btn-delete"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button
                    className="cancel-btn"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ViewProduct

