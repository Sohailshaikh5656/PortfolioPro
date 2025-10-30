let en = require("../language/en");
let ar = require("../language/ar");
const Validator = require('Validator');
const { response } = require('express');
const responseCode = require("../utilites/responseCode")
let bypassMethods = ["signup","login","verifyOTP","resendOTP","forgetPassword","resetPassword","adminLogin","addAdmin"];
const common = require('../utilites/common');
const { t, default: localizify } = require('localizify');
let middleware = {
    
    checkValidationRules: function (req, res, request, rules, message, keywords) {
        const v = Validator.make(request, rules, message, keywords);
        if (v.fails()) {
            const errors = v.getErrors();  // Fetch all errors correctly
            console.log("Validation Errors:", errors);
    
            let errorMessage = Object.values(errors)[0][0]; //  Extract first error
    
            res.send({  //  Send response
                code: 0,
                message: errorMessage
            });
    
            return false;  //  Stop execution
        }
    
        return true;
    },        

    sendResponse : function(req,res,message){
        //console.log(req.language);
        this.getMessage(req.language, { keyword: message.keyword, content : message.content }, (translatedMessage) => {
            console.log(translatedMessage);
            let responseData = {  // Fix: Define `responseData`
                code: message.code,
                message: translatedMessage, 
                data: message.data ?? null,  // Fix: Ensure `data` is not undefined
            };

            res.send(responseData)
        })
    },

    getMessage : function(language,message,callback){
        localizify
        .add('en',en)
        .add('ar',ar)
        .setLocale(language);
        console.log(message);
        //console.log("Get Message", message.content);

        if (typeof message === "string") {
            message = { keyword: message };
        }
        let translatedMessage = t(message.keyword || message.keywords || "default_fallback_message");
        

        if (message.content) {
            Object.keys(message.content).forEach(key => {
                translatedMessage = translatedMessage.replace(`{ ${key} }`, message.content[key]);
            });
        }
        


        callback(translatedMessage);
    },
    extractHeaderLanguage: function (req, res, next) {
        var headerlang = req.headers['accept-language'] && req.headers['accept-language'] !== "" 
            ? req.headers['accept-language'] 
            : 'en';
    
        req.lang = headerlang;
        req.language = headerlang === 'en' ? en : ar;
    
        localizify
            .add('en', en)
            .add('ar', ar)
            .setLocale(req.lang);
    
        next(); // Ensure it proceeds to the next middleware
    },

    validateApiKey : function(req,res,callback){
        let api_key = (req.headers['api_key'] != undefined && req.headers['api_key'] != "") ? req.headers["api_key"] : '';
        if(api_key != ""){
            try{
                console.log("ENV API KEY : ",process.env.api_key)
                console.log("Header API KEY : ",common.decryptPlan(api_key))
                if(api_key != "" && common.decryptPlan(api_key) == process.env.API_KEY){
                    callback()
                }else{
                    let responseData = {
                        code : responseCode.OPERATION_FAILED,
                        keyword : "Invalid_Api_Key"
                    }

                    res.status(401)
                    middleware.sendResponse(req,res,responseData)
                }
            }catch(error){
                let responseData = {
                    code : responseCode.OPERATION_FAILED,
                    keyword : "Invalid_Api_Key"
                }

                middleware.sendResponse(req,res,responseData)
            }
        }else{
            let responseData = {
                code : responseCode.OPERATION_FAILED,
                keyword : "Invalid_Api_Key"
            }

            middleware.sendResponse(req,res,responseData)
        }
    },

    // validateHeaderToken: function (req, res, callback) {
    //     let headerToken = req.headers['token'] && req.headers['token'] !== "" ? req.headers['token'] : '';
    //     let pathData = req.path.split("/");
    
    //     console.log(pathData);
       
    //     if (bypassMethods.indexOf(pathData[3]) === -1) {  //  Fixed indexOf usage
    //         if (headerToken !== "") {
    //             try {
    //                if(pathData[2]==="user"){
    //                 headerToken = common.decryptPlan(headerToken)
    //                 console.log("Token : ",headerToken)
    //                 let tokenQuery = "SELECT * FROM tbl_device WHERE token = ?";
    //                 database.query(tokenQuery, [headerToken], (error, result) => {
    //                     if (!error && result.length > 0) {  // Fixed & to &&
    //                         req.user_id = result[0].user_id;
    //                         callback();
    //                     } else {
    //                         let responseData = {
    //                             code: responseCode.OPERATION_FAILED,
    //                             keyword: "Invalid_Token_Provided"
    //                         };
    //                         res.status(401);
    //                         middleware.sendResponse(req, res, responseData);  //  Fixed incorrect response handling
    //                     }
    //                 });
    //                }else if(pathData[2]==="admin"){
    //                 headerToken = common.decryptPlan(headerToken)
    //                 console.log("Token : ",headerToken)
    //                 let tokenQuery = "SELECT * FROM tbl_admin_device WHERE token = ?";
    //                 database.query(tokenQuery, [headerToken], (error, result) => {
    //                     if (!error && result.length > 0) {  // Fixed & to &&
    //                         req.admin_id = result[0].admin_id;
    //                         callback();
    //                     } else {
    //                         let responseData = {
    //                             code: responseCode.OPERATION_FAILED,
    //                             keyword: "Invalid_Token_Provided"
    //                         };
    //                         res.status(401);
    //                         middleware.sendResponse(req, res, responseData);  //  Fixed incorrect response handling
    //                     }
    //                 });
    //                }else if(pathData[2]==="driver"){
    //                 headerToken = common.decryptPlan(headerToken)
    //                 console.log("Token : ",headerToken)
    //                 let tokenQuery = "SELECT * FROM tbl_driver_device WHERE token = ?";
    //                 database.query(tokenQuery, [headerToken], (error, result) => {
    //                     if (!error && result.length > 0) {  // Fixed & to &&
    //                         req.driver_id = result[0].driver_id;
    //                         callback();
    //                     } else {
    //                         let responseData = {
    //                             code: responseCode.OPERATION_FAILED,
    //                             keyword: "Invalid_Token_Provided"
    //                         };
    //                         res.status(401);
    //                         middleware.sendResponse(req, res, responseData);  //  Fixed incorrect response handling
    //                     }
    //                 });
    //                }
    //             } catch (error) {
    //                 console.error("Token validation error:", error);
    //             }
    //         } else {
    //             let responseData = {
    //                 code: responseCode.OPERATION_FAILED,
    //                 keyword: "Invalid_Token_Provided",
    //             };
    //             res.status(401);
    //             middleware.sendResponse(req, res, responseData);  //  Fixed missing req, res
    //         }
    //     } else {
    //         callback();
    //     }
    // }
    
};

module.exports = middleware;
