const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const utility = require('../utility');

exports.register = async (parent, args, context) => {

    let encryptedPass = await bcrypt.hash(args.password, 12);
    let userData = new userModel({
        "firstName": args.firstName,
        "lastName": args.lastName,
        "email": args.email,
        "password": encryptedPass
    });
    let savedUser = await userData.save();

    //   if(savedUser){
    let responseResult = {
        "message": "user added successfully",
        "success": true
    }
    return responseResult;
}

exports.login = async (parent, args, context) => {
    let userData = await userModel.findOne({ email: args.email });
    if (userData) {
        let valid = await bcrypt.compare(args.password, userData.password)
        console.log("valid: ", valid);
        let payload = {
            userId: userData._id,
            email: userData.email
        }
        let tokens = await utility.generateTokens(payload);
        if (valid) {
            let responseResult = {
                "message": "login successful",
                "tokens": tokens,
                "success": true
            }
            return responseResult;
        } else {
            let responseResult = {
                "message": "login failed",
                "success": false
            }
            return responseResult;
        }

    }
}
exports.changePassword = async (parent, args, context) => {

    if (context.token) {
        let payload = await utility.verifyTokens(context.token);
        console.log("payload: ", payload);
        if (payload) {
            let userData = await userModel.findOne({ _id: payload.userId, email: args.email });
            if (userData) {
                let valid = await bcrypt.compare(args.password, userData.password)
                console.log("valid: ", valid);

                if (valid) {
                    let encryptedPass = await bcrypt.hash(args.newPassword, 12);
                    let updatedData = await userModel.updateOne({ _id: userData._id }, { password: encryptedPass })
                    console.log("updatedData", updatedData);

                    let responseResult = {
                        "message": "password changed successfully",
                        "success": true
                    }
                    return responseResult;
                } else {
                    let responseResult = {
                        "message": "password updation failed as old password is wrong",
                        "success": false
                    }
                    return responseResult;
                }

            }
        } else {
            let responseResult = {
                "message": "Invalid tokens",
                "success": false
            }
            return responseResult;
        }
    } else {
        let responseResult = {
            "message": "No tokens found",
            "success": false
        }
        return responseResult;
    }

}
