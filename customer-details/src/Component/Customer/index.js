import axios from 'axios'

import { Component } from 'react'
import RowData from '../RowData';
import "./index.css"


class Customer extends Component{
    state={
        inputValue:'',
        sortBy:'',
        customerDetails:[]
    }

    componentDidMount(){
        this.getData();
    }

    getData= async ()=>{
        
          const response = await axios.get('http://localhost:8000/customer/get-customers');
          
           const fetchedData = response.data.customers
        if (response.status === 200) {
        
            const updatedData = fetchedData.map((customer) => ({
              customerName:customer.customer_name,
              createdDate: customer.created_date,
              createdTime: customer.created_time,
              id: customer.sno,
              phoneNumber: customer.phone,
              age: customer.age,
              location:customer.location,
            }));

            this.setState({
              customerDetails: updatedData,
            });
          }

    }


    onChangeInputValue=(event)=>{
        const value = event.target.value;
        this.setState({
            inputValue:value
        })
    }

    onChangeSortByOption=(event)=>{
        const value = event.target.value;
        this.setState({
            sortBy:value
        })
    }
    

    render(){

        const {inputValue,sortBy,customerDetails} = this.state
        let SearchList = customerDetails.filter((obj)=>obj.customerName.toLowerCase().includes(inputValue.toLocaleLowerCase() || obj.location.toLowerCase().includes(inputValue.toLocaleLowerCase())))
       
        return(
            <div className='main-cont'>
            <div className='search-cont'>
                <input className='search-bar' type="search" onChange={this.onChangeInputValue} value={inputValue} />
                <select className='sort-bar' value={sortBy} >
                    <option value=''>Default</option>
                    <option value="date">sort by Date</option>
                    <option value="time">sort by time</option>
                </select>
            </div>
            <div className='items-container'>
                 <li className="list-items bold">
            <span>Sno</span>
            <span>Customer Name</span>
            <span>Age</span>
            <span>Number</span>
            <span>location</span>
            <span>created at Date</span>
            <span>created at Time</span>
            </li>
                
                {SearchList.length ===0? (customerDetails.map(obj=>(
                    <RowData key={obj.id} returnObject = {obj}/>
                ))):(SearchList.map(obj=>(
                    <RowData key={obj.id} returnObject = {obj}/>
                )))}
            </div>
            </div>
        )
    }
}



export default Customer