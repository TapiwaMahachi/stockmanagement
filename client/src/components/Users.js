import React, { useEffect, useState } from 'react';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';


function Users(props) {

    const {isUser, isUpdating} = props.navPanel;
    
    const [users, setUsers] = useState([]);

    //get all the users from the database
    const fetchUsers = async () =>{
        const res = await fetch('/users/all');
        if(res.ok){
            const data = await res.json();
            setUsers(data);
        }
    }
    useEffect(()=>{
    
        fetchUsers()
        .catch(console.log)

    },[])

    return (
        <>
          <div className="admin__title">
            <h2>All Users</h2>
            <div className="admin__btns">
                <button 
                    onClick={e=>props.setNavPanel({
                        ...props.navPanel, 
                        isUser:true, 
                        isAdd:false, 
                        isUpdating:false
                    })}
                >
                    Create New User
                </button>
            </div>
        </div>
        {isUser && 
            <CreateUser reset={e=>props.setNavPanel({
                ...props.navPanel,
                isUser:false
                })}
            />
        }
        {isUpdating&& 
            <UpdateUser reset={e=>props.setNavPanel({
                ...props.navPanel,
                isUpdating:false
            })}
            />
        }
        <table className=" admin__list">
            <thead className="headers">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => 
                <tr 
                    key={user._id} 
                    className="product__list"
                    onClick={e =>props.handleClick(user._id)}
                >
                        <td >{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.admin ?"admin":"user"}</td>
                    </tr>
                )}
            </tbody>
        </table>   
        </>
    )
}

export default Users
