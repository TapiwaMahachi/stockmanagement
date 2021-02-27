import React from 'react'

function ProductInputs(props) {
    return (
        <div className="create_inputs">
            <label>Title</label>
            <input
                className="inputs"
                value={props.product.title} 
                name="title"
                type="text"
                autoFocus
                required
                onChange={props.handleChange}
            />
            <label>Price</label>
            <input
                className="inputs"
                value={props.product.price} 
                name="price"
                type="number"
                required
                onChange={props.handleChange}
            />
            <label>Quantity</label>
            <input
                className="inputs"
                value={props.product.quantity} 
                name="quantity"
                type="number"
                required
                onChange={props.handleChange}
            />
            <label>Category</label>
            <input
                className="inputs"
                value={props.product.category} 
                name="category"
                type="text"
                required
                onChange={props.handleChange}
            />
        </div>

    )
}

export default ProductInputs
