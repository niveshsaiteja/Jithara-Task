const db = require('../db')

exports.getSortedCustomersByDate = async (req,res)=>{
    try{
       const {rows} = await db.query('select * from customer order by created_date')
       
       return res.status(200).json({
        success:true,
        customers:rows,
        
       })
      
       
    }
    catch(error){
        console.log(error.message)
    }
}