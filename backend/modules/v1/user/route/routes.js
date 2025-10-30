const userController = require("../controller/userController");
const upload = require("../../../../middleware/multer")
const userInstance = userController
const userRoute = (app)=>{
    app.post('/api/upload-profile',upload.single('profile_img'),userController.uploadProfile);
    app.post('/api/upload-project',upload.single('profile_img'),userController.uploadProfile);
    app.post("/api/basic",userInstance.addUser)
    app.post("/api/header",userInstance.addHeader)
    app.post("/api/about",userInstance.AddAbout)
    app.post("/api/services",userInstance.AddServices)
    app.post("/api/portfolio",userInstance.AddPortfolio)
    app.post("/api/testimonials",userInstance.AddTestimonials)
    app.post("/api/contact",userInstance.AddContact)
    app.post("/api/footer",userInstance.AddFooter)
    
    app.get("/api/user/:id", userInstance.getUser);
    app.post("/api/user", userInstance.getAllUser);
    app.get("/api/profession", userInstance.getProfession);
    app.get("/api/location", userInstance.getLocation);
    app.get("/api/userStep/:id", userInstance.checkSteps);
    
    app.put("/api/user", userInstance.updateUser);
    app.put("/api/about", userInstance.updateAbout);
    app.put("/api/hero", userInstance.updateHero);
    app.put("/api/portfolio", userInstance.updatePortfolio);
    app.put("/api/services", userInstance.updateServices);
    app.put("/api/testimonials", userInstance.updateTestimonial);
    app.put("/api/footer", userInstance.updateFooter);


    app.delete("/api/services/:id", userInstance.deleteServices);
    app.delete("/api/testimonials/:id", userInstance.deleteTestimonial);
    app.delete("/api/portfolio/:id", userInstance.deletePortfolio);
}

module.exports = userRoute