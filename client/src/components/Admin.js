import React, {  useState } from 'react'
import {button, useHistory} from 'react-router-dom';
import '../css/admin.css';
import Inventory from './Inventory';
import Users from './Users';
import { useStateValue } from '../StateProvider';




function Admin() {

   //get user from the context
   const [{user},]= useStateValue();

    const [navPanel , setNavPanel] = useState({
        isAdd: false,
        isUser: false,
        isUpdating: false,
        isInventory: true,
    })
    const { isInventory} = navPanel;

    //hook to add the id to the url
    const history = useHistory();
    
    //function called when you click on the product 
    //displaying a component to update or delete a product
    const handleClick =id=>{
       setNavPanel({
           ...navPanel, 
           isUpdating: true, 
           isUser:false,
           isAdd:false
        })
        //adding the id to the url
        history.push(`/admin/${id}`)    
    }
 
    return (
        <section className="admin">
            <div className="left">
                <button 
                    className="left__btn"
                    onClick={e=>{
                        history.push('/admin/inventory')
                        setNavPanel({
                            ...navPanel, 
                            isInventory: true, 
                            isUser:false, 
                            isUpdating: false, 
                            isAdd:false
                        })
                    }}
                >
                    <p>Inventory</p>
                </button>
                {
                user?.admin &&
                 <button 
                    className="left__btn"
                    onClick={e=>{
                        history.push('/admin/users')
                        setNavPanel({
                            ...navPanel, 
                            isInventory: false, 
                            isUser:false,
                            isUpdating:false
                        }) }
                    }
                 >
                    <p>Users</p>
                 </button>
                }
            </div>
            <div className="right">
                <div className="admin__bottom">
                    {isInventory ?
                    <Inventory 
                        handleClick={handleClick} 
                        navPanel={navPanel}
                        setNavPanel={setNavPanel}
                    />
                    :<Users 
                        handleClick={handleClick}
                        navPanel={navPanel}
                        setNavPanel={setNavPanel}
                    />
                    }
                </div>
            </div>
        </section>
    )
}

export default Admin