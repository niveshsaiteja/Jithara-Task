const {Router} = require('express')
const { getCustomers } = require('../controlers/customer')
const router = Router()

router.get("/get-customers",getCustomers)

module.exports = router