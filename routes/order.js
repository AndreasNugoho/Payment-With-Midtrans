const router = require('express').Router()
const order = require('../controllers/orderController')
const midtransClient = require('midtrans-client')

var coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-3DqVOJVYyMDx9CA475EGPxbr',
    clientKey : 'SB-Mid-client-JwF2T7mkPw2sF5rN'
})
router.get('/', order.getAllTranslations)
router.post('/charge', order.chargePayment)
router.post('/notification', order.notif)


module.exports = router