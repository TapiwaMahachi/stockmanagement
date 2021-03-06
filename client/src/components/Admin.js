import React, {  useState } from 'react'
import {useHistory} from 'react-router-dom';
import '../css/admin.css';
import Inventory from './Inventory';
import Users from './Users';
import SideNavBar from './SideNavBar';
import Suppliers from './Suppliers';




function Admin() {

    //state for managing components to add or edit
    const [navPanel , setNavPanel] = useState({
        isAdd: false,
        isUser: false,
        isUpdating: false,
        isSupplier: false,
        
    })
    //state for managing component to display
    const [view, setView] = useState({
        viewInventory: true,
        viewSupplier: false,
        viewUser: false
    })
    const { viewInventory, viewSupplier, viewUser} = view;

    //hook to add the id to the url
    const history = useHistory();
    
    //function called when you click on the product 
    //displaying a component to update or delete a product
    const handleClick =id=>{
       setNavPanel({
           ...navPanel, 
           isUpdating: true, 
           isUser:false,
           isAdd:false,
           isSupplier: false,
        })
        //adding the id to the url
        history.push(`/admin/${id}`)    
    }
 
    return (
        <section className="admin">
            <SideNavBar setView ={setView} />
            <div className="right">
                <div className="admin__bottom">
                   { viewInventory &&
                    <Inventory 
                        handleClick={handleClick} 
                        navPanel={navPanel}
                        setNavPanel={setNavPanel}
                    />
                   }
                   {
                    viewUser &&<Users 
                        handleClick={handleClick}
                        navPanel={navPanel}
                        setNavPanel={setNavPanel}
                    />
                   }
                   {
                    viewSupplier &&
                    <Suppliers
                        setNavPanel={setNavPanel}
                        navPanel={navPanel}
                        handleClick={handleClick}
                    />
                   } 
                </div>
            </div>
        </section>
    )
}

export default Admin