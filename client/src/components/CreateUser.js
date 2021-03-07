import React, {useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function CreateUser(props) {

    //hook for user
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    //display a success message
     //hook to display a message to the user
    const [success, setSuccess] = useState({
        error: false,
        message: '',
    })
    const {error, message } = success;
     //notification handle
    const notify =()=>{
        if(error) toast.danger(`Error ${message}`)
        else toast.success('User sucessfully added')
    }
    
    //get user input 
    const handleChange = e =>{
        e.preventDefault()

        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        //user details
        const init ={
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        }
        //add user to db
        try{
            const res = await fetch('/users/register', init);
            if(res.ok){
                notify();
                 //reset the inputs
                setUser({
                    name: '',
                    email: '',
                    password: ''
                })
                props.reset();
            }
        }catch(e){
        setSuccess({...success, message:e, error: true})
       }

       
    }
    return (
        <div className="create">
            <form className="form" onSubmit={handleSubmit}>
                <div className="create_inputs">
                    <input
                        className="inputs"
                        value={user.name} 
                        name="name"
                        type="text"
                        autoFocus
                        required
                        placeholder="Enter username"
                        onChange={handleChange}
                    />
                    <input
                        className="inputs"
                        value={user.email} 
                        name="email"
                        type="email"
                        required
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                    <input
                        className="inputs"
                        value={user.password} 
                        name="password"
                        type="password"
                        required
                        placeholder="Enter password"
                        onChange={handleChange}
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

export default CreateUser
