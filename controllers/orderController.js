const { Order } = require('../models')
const midtransClient = require('midtrans-client');
// Create Core API instance
var coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-3DqVOJVYyMDx9CA475EGPxbr',
    clientKey : 'SB-Mid-client-JwF2T7mkPw2sF5rN'
})
class orderController { 

    static async getAllTranslations(req, res) { 
        try {
            const data = await Order.findAll({})
            res.status(200).json({data})
            console.log(data)
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }

    static chargePayment(req, res, next) { 
        coreApi.charge(req.body)
            .then((chargeResponse)=>{
                console.log('chargeResponse:',JSON.stringify(chargeResponse));
                var dataOrder = {
                    id: chargeResponse.order_id,
                    tiket_id: req.body.tiket_id,
                    nama: req.body.nama,
                    response_midtrans: JSON.stringify(chargeResponse)
                }
                Order.create(dataOrder).then(data => {
                    res.json({
                        status: true,
                        pesan: "Berhasil Pesan",
                        data: data
                    })
                }).catch(err => {
                    res.json({
                        status: false,
                        pesan: "Gagal order " + err.message,
                        data:[]
                    })
                })
            }).catch((e)=>{
                res.json({
                    status: false,
                    pesan: "Gagal order " + e.message,
                    data:[]
                })
        })
    }

    static notif(req, res, next) {
        coreApi.transaction.notification(req.body)
        .then((statusResponse)=>{
            let orderId = statusResponse.order_id;
            let resMid = JSON.stringify(statusResponse)
            Order.update({ response_midtrans: resMd }, {
                where:{id:order_id}
            }).then(() => {
                res.json({
                    status: true,
                    pesan: 'Berhasil notif',
                    data:[]
                })
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    pesan: "Gagal notifikasi " + err.message,
                    data:[]
                })
            })
        });
    }
}

module.exports = orderController