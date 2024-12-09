
/**
 * response api
 */
class ApiSuccess {

    status = 0;
    message = "sukses"
    data = null

    constructor(status,message,data){
        this.status = status
        this.message = message
        this.data = data
    }

    static DataInstance (data){
        return new ApiSuccess(0,"sukses",data)
    }
    static MessageInstance (message){
        return new ApiSuccess(0,message,null)
    }

    static MessageDataInstance (message,data){
        return new ApiSuccess(0,message,data)
    }
}


export {
    ApiSuccess
}