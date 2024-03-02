import axios from 'axios'

import { Component } from 'react'
import RowData from '../RowData';
import "./index.css"


class Customer extends Component{
    state={
        inputValue:'',
        sortBy:'',
        customerDetails:[],
        currentPage:1,
    }

    


    componentDidMount(){
        this.getData('http://localhost:8000/customer/get-customers');
    }

    getData= async (url)=>{
        
          const response = await axios.get(url);
          
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
            sortBy:value,
        })
    }


    prePage=()=>{
        const {currentPage} = this.state
        if(currentPage !== 1){
            this.setState((prevState)=>({
                currentPage:prevState.currentPage -1 ,
            }))
        }
    }

    nextPage=()=>{
        const {currentPage} = this.state
        if(currentPage !== 3){
            this.setState((prevState)=>({
                currentPage:prevState.currentPage +1 ,
            }))
        }
    }

    changeCPage=(id)=>{
        this.setState({
            currentPage:id,
        })
    }


    

    render(){

        const {inputValue,sortBy,customerDetails,currentPage} = this.state
        let SearchList = customerDetails.filter((obj)=>obj.customerName.toLowerCase().includes(inputValue.toLowerCase()) || obj.location.toLowerCase().includes(inputValue.toLowerCase()))
        if(sortBy!=''){
            this.getData(`http://localhost:8000/customer/get-customers-by${sortBy}`);
        }

        const recordsPerPage = 20;
        const lastIndex = currentPage*recordsPerPage;
        const firstIndex = lastIndex-recordsPerPage;
        const records = SearchList.length === 0 ? customerDetails.slice(firstIndex,lastIndex) : SearchList.slice(firstIndex,lastIndex)
        const npage = Math.ceil(SearchList.length === 0 ? customerDetails.length/recordsPerPage : SearchList.length/recordsPerPage)
        const numbers = [...Array(npage+1).keys()].slice(1)

        return(
            <div className='main-cont'>
                <h1 className='heading'>PERN Application</h1>
            <div className='search-cont'>
                <input placeholder='Search here' className='search-bar' type="search" onChange={this.onChangeInputValue} value={inputValue} />
                <select className='sort-bar' value={sortBy}  onChange={this.onChangeSortByOption}>
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
            <span>Date</span>
            <span>Time</span>
            </li>
                
                {SearchList.length ===0? (records.map(obj=>(
                    <RowData key={obj.id} returnObject = {obj}/>
                ))):(records.map(obj=>(
                    <RowData key={obj.id} returnObject = {obj}/>
                )))}
            </div>
            <nav className='navbar'>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={this.prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n,i)=>(
                            <li className={`page-link ${currentPage === n ? 'active ' : ''}`} key={i}>
                                <a href='#' className={`page-item ${currentPage === n ? 'text-white' : ''}`} onClick={()=> this.changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <a href="#" className='page-link' onClick={this.nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
            </div>
        )
    }
}



export default Customer