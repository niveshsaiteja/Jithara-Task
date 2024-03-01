const db = require('../db')

exports.getCustomers = async (req,res)=>{
    try{
       const {rows} = await db.query('select * from customer')
       
       return res.status(200).json({
        success:true,
        customers:rows,
        
       })
      
       
    }
    catch(error){
        console.log(error.message)
    }
}