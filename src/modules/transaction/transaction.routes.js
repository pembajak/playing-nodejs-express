/**
 * Transaction router
 */
export default ({ router,
    TransactionController,
    TransactionValidator,
    makeValidatorCallback,
    makeExpressCallback,
    auth }) => {
    router.get('/balance',
        [auth],
        makeExpressCallback(TransactionController.getBalance)
    )
    //topup
    router.post('/topup',
        [auth],
        makeValidatorCallback(TransactionValidator.validateTopup),
        makeExpressCallback(TransactionController.doTopup)
    ),
    //transaction
    router.post('/transaction',
        [auth],
        makeExpressCallback(TransactionController.doTransaction)
    )
    router.get('/transaction/history',
        [auth],
        makeExpressCallback(TransactionController.doGetTransaction)
    )
    return router
}