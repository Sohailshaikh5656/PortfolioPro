const Validator = require("Validator")
const middleware = require("../../../../middleware/validators")
const validationRules = require("../../../../utilites/rules")
const userModel = require("../model/userModel");
const common = require("../../../../utilites/common");
const message = require('../../../../language/en');
const { required } = require('../../../../language/ar');

class userController{
    constructor(){}

    async addUser(req,res){
        let requestData = req.body
        console.log("Data : ",req.body)
        let rules = validationRules.user;
        // FIX: Check if req.language exists and has required property
        let message = {
            required: req.language?.required
        }
        let keywords = {}
        // FIX: Add proper error handling for validation
        try {
            if(middleware.checkValidationRules(req,res,requestData,rules,message,keywords)){
                let result = await userModel.addUser(requestData)
                return middleware.sendResponse(req,res,result)
            }
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }

    async addHeader(req,res){
        let requestData = req.body
        console.log("Data : ",req.body)
        let rules = validationRules.header;
        // FIX: Check if req.language exists and has required property
        let message = {
            required: req.language?.required
        }
        let keywords = {}
        // FIX: Add proper error handling for validation
        try {
            if(middleware.checkValidationRules(req,res,requestData,rules,message,keywords)){
                let result = await userModel.addHeader(requestData)
                return middleware.sendResponse(req,res,result)
            }
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async AddAbout(req,res){
        let requestData = req.body
        console.log("Data : ",req.body)
        let rules = validationRules.about;
        // FIX: Check if req.language exists and has required property
        let message = {
            required: req.language?.required
        }
        let keywords = {}
        // FIX: Add proper error handling for validation
        try {
            if(middleware.checkValidationRules(req,res,requestData,rules,message,keywords)){
                let result = await userModel.AddAbout(requestData)
                return middleware.sendResponse(req,res,result)
            }
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async AddServices(req,res){
        let requestData = req.body
        console.log("Data : ",req.body)
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.AddServices(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async AddPortfolio(req,res){
        let requestData = req.body
        console.log("Data : ",req.body)
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.AddPortfolio(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async AddTestimonials(req,res){
        let requestData = req.body
        console.log("Data : ",req.body)
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.AddTestimonials(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async AddContact(req,res){
        let requestData = req.body
        console.log("Data : ",req.body)
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.AddContact(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async AddFooter(req,res){
        let requestData = req.body
        console.log("Data : ",req.body)
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.AddFooter(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async getUser(req,res){
        let requestData = {id : req.params.id}
        console.log("IDDDDDDD : ",requestData)
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.getUser(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async getAllUser(req,res){
        let requestData = req.body
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.getAllUser(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async getProfession(req,res){
        let requestData = req.body
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.getProfession(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async getLocation(req,res){
        let requestData = req.body
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.getLocation(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async updateUser(req,res){
        let requestData = req.body
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.updateUser(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    
    async updateAbout(req,res){
        let requestData = req.body
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.updateAbout(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async updateHero(req,res){
        let requestData = req.body
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.updateHero(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async updatePortfolio(req,res){
        let requestData = req.body
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.updatePortfolio(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async updateServices(req,res){
        let requestData = req.body
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.updateServices(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async updateTestimonial(req,res){
        let requestData = req.body
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.updateTestimonial(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async updateFooter(req,res){
        let requestData = req.body
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.updateFooter(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async deleteServices(req,res){
        let requestData = {};
        requestData.id = req?.params?.id
        console.log("ID : ",requestData)
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.deleteServices(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async deleteTestimonial(req,res){
        let requestData = {};
        requestData.id = req?.params?.id
        console.log("ID : ",requestData)
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.deleteTestimonial(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async deletePortfolio(req,res){
        let requestData = {};
        requestData.id = req?.params?.id
        console.log("ID : ",requestData)
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.deletePortfolio(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async checkSteps(req,res){
        let requestData = {};
        requestData.id = req?.params?.id
        console.log("ID : ",requestData)
        // FIX: Add proper error handling for validation
        try {
            let result = await userModel.checkSteps(requestData)
            return middleware.sendResponse(req,res,result)

        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }


    uploadProfile(req, res) {
          try {
               const responseData = userModel.uploadProfile(req);
               return middleware.sendResponse(req,res,responseData)
          } catch (error) {
               return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
          }
    }
}
module.exports = new userController()