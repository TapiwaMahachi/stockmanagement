import React from 'react'
import { useHistory } from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import '../css/side_nav_bar.css';

function SideNavBar({setView}) {

    const history = useHistory();
    const [{user},] = useStateValue();
   

    return (
        <div className="left">
                <button 
                    className="left__btn"
                    onClick={e=>{
                        setView({viewInventory: true, viewSupplier: false, viewUser: false})
                        history.push('/admin/inventory')
                    }}
                >
                    <p>Inventory</p>
                </button>
                 <button 
                    className="left__btn"
                    onClick={e=>{
                         setView({viewInventory: false, viewSupplier: true, viewUser: false})
                        history.push('/admin/suppliers')
                    }}
                >
                    <p>Supplier</p>
                </button>
                {
                user?.admin &&
                 <button 
                    className="left__btn"
                    onClick={e=>{
                        history.push('/admin/users')
                        setView({viewInventory: false, viewSupplier: false, viewUser: true})
                    }}
                 >
                    <p>Users</p>
                 </button>
                }
            </div>
    )
}

export default SideNavBar
