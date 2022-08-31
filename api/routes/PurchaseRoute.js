const { Router } = require('express')
const PurchaseController = require('../controllers/purchase-controller.js')

const router = Router()
router
    .get('/purchase', PurchaseController.getAllPurchases)
    .get('/purchase/:id', PurchaseController.getPurchaseById)
    .post('/purchase', PurchaseController.createPurchase)
module.exports = router