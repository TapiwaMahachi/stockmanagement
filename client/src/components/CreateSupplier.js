import React, { useState } from 'react'

function CreateSupplier(props) {
    const [supplier, setSupplier] = useState({
        name: '',
        email: '',
    })
    const handleChange =(e)=>{
        e.preventDefault();
        const {name, value}= e.target;
        setSupplier({...supplier, [name]: value});
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const init={
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(supplier)
        }
        const addSupplier = async()=>{
            const res = await fetch('/suppliers/supplier/add',init);
            if(!res.ok) {
               throw new Error(res.statusText);

            }
            else{
                setSupplier({
                    name: '',
                    email: '',
                })
            }
        }
        addSupplier()
        .catch(e => console.log('Error creating supplier', e))
           
    }
    return (
        <div className="create  supplier">
            <form onSubmit={handleSubmit}>
                <div className="create_inputs">
                <input 
                    className="inputs"
                    type="text" 
                    name="name" 
                    value={supplier.name} 
                    required 
                    onChange={handleChange}
                    placeholder="name"
                />
                <input 
                    className="inputs"
                    type="email" 
                    name ="email" 
                    value={supplier.email} 
                    required 
                    onChange={handleChange}
                    placeholder="email"
                />
                </div>
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

export default CreateSupplier
