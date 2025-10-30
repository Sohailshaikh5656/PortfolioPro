
const responseCode = require("../../../../utilites/responseCode");
const common = require("../../../../utilites/common");
const { request } = require("express");
const database = require("../../../../config/database")

class userModel {
    constructor() {
    }
    //Add Property


    uploadProfile(req) {
        console.log("File Upload Called !")
        console.log("Filename:", req?.file)
        console.log("File Upload Called 2!")
        if (!req.file) {
            return {
                code: responseCode.OPERATION_FAILED,
                message: { keyword: 'text_upload_profile_fail', content: {} },
                data: {}
            }
        } else {
            return {
                code: responseCode.SUCCESS,
                message: { keyword: 'text_upload_profile_success', content: {} },
                data: req.file.filename
            }
        }
    }

    async addUser(requestData) {
        try {
            console.log("New User : ", requestData);
            const userData = {
                name: requestData.name,
                company_name: requestData.companyName,
                email: requestData.email,
                profession: requestData.profession,
                state: requestData.state,
                city: requestData.city,
                image: requestData.image,
                template_id: requestData.templateId || 1,
                age : requestData.age || 26,
                steps: requestData.steps || 1
            }

            const [result] = await database.query("INSERT INTO tbl_user SET ?", userData);
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_insert",
                    data: "Error in Inserting User !"

                }
            }
            userData.user_id = result.insertId;
            return {
                code: responseCode.SUCCESS,
                keyword: "new_user",
                data: userData
            }
        } catch (error) {
            console.log("Error : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error
            }
        }
    }
    async addHeader(requestData) {
        try {
            const heroData = {
                user_id: requestData.userId,
                hero_title: requestData.hero_title,
                hero_subtitle: requestData.hero_subtitle,
                hero_cta: requestData.hero_cta,
                image: requestData.image
            }
            const [result] = await database.query("INSERT INTO tbl_hero SET ?", heroData);
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_insert",
                    data: "Error in Inserting Hero Section !"

                }
            }
            const check = await common.updateSteps(heroData.user_id);
            if (check.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_update_steps",
                    data: "Error in Updating Steps"
                }
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "header",
                data: requestData
            }
        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error
            }
        }
    }
    async AddAbout(requestData) {
        try {
            const aboutData = {
                user_id: requestData.userId,
                bio: requestData.bio,
                experience: requestData.experience,
                projects_count: requestData.projects_count,
                skills: JSON.stringify(requestData.skills), // Convert array to JSON string
            }

            const [result] = await database.query("INSERT INTO tbl_about SET ?", aboutData);

            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_insert",
                    data: "Error in Inserting About Section !"
                }
            }

            const check = await common.updateSteps(requestData.userId); // Fixed: requestData.userId instead of heroData.user_id
            if (check.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_update_steps",
                    data: "Error in Updating Steps"
                }
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "about",
                data: requestData
            }
        } catch (error) {
            console.error("AddAbout Error:", error);
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error
            }
        }
    }
    async AddServices(requestData) {
        try {
            for (let i = 0; i < requestData.services.length; i++) {
                console.log("Services 1 : ", requestData.services[i])
                const services = {
                    title: requestData.services[i].title,
                    description: requestData.services[i].description,
                    user_id: requestData.userId
                }
                if (!requestData.userId) {
                    services.user_id = requestData?.services[i]?.userId || requestData?.services[i]?.user_id
                }

                console.log("Services Data : ", services)
                const [result] = await database.query("INSERT INTO tbl_services SET ?", services);

                if (result.affectedRows <= 0) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "failed_to_insert",
                        data: "Error in Inserting Service !"
                    }
                }
            }
            if (requestData.skipSteps) {

            } else {
                const check = await common.updateSteps(requestData.userId);
                if (check.affectedRows <= 0) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "error_in_update_steps",
                        data: "Error in Updating Steps"
                    }
                }
            }


            return {
                code: responseCode.SUCCESS,
                keyword: "services", // Changed from "about" to "services"
                data: requestData
            }
        } catch (error) {
            console.error("AddServices Error:", error); // Updated error log
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error
            }
        }
    }

    async AddPortfolio(requestData) {
        try {
            console.log("DAta ======================= ", requestData)
            // Validate input
            if (!requestData.projects || !Array.isArray(requestData.projects) || requestData.projects.length === 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "invalid_projects_data",
                    data: "No projects provided or invalid format"
                }
            }

            // Insert all projects
            for (let i = 0; i < requestData.projects.length; i++) {
                const projectData = {
                    title: requestData?.projects[i]?.title,
                    description: requestData?.projects[i]?.description,
                    link: requestData?.projects[i]?.link,
                    image: requestData?.projects[i]?.image, // This should be the uploaded image path/URL
                    user_id: requestData?.user_id || requestData,
                    project_order: requestData?.projects[i]?.project_order || i + 1 // Optional: to maintain order
                }

                const [result] = await database.query("INSERT INTO tbl_portfolio SET ?", projectData);

                if (result.affectedRows <= 0) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "failed_to_insert_project",
                        data: `Failed to insert project: ${requestData.projects[i].title}`
                    }
                }
            }

            // Update user steps
            if (requestData?.skipUpdate) {
                console.log("Skipped Updated !")
            } else {
                const check = await common.updateSteps(requestData.user_id);
                if (check.affectedRows <= 0) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "error_in_update_steps",
                        data: "Error in Updating Steps"
                    }
                }
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "portfolio",
                data: {
                    message: `Successfully added ${requestData.projects.length} projects`,
                    projects: requestData.projects
                }
            }
        } catch (error) {
            console.error("AddPortfolio Error:", error);
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }

    async AddTestimonials(requestData) {
        try {
            // Validate input
            if (!requestData.testimonials || !Array.isArray(requestData.testimonials) || requestData.testimonials.length === 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "invalid_testimonials_data",
                    data: "No testimonials provided or invalid format"
                }
            }

            // Insert all testimonials
            for (let i = 0; i < requestData.testimonials.length; i++) {
                const testimonialData = {
                    client_name: requestData.testimonials[i].client_name,
                    testimonial: requestData.testimonials[i].testimonial,
                    logo: requestData.testimonials[i].logo, // This should be the uploaded logo path/URL
                    user_id: requestData.userId,
                    testimonial_order: i + 1 // Optional: to maintain order
                }

                if (!requestData.userId) {
                    testimonialData.user_id = requestData.testimonials[i].userId
                }

                const [result] = await database.query("INSERT INTO tbl_testimonials SET ?", testimonialData);

                if (result.affectedRows <= 0) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "failed_to_insert_testimonial",
                        data: `Failed to insert testimonial from: ${requestData.testimonials[i].client_name}`
                    }
                }
            }

            // Update user steps
            if (requestData.skipUpdate) { } else {
                const check = await common.updateSteps(requestData.userId);
                if (check.affectedRows <= 0) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "error_in_update_steps",
                        data: "Error in Updating Steps"
                    }
                }
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "testimonials",
                data: {
                    message: `Successfully added ${requestData.testimonials.length} testimonials`,
                    testimonials: requestData.testimonials
                }
            }
        } catch (error) {
            console.error("AddTestimonials Error:", error);
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }

    async AddContact(requestData) {
        try {
            // Validate input
            if (!requestData.email || !requestData.phone || !requestData.address) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "invalid_contact_data",
                    data: "Required contact information is missing"
                }
            }

            const contactData = {
                email: requestData.email,
                phone: requestData.phone,
                address: requestData.address,
                social_links: JSON.stringify(requestData.social_links || {}), // Store social links as JSON
                user_id: requestData.userId
            }

            const [result] = await database.query("INSERT INTO tbl_contact SET ?", contactData);

            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_insert_contact",
                    data: "Failed to insert contact information"
                }
            }

            // Update user steps
            const check = await common.updateSteps(requestData.userId);
            if (check.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_update_steps",
                    data: "Error in Updating Steps"
                }
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "contact",
                data: {
                    message: "Successfully added contact information",
                    contact: requestData
                }
            }
        } catch (error) {
            console.error("AddContact Error:", error);
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }

    async AddFooter(requestData) {
        try {
            // Validate input
            if (!requestData.company || !requestData.year) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "invalid_footer_data",
                    data: "Company name and year are required"
                }
            }

            const footerData = {
                company: requestData.company,
                year: requestData.year,
                copyright_text: requestData.copyright_text || "",
                additional_links: await JSON.stringify(requestData.additional_links || []),
                user_id: requestData.userId
            }

            console.log("Footer Data : ",footerData)

            const [result] = await database.query("INSERT INTO tbl_footer SET ?", footerData);

            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_insert_footer",
                    data: "Failed to insert footer information"
                }
            }

            // Update user steps to mark completion
            const check = await common.updateSteps(requestData.userId);
            if (check.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "error_in_update_steps",
                    data: "Error in Updating Steps"
                }
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "footer",
                data: {
                    message: "Successfully added footer information. Portfolio completed!",
                    footer: requestData
                }
            }
        } catch (error) {
            console.error("AddFooter Error:", error);
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }

    async getUser(requestData) {
        try {
            const [user] = await database.query("SELECT * FROM tbl_user WHERE is_active=1 AND is_deleted=0 AND id=?", [requestData.id])
            const [about] = await database.query("SELECT * FROM tbl_about WHERE is_active=1 AND is_deleted=0 AND user_id = ? ", [requestData.id])
            const [contact] = await database.query("SELECT * FROM tbl_contact WHERE user_id = ? AND is_active=1 AND is_deleted=0", requestData.id)
            const [footer] = await database.query("SELECT * FROM tbl_footer WHERE user_id = ? AND is_active=1 AND is_deleted=0", requestData.id)
            const [hero] = await database.query("SELECT * FROM tbl_hero WHERE user_id = ? AND is_active=1 AND is_deleted=0", requestData.id)
            const [portfolio] = await database.query("SELECT * FROM tbl_portfolio WHERE user_id = ? AND is_active=1 AND is_deleted=0", requestData.id)
            const [services] = await database.query("SELECT * FROM tbl_services WHERE user_id = ? AND is_active=1 AND is_deleted=0", requestData.id)
            const [testimonial] = await database.query("SELECT * FROM 	tbl_testimonials WHERE user_id = ? AND is_active=1 AND is_deleted=0", requestData.id)

            const portfolioData = {
                user: user,
                contact: contact,
                footer: footer,
                hero: hero,
                portfolio: portfolio,
                services: services,
                testimonial: testimonial,
                about: about
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "user_portfolio",
                data: portfolioData
            }
        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }

    async getProfession(requestData) {
        try {
            let [result] = await database.query("SELECT LOWER(profession) as profession FROM tbl_user WHERE is_active = 1 AND is_deleted = 0 AND profession IS NOT NULL GROUP BY LOWER(profession)")
            if (result.length <= 0) {
                return {
                    code: responseCode.NO_DATA_FOUND,
                    keyword: "no_profession_found",
                    data: "No Profession List FOund ! No Data SEECTED !"
                }
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "profession_list",
                data: result
            }
        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
    async getLocation(requestData) {
        try {
            let [result] = await database.query("SELECT LOWER(city) as city FROM tbl_user WHERE is_active = 1 AND is_deleted = 0 AND city IS NOT NULL GROUP BY LOWER(city)")
            if (result.length <= 0) {
                return {
                    code: responseCode.NO_DATA_FOUND,
                    keyword: "no_city_found",
                    data: "No City List FOund ! No Data SEECTED !"
                }
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "city_list",
                data: result
            }
        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }

    async getAllUser(requestData) {
        try {
            console.log("Request Data:", requestData);

            let query = `SELECT u.*, c.*, a.* FROM tbl_user as u 
        JOIN tbl_contact as c ON c.user_id = u.id
        JOIN tbl_about as a ON a.user_id = u.id
        WHERE u.is_active=1 AND u.is_deleted=0`;

            if (requestData?.location) {
                console.log("Exec : 1=====")
                query += ` AND LOWER(u.city) LIKE LOWER('%${requestData.location}%')`
            }
            if (requestData?.profession) {
                console.log("Exec : 2===")
                query += ` AND LOWER(u.profession) LIKE LOWER('%${requestData.profession}%')`
            }

            if(requestData?.sort){
                if(requestData?.sort == "a-z"){
                    console.log("Exec : 3.1 ===")
                    query += ` ORDER BY u.name` // Fixed: OREDR -> ORDER
                }
                if(requestData?.sort == "z-a"){
                    console.log("Exec : 3.2 ===")
                    query += ` ORDER BY u.name DESC` // Fixed: OREDR -> ORDER
                }
                if(requestData?.sort == "experience"){ // Fixed: experiance -> experience
                    console.log("Exec : 3.3 ===")
                    query += ` ORDER BY a.experience DESC` // Fixed: OREDR -> ORDER
                }
                if(requestData?.sort == "rating"){
                    console.log("Exec : 3.4 ===")
                    query += ` ORDER BY a.rating DESC` // Fixed: OREDR -> ORDER
                }
            }

            // console.log("Final Query:", query);

            let [result] = await database.query(query);
            // console.log("Query Result:", result);

            if (result.length <= 0) {
                return {
                    code: responseCode.NO_DATA_FOUND,
                    keyword: "no_data_found",
                    data: "No User List Found"
                }
            }

            return {
                code: responseCode.SUCCESS,
                keyword: "user_list_found",
                data: result
            }
        } catch (error) {
            console.error("Error in getAllUser:", error);
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }

    async updateUser(requestData) {
        try {
            console.log("Request Data : ", requestData)
            let updateUser = {
                name: requestData.name,
                email: requestData.email,
                profession: requestData.profession,
                company_name: requestData.company_name,
                city: requestData.city,
                state: requestData.state,
                image: requestData.image,
                updated_at: new Date()
            }
            let id = requestData.id

            const [result] = await database.query("UPDATE tbl_user SET ? WHERE id = ?", [updateUser, id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_update",
                    data: "Failed to Update User !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "User Updated Successfully !"
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
    async updateAbout(requestData) {
        try {
            console.log("Request Data : ", requestData)
            let updateUser = {
                bio: requestData.bio,
                experience: requestData.experience,
                projects_count: requestData.projects_count,
                skills: requestData.skills,
                updated_at: new Date()
            }
            let id = requestData.id

            const [result] = await database.query("UPDATE tbl_about SET ? WHERE id = ?", [updateUser, id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_update",
                    data: "Failed to Update About !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "About Section Updated Successfully !"
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
    async updateHero(requestData) {
        try {
            console.log("Request Data : ", requestData)
            let updateUser = {
                hero_title: requestData.hero_title,
                hero_subtitle: requestData.hero_subtitle,
                hero_cta: requestData.hero_cta,
                image: requestData.image,
                updated_at: new Date()
            }
            let id = requestData.id

            const [result] = await database.query("UPDATE tbl_hero SET ? WHERE id = ?", [updateUser, id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_update",
                    data: "Failed to Update About !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "About Section Updated Successfully !"
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
    async updatePortfolio(requestData) {
        try {
            console.log("Request Data : ", requestData)
            let updateUser = {
                title: requestData.title,
                description: requestData.description,
                link: requestData.link,
                project_order: requestData.project_order,
                image: requestData.image,
                updated_at: new Date()
            }
            let id = requestData.id

            const [result] = await database.query("UPDATE tbl_portfolio SET ? WHERE id = ?", [updateUser, id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_update",
                    data: "Failed to Update Portfolio !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "Portfolio Section Updated Successfully !"
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
    async updateServices(requestData) {
        try {
            console.log("Request Data : ", requestData)
            let updateUser = {
                title: requestData.title,
                description: requestData.description,
                is_active: 1,
                updated_at: new Date()
            }
            let id = requestData.id

            const [result] = await database.query("UPDATE tbl_services SET ? WHERE id = ?", [updateUser, id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_update",
                    data: "Failed to Update Services !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "Services Section Updated Successfully !"
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
    async deleteServices(requestData) {
        try {
            const [result] = await database.query("UPDATE tbl_services SET is_deleted=1 WHERE id = ?", [requestData?.id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_delete",
                    data: "Failed to Delete Services !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "Services Section Updated Successfully !"
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }

    async updateTestimonial(requestData) {
        try {
            console.log("Request Data : ", requestData)
            let updateUser = {
                client_name: requestData.client_name,
                testimonial: requestData.testimonial,
                is_active: 1,
                logo: requestData.logo,
                updated_at: new Date()
            }
            let id = requestData.id

            const [result] = await database.query("UPDATE tbl_testimonials SET ? WHERE id = ?", [updateUser, id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_update",
                    data: "Failed to Update Testimonial !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "Testimonial Section Updated Successfully !"
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
    async updateFooter(requestData) {
        try {
            console.log("Request Data : ", requestData)
            let updateUser = {
                company: requestData.company,
                copyright_text: requestData.copyright_text,
                year: requestData.year,
                additional_links: requestData.additional_links || [],
                is_active: 1,
                updated_at: new Date()
            }
            let id = requestData.id

            const [result] = await database.query("UPDATE tbl_footer SET ? WHERE id = ?", [updateUser, id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_update",
                    data: "Failed to Update Footer !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "Footer Section Updated Successfully !"
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
    async deleteTestimonial(requestData) {
        try {
            const [result] = await database.query("UPDATE tbl_testimonials SET is_deleted=1 WHERE id = ?", [requestData?.id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_delete",
                    data: "Failed to Delete Services !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "Services Section Updated Successfully !"
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
    async deletePortfolio(requestData) {
        try {
            const [result] = await database.query("UPDATE tbl_portfolio SET is_deleted=1 WHERE id = ?", [requestData?.id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_delete",
                    data: "Failed to Delete Portfolio Item !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: "Services Section Updated Successfully !"
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
    async checkSteps(requestData) {
        try {
            const [result] = await database.query("SELECT steps FROM tbl_user WHERE id = ?", [requestData?.id])
            if (result.affectedRows <= 0) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "failed_to_select",
                    data: "Failed to Check Steps !"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "success",
                data: result[0].steps
            }
        } catch (error) {
            console.log("Error in updateUser : ", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message
            }
        }
    }
}

module.exports = new userModel()