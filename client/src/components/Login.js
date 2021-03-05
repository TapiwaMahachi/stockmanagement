import React, {  useState } from 'react'
import { useHistory } from 'react-router-dom';
import {useStateValue} from '../StateProvider';
import '../css/login.css';

const Login = () => {

     //userdetails.
     const [user , setUser] = useState({
         email: '',
         password: '',
         name:''
     });

     //setting user context 
     const [,dispatch] = useStateValue();

     //state to display error
     const [err, setErr] = useState(false)

     //hook to redirect to admin page
     const history = useHistory();

     //getting values 
     const handleChange =e=>{
          e.preventDefault();
         //getting the name and value from the input
        const {name, value} = e.target;
        //setting the user 
        setUser({...user, [name]: value})
     }

     //login  users 
    const handleSubmit =async e=>{
        e.preventDefault();

        //user details
          const initUser ={
            method: "post",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(user)
        } 

        const loginUser = async()=>{

            const res = await fetch('/users/user/login', initUser);

            if(res.status=== 400)
                throw new Error('Invalid Credentials');

            if(res.ok){
                const data = await res.json();
                //setting our loged in user to the context
                dispatch({
                    type: "USER",
                    user: data,
                })
                //reset the form
                setUser({
                    email: '',
                    password: '',
                    name:''
                });
                history.push('/admin');
            } 
        }
        loginUser()
        .catch(e => setErr(true));  
    }
 
   
    return (
        <section className="login-section">
        <div className="login">
            <form className={`login__container ${err && 'err'}`} onSubmit={handleSubmit}>
                <h1>Get Started.....</h1>
                    <input 
                    type="name" 
                    value={user.name}
                    name="name" 
                    required  
                    placeholder="User Name"
                    onChange={handleChange}
                    />
                <input 
                    type="email" 
                    value={user.email}
                    name="email" 
                    required  
                    placeholder="Email adress"
                    onChange={handleChange}
                    />
                <input 
                    type="password" 
                    value={user.password}
                    name="password" 
                    required 
                    placeholder="Password"
                    onChange={handleChange}
                />
                <span>Passwords need to be at least 6 characters long. </span>
                <button type="submit"  className="signin">Sign In</button>
            </form> 
        </div>
       </section>
    )
}

export default Login
