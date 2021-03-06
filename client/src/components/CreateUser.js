import React, {useState} from 'react'

function CreateUser(props) {

    //hook for user
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    //display a success message
    const [ok, setOk] = useState(false);

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
            if(res.ok) setOk(!ok)
        }catch(e){console.log(e)}

        //reset the inputs
        setUser({
            name: '',
            email: '',
            password: ''
        })
    }
    return (
        <div className="create">
            <form className="form" onSubmit={handleSubmit}>
                {ok && <div className='success'><p>User successfully created</p></div>}
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
