import React,{useState,useEffect} from 'react';
import CreateProduct from './CreateProduct';
import Pusher from 'pusher-js';
import ViewProduct from './ViewProduct';
import { useHistory } from 'react-router-dom';


//functions to use when filtering 
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
    const {isAdd} = props.navPanel;

      //hook for all products
    const [data, setData] =useState([]);
    //state for viewing product
    const [view, setView] = useState(false);

   //hook to filter products
    const [filter, setFilter] = useState('All');

    //state for rerouting
    const history= useHistory();
    //filtering based on category
    const handleFilter=e=>{
        e.preventDefault();
        setFilter(e.target.value);
    }
    //fetching data from the api
  
    //fetch all data
    useEffect(()=>{
        const abort = new AbortController();
        const signal = abort.signal;

        const fetchData = async ()=>{
        const res = await fetch('/products/all',{signal: signal}); 
        if(res.ok) {
            const prod = await res.json()
            setData(prod)
        }   
      }

        fetchData()
        .catch(console.log)
        
        //cleanup
     return ()=> abort.abort();
     
    },[data]);
    
   
    //updating our component in real time
    useEffect(()=>{
        const pusher = new Pusher('e6ecd84fa30f782c06ae', {
             cluster: 'mt1'
        });
      
        const channel = pusher.subscribe('product');
        channel.bind('inserted', function(prod) {
         setData(data =>[...data, prod])
        });
      return () =>{
          channel.unbind_all();
          channel.unsubscribe();
      }
    },[])

    return (
        <>
        {view ? <ViewProduct setView={setView} /> :
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
                            isUpdating:false,
                            isSupplier: false
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
                            className="list"
                            //onClick={()=>props.handleClick(prod._id)}
                            onClick={e =>{
                                history.push(`/admin/${prod._id}`)
                                setView(true)}}
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
        } 
        </>
    )
}

export default Products
