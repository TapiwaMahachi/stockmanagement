import React from 'react'

function UserInputs(props) {
    return (
        <div className="create_inputs">
            <input
                className="inputs"
                value={props.user.name} 
                name="name"
                type="text"
                autoFocus
                required
                placeholder="Enter username"
                onChange={props.handleChange}
            />
            <input
                className="inputs"
                value={props.user.email} 
                name="email"
                type="email"
                required
                placeholder="Enter email"
                onChange={props.handleChange}
            />
            <input
                className="inputs"
                value={props.user.password} 
                name="password"
                type="password"
                required
                placeholder="Enter password"
                onChange={props.handleChange}
            />
            <div className="role">
                <label>Select Role</label>
                <select required name="admin" onChange={props.handleChange}>
                    <option value={false}>user</option>
                    <option value={true}>admin</option>
                </select> 
            </div>
            
         </div>
    )
}

export default UserInputs
