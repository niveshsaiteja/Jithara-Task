import "./index.css"

const RowData = (props)=>{
const {returnObject} = props
const {customerName,id,age,location,phoneNumber,createdDate,createdTime} = returnObject

    return(
        <li className="list-items">
            <span>{id}</span>
            <span>{customerName}</span>
            <span>{age}</span>
            <span>{phoneNumber}</span>
            <span>{location}</span>
            <span>{createdDate.slice(0,10)}</span>
            <span>{createdTime}</span>
        </li>
    )
}

export default RowData