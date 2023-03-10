

const sendToken = (user , statusCode , res)=>{
    const token = user.getJwtToken();

    //options for cookie
    const AccessToken = {
        expires:new Date(Date.now()+ 5 * 24 * 60 * 60 *1000),
        httpOnly:true,
    };

    res.status(statusCode).cookie('token',token,AccessToken).json({
        success:true,
        token:token,
        user
    });
}

module.exports = sendToken;