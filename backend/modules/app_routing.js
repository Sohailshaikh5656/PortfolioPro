class routing{
    v1(app){
        let user = require("./v1/user/route/routes")
        user(app)
        
    }
}

module.exports = new routing()