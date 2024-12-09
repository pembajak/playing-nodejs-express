/**
 * 
 */
export default ({
    router,
    MemberController,
    MemberValidator,
    makeValidatorCallback,
    makeExpressCallback,
    auth,
    upload
}) => {
    router.post(
        '/registration',
        makeValidatorCallback(MemberValidator.validateRegister),
        makeExpressCallback(MemberController.register
        ))
    router.post(
        '/login',
        makeValidatorCallback(MemberValidator.validateLogin),
        makeExpressCallback(MemberController.login
        ))

    router.get(
        '/profile',
        [auth],
        makeExpressCallback(MemberController.getProfile)
    )

    router.put(
        '/profile/update',
        [auth],
        makeExpressCallback(MemberController.updateProfile)
    )

    router.put(
        '/profile/image',
        [auth,upload],
        makeExpressCallback(MemberController.uploadProfile)
    )
    return router
}