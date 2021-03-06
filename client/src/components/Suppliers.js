import React, { useEffect, useState } from 'react'
import CreateSupplier from './CreateSupplier';

function Suppliers(props) {

    const {isSupplier} = props.navPanel;

    const [suppliers, setSuppliers] = useState([])

    useEffect(()=>{
        const fetchSuppliers = async ()=>{
            const res = await fetch('/suppliers/all');
            if(res.ok){
                const data = await res.json();
                setSuppliers(data);
            }
        }
        fetchSuppliers()
        .catch(console.log)
    },[])
    return (
        <div className="suppliers">
            <div className="supplier-container">
             <div className="admin__title">
             <h2>All Suppliers</h2>
            <div className="admin__btns">
                <button 
                    onClick={e=>props.setNavPanel({
                        ...props.navPanel, 
                        isUser: false, 
                        isAdd:false, 
                        isUpdating:false,
                        isSupplier: true,
                    })}
                >
                    Add New Supplier
                </button>
             </div>
          </div>
          { isSupplier && <CreateSupplier reset={e=>props.setNavPanel({
                ...props.navPanel,
                isSupplier:false
                })}
            />}
            <div className="supplier-view">
                <table>
                    <thead>
                        <tr>
                            <th scope="column" >Name</th>
                            <th scope="column">email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(supplier => <tr 
                        key={supplier._id}
                        className="list"
                        >
                            <td>{supplier.name}</td>
                            <td>{supplier.email}</td>
                        </tr>)}   
                    </tbody>
                </table>
            </div>

            </div>
        </div>
    )
}

export default Suppliers
