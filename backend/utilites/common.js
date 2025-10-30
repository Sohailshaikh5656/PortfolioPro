
const responseCode = require("./responseCode");
const database = require("../config/database")

class common{
   async updateSteps(userId){
    const [res] = await database.query("UPDATE tbl_user SET steps = steps+1 WHERE id = ?",[userId])
    return res
   }

}

module.exports = new common()