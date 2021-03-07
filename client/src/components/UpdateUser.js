import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import '../css/updateuser.css';
import UserInputs from './UserInputs';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function CreateUser(props) {

    //hook for user
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        admin:false, 
    });
    //display  success or error message
    const [success, setSuccess] =useState({
        err: false,
        message: ''
    })
    const {err, message} = success;
    //notification handle
    const notify=msg=>{
        if(err) toast.danger(`Error ${message}`);
        else toast.success(`User sucessfully ${msg}`)
    }
    //clear the id from url
    const history= useHistory();
    //get the id from url
    const {id} = useParams();

    //get user input 
    const handleChange = e =>{
        e.preventDefault()

        const {name, value} = e.target;

        setUser({...user, [name]: value});
    }
    //function to update user details
    const handleSubmit = async e =>{
        e.preventDefault();
        //user details
        const init ={
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        }
        //add user to db
        const updateUser = async()=>{
            const res = await fetch(`/users/user/update/${id}`,init)

            if(res.status===403)
                throw new Error(res.statusText);

            if(res.ok){
                history.push('/admin');
                notify('updated');
                props.reset();
                //reset the inputs
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    admin: ''
                }) 
            }
        }
        updateUser()
        .catch(e=> setSuccess({
            ...success, 
            message: e.message, 
            err: true
        }));   
    }
    //delete user
    const handleDelete = ()=>{
         //delete based on id
        const fetchProduct = async()=>{
            const res = await fetch(`/users/user/delete/${id}`,{
                method: 'delete'
            });
            if(res.status===403)
                throw new Error(res.statusText);

            if(res.ok){
                history.push('/admin')
                notify('deleted')
                props.reset();
            }
        }
        fetchProduct()
        .catch(e =>setSuccess({
            ...success, 
            message:e.message, 
            err: true
        }));  
    }

    const handleCancel=()=>{
        setSuccess({
            ...success, 
            message:'',  
            err: false
        })
        props.reset();
    }
     
    //get the user based on id from the database
    useEffect(()=>{

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchUser = async()=>{
            if(id === undefined) return
            const res = await fetch(`/users/user/${id}`,{signal:signal});
            if(res.ok){
                const data = await res.json();
                setUser(data)
            }
        }
        fetchUser()
        .catch(console.log);

        return () => controller.abort();

    },[id])

    return (
        <div className="create user-update">
            <form className="form" onSubmit={handleSubmit}>
                <UserInputs 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} 
                    user={user}
                />
                <div className="update">
                    <button 
                        type="submit" 
                        className="btn-add"
                    >
                        Update
                    </button>
                </div>
            </form>
             <div className="delete-cancel">
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

export default CreateUser
