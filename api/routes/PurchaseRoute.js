const { Router } = require('express')
const PurchaseController = require('../controllers/PurchaseController.js')

const router = Router()
router
    .get('/purchase', PurchaseController.getAllPurchases)
    .get('/purchase/:id', PurchaseController.getPurchaseById)
    .put('/purchase/:id', PurchaseController.updatedPurchase)
    .post('/purchase', PurchaseController.createPurchase)
    .delete('/purchase/:id', PurchaseController.deletePurchase)

module.exports = router