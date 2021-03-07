import React,{useEffect, useRef, useState} from 'react'
import {useHistory, useParams } from 'react-router-dom';
import ProductInputs from './ProductInputs';
import {useStateValue} from '../StateProvider';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../css/viewproduct.css';

//configuring toast
toast.configure();

function ViewProduct(props) {
    //get the user
    const [{user},] = useStateValue();
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
        message: ''
    })
    const {err, message} = success;

    //getting id from the url
    const {id} =useParams();
    
    //redirecting 
    const history= useHistory();

    //notification handle
    const notify =msg=>{
        if(err) toast.danger(`Error  ${message}`)
        else toast.success(`Product successfully ${msg} `)
    }

    //getting user input
    const handleChange =e=>{
        e.preventDefault();
        ///name and value of the input field
        const {name, value} =  e.target;
        //setting the property names using computed property names
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
            
                 notify('updated');
                 //reset the input fields
                setProduct({
                    title: '',
                    price: '',
                    quantity: '',
                    category: ''
                })
                //go back to main page
                history.push('/admin/')
                
                //close the compmonent
                props.setView(false)
            } 
        }
        updateProduct()
        .catch(e=> setSuccess({
            ...success, 
            message: e.message, 
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
                notify('deleted');
                props.setView(false);   
            }
        }
        deleteProduct()
        .catch(e =>setSuccess({
            ...success, 
            message:e.message,  
            err: true
        }));  
    };
    //reset and cancel 
    const handleCancel=()=>{
        setSuccess({
            ...success, 
            message:'', 
            err: false
        })
        props.setView(false)
    }

    //populating the input feilds with the product properties
    useEffect(()=>{
        const abort = new AbortController();
        const signal = abort.signal;

        const fetchProduct = async ()=>{
            
            if(id === undefined) return
            const res = await fetch(`/products/product/${id}`,{signal: signal});

            if(res.ok){
                const data = await res.json();
                console.log('Data from the fetched supplier', data)
                setProduct(data);
            }
        }
        fetchProduct()
        .catch(console.log);

        //cleanup
        return ()=> abort.abort();
    },[id])

    //state for the supplier
    const [suppliers,setSuppliers] = useState([]);

    //getting all suppliers
    useEffect(()=>{
        const abort = new AbortController();
        const signal = abort.signal;
        const fetchSupplier = async ()=>{
            const res = await fetch('/suppliers/all',{signal:signal});
            if(res.ok){
                const supplier = await res.json();
                setSuppliers(supplier)
            }
        }
        fetchSupplier()
        .catch(console.log)
        return ()=> abort.abort();
    },[])

    //ref to select tag to get the value
    const suppRef = useRef()

    //adding suppliers to our products
    const addSupplier = async (e)=>{
        e.preventDefault();
         
        const supplierId =suppRef.current.value;
        
        try{
            const res = await fetch(`/suppliers/supplier/product/${id}`,{
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({supplier: supplierId})
            })
            if(res.ok){
                //act here show dialog
            }
        }catch{
           const error = new Error('Cannot Add Supplier');
           console.log(error)
        }
    }

    return (
        <div className="product-details">
          <div className="product-navbar">
              <h1>Product Details</h1>
          </div>
         <div className="create">
            <form className="form" onSubmit={handleSubmit}>
                {<ProductInputs 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} 
                    product={product}
                />
                }
               
            </form> 
            <div className="supplier-view">
                <label>
                    {`Supplier${product.supplier?.length > 1 ? 's': ''}`}
                </label>
                <ul>
                    {
                     product.supplier?.map( sup =><li key={sup?._id}>{sup?.name}</li>)
                    }
                </ul>
               
            </div>
            <form className="add-supplier" onSubmit={addSupplier}>
                <button 
                    className="add-s-btn" 
                    type="submit"
                >
                    Add Supplier
                </button>
                <select name="supplier" ref={suppRef}>
                    {
                        suppliers.map(supplier => 
                        <option 
                            key={supplier._id} 
                            value={supplier._id}
                        >
                            {supplier.name}
                        </option>)
                    }
                </select>
            </form>
             <div className="update">
                    <button 
                        type="submit" 
                        className="btn-add"
                        onClick={handleSubmit}
                        disabled={!user?.admin}
                    >
                        Update Product
                    </button>
                </div>
             <div className="delete-cancel">
                <button 
                    type="submit"  
                    className="btn-delete"
                    onClick={handleDelete}
                    disabled={!user?.admin}
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
        </div>
    )
}

export default ViewProduct

