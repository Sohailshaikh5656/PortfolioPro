let user = {
    companyName : "required|string",
    name : "required|string",
    email : "required|string",
    phone: "required|numeric|min:2000",
    profession:"required|string",
    city : "required|string",
    state : "required|string",
    image : "required|string",
    age : "required|integer|min:16",
    templateId : "required|integer|min:1"
}
let header = {
    hero_title : "required|string",
    hero_subtitle : "required|string",
    hero_cta : "required|string",
    image : "required|string",
    userId :"required|integer|min:1",
}
let about = {
    bio : "required|string",
    experience : "required|integer|min:0",
    projects_count : "required|integer|min:0",
    skills : "required",
    userId :"required|integer|min:1",   
}



module.exports = {
    user,
    header, 
    about
};
