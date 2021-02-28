import React,{useState,useEffect} from 'react';
import UpdateProduct from './UpdateProduct';
import CreateProduct from './CreateProduct';
import Pusher from 'pusher-js';


//functions to use when filtering products based on quantity
const FILTER_MAP ={
    All: prod => prod.quantity >= 0,
    Low: prod => prod.quantity <= 10,
    Art: prod => prod.category === 'Art',
    Vintage: prod=> prod.category === 'Vintage',
    Classic: prod =>prod.category ==='Classic'
}

//array of filter names
const FILTER_NAMES = Object.keys(FILTER_MAP);

function Products(props) {
      
    //properties for updating and deleting components
    const {isAdd, isUpdating} = props.navPanel;

      //hook for all products
    const [data, setData] =useState([]);

   //hook to filter products
    const [filter, setFilter] = useState('All');

    //filter between all stock and low stock
    const handleFilter=e=>{
        e.preventDefault();
        setFilter(e.target.value);
    }
    //fetching data from the api
    const fetchData = async ()=>{
        const res = await fetch('/products/all'); 
        if(res.ok) {
            const prod = await res.json()
            setData(prod)
        }   
    }
    //fetch all data on mount
    useEffect(()=>{

        fetchData()
        .catch(console.log)

    },[data]);

    //updating our component in real time
    useEffect(()=>{
        const pusher = new Pusher('e6ecd84fa30f782c06ae', {
             cluster: 'mt1'
        });

        const channel = pusher.subscribe('product');
        channel.bind('inserted', function(prod) {
         setData([...data, prod])
        });
        return () =>{
            channel.unbind_all();
            channel.unsubscribe();
        }
    },[data])

    return (
        <>
            <div className="admin__top">
               <div className="admin__title">
                <h2>Inventory Summary</h2>
                <div className="admin__btns">
                    <button 
                        onClick={e=>props.setNavPanel({
                            ...props.navPanel,
                            isAdd:true,
                            isUser:false, 
                            isUpdating:false
                        })}
                    >
                         Add New Product
                    </button>
                    <select name="filter" onChange={handleFilter}>
                        {FILTER_NAMES.map(name =>
                            <option 
                                key={name} 
                                value={name} 
                                defaultValue>{`${name} Stock`}
                            </option>
                        )}
                    </select>
                </div>
            </div>
            {isAdd && 
                <CreateProduct 
                    reset={e=>props.setNavPanel({
                        ...props.navPanel, 
                        isAdd:false
                    })}
                />
             }
            {isUpdating && 
                <UpdateProduct 
                  reset={e=>props.setNavPanel({
                      ...props.navPanel,
                      isUpdating:false
                    })}
                />
            }
            </div>
            <table className=" admin__list">
                <thead className="headers">
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col"> Category</th>
                    </tr>
                </thead>
                <tbody>
                    {data.filter(FILTER_MAP[filter]).map(prod => 
                        <tr 
                            key={prod._id} 
                            className="product__list"
                            onClick={()=>props.handleClick(prod._id)}
                        >
                            <td >{prod.title}</td>
                            <td>{prod.quantity}</td>
                            <td>{prod.price}</td>
                            <td>{prod.category}</td>
                        </tr>
                    )}
                </tbody>
            </table>  
        </>
    )
}

export default Products
