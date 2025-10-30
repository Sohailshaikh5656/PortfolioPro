const s3BaseUrl = "None"
let constant = {
    encryptionKey: "None",
    encryptionIV : "5ng5nhy9mlo64r6k",
    userProfileImage : s3BaseUrl+"/userProfile/",
    mealImage : s3BaseUrl+"/mealImage/",
    port_base_url : process.env.URL
};

module.exports = constant