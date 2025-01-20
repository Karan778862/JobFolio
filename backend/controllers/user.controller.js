import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/DataUri.js";
import cloudinary from "../utils/Cloudinary.js";
import { profile } from "console";


//register
export const register = async(req, res)=> {
    try {
        const {fullname,email,phoneNumber,password,role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Somthing is missing",
                success:false
            });
        }
        const file = req.file;
        const fileuri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileuri.content)

        const user = await User.findOne({email});
            if(user){
                return res.status(200).json({
                    message:"user already exist ",
                    success:false,
                })
            }

            const hashePassword = await bcrypt.hash(password, 10);

            await User.create({
                fullname,
                email,
                phoneNumber,
                password:hashePassword,
                role,
                profile:{
                    profilePhoto:cloudResponse.secure_url
                }
            })
            return res.status(201).json({
                message:"Account created successfuly",
                success:true
            })
    } catch (error) {
        console.log(error)
    }
};


//login 
export const login = async (req, res) => {
    try {
        const {email,password,role} = req.body;
        if( !email  || !password || !role){
            return res.status(400).json({
                message:"Somthing is missing",
                success:false
            });
        }

        let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message:"incorrect email and password ",
                    success:false,
                })
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
                if(!isPasswordMatch){
                    return res.status(400).json({
                        message:"incorrect email and password ",
                        success:false,
                    })
                }
            if(role != user.role ){
                return res.status(400).json({
                    message:"account doesn't exist with current role.",
                    success:false
                })
            }  
            
            const tokenData = {
                userId:user.id
            }

            const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});
                user = {
                    _id:user._id,
                    fullname:user.fullname,
                    email:user.email,
                    phoneNumber:user.phoneNumber,
                    role:user.role,
                    profile:user.profile

                }
            return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
                message:`welcome back ${user.fullname}`,
                user,
                success:true
            })
    } catch (error) {
        console.log(error)
    }
}

//logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "",{maxAge:0}).json({
            message:"Logout successfuly",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

//updateProfile

export const updateProfile = async (req, res)=> {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file
        // cloudinery
       
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // console.log(fileUri.content);

        

        let skillsArray;
       if(skills){
         skillsArray = skills.split(",");
       }
        const userId = req.id;
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                Message:"user not found!",
                success:false
            })
        }

        //updating data

        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        //
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }


        await user.save();


        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile

        }

        return res.status(200).json({
            message:"Profile update successfuly",
            user,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}