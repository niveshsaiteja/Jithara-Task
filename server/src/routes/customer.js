const {Router} = require('express')
const { getCustomers } = require('../controlers/customer')
const { getSortedCustomersByDate } = require('../controlers/sortedCustomersByDate')
const { getSortedCustomersByTime } = require('../controlers/sortedCustomersByTime')
const router = Router()

router.get("/get-customers",getCustomers)
router.get("/get-customers-bydate",getSortedCustomersByDate)
router.get("/get-customers-bytime",getSortedCustomersByTime)

module.exports = router