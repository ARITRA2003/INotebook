import express from "express";
import { User } from "../models/User.js";
import pkg from 'express-validator';
const { body, validationResult } = pkg;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchuser from "../controller/fetchuser.js";


const SECRET="gfiebdc";

const router = express.Router();

//Route-1
//creating a user using : POST "/api/auth/"
// No login required
router.post('/createuser',
    [
        body('name', "Enter a valid name having atleast 6 characters").optional().isLength({ min: 6 }),
        body('email', "Enter a valid Email address").isEmail(),
        body('password', "Enter a valid password having atleast 8 characters").optional().isLength({ min: 8 }),
    ],
    async (req, res) => {
        // Any errors in passwords exist or not
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(),sucess:false });
        }

        const { email, name, password } = req.body;
        try {
            // Checking if a user with email already exists or not 
            let user=await  User.findOne({'email':email}).exec();
            if (user) {
                return res.json({
                    error: "Your email is already registered",
                });
            }
            const salt=await bcrypt.genSalt(10);
            const secPassword= await bcrypt.hash(password,salt);
            //If User does not exist,create in DataBase
            user = User.create({
                name:name,
                email:email,
                password:secPassword,
            })
            const data={
                user:{
                  id:user.id
                }
            }
            const authid=jwt.sign(data,SECRET)
            res.json({
                sucess:true,
                authid});
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
});

//Route-2
// Authentication of user 
//Login page

router.post("/login",
[
    body('email', "Enter a valid Email address").isEmail(),
    body('password', "Enter a valid password having atleast 8 characters").optional().isLength({ min: 8 }),
],
async (req, res) => {
    // Any errors in passwords exist or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {email,password}=req.body;

        const user=await  User.findOne({'email':email}).exec();
        if (!user) {
        res.status(400).json({
            error:"Please put a valid credentials"
        });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
        res.status(400).json({
            error:"Please put a valid credentials"
        });
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authid=jwt.sign(data,SECRET)
        res.json({
            sucess:true,
            authid});
    }
    catch(err){
        console.error(err);
        res.status(400).json({error:"Internal server error"});
    }
});

//Route 3: Get logged user details
//creating a user using : POST "/api/auth/getAlldeatails"
// No login required

router.post("/getAllDetails",
fetchuser,
async (req, res) => {
    try {
        const userID=req.user.id;
        const user=await User.findById(userID).select("-password");
        res.send(user);
    }
    catch(err){
        console.error(err);
        res.status(400).json({error:"Internal server error"});
    }
});

export default router;