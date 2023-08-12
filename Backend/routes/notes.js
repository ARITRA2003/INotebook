import express from "express";
import fetchuser from "../controller/fetchuser.js";
import { UserNotes } from "../models/Notes.js";
import pkg from 'express-validator';
const { body, validationResult } = pkg;
const SECRET = "gfiebdc";
const router = express.Router();

//Route-1
//Getting All notes of user : GET "/api/notes/getAllNotes"
//Login reuired

router.get('/getAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await UserNotes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});


//Route-2
//Adding notes of user : POST "/api/notes/addnotes"
//Login reuired

router.post('/addnotes', fetchuser,
    [
        body('title', "Enter a  title having atleast 5 characters").optional().isLength({ min: 5 }),
        body('description', "Enter a description having atleast 10 characters").optional().isLength({ min: 10 }),
    ]
    , async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {tag,title,description}=req.body;
            // creating new note for user
            // having id req.user.id
            // console.log(req.user._id);
            const note =new UserNotes({
                user:req.user.id,
                title,
                description,
                tag
            });
            const saveNotes=await note.save();
            res.json(saveNotes);
        }

        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    });




//Route-3
//updating notes of user : PUT "/api/notes/updatenotes"
//Login reuired

router.put('/updatenotes/:id', fetchuser,
    [
        body('title', "Enter a  title having atleast 5 characters").optional().isLength({ min: 5 }),
        body('description', "Enter a description having atleast 10 characters").optional().isLength({ min: 10 }),
    ]
    , async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {tag,title,description}=req.body;
            // updating new note for user
            // having id req.user.id
            const updatednote ={};
            if(title) updatednote.title=title;
            if(description) updatednote.description=description;
            if(tag) updatednote.tag=tag;
            

            //Find the note to be updated and update it
            
            let note=await UserNotes.findById(req.params.id);
            if(!note){
                return res.status(404).send("Not found");
            }
            // checking if the person owns the notes or not
            if(note.user.toString()!==req.user.id){
                return res.status(401).send("Not Allowed");
            }
            note=await UserNotes.findByIdAndUpdate({_id:req.params.id},{$set: updatednote},{new:true});
            res.json({note});
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    });


//Route-4
//deleting notes of user : Delete "/api/notes/deletenotes"
//Login reuired

router.delete('/deletenotes/:id', fetchuser,
        async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // deleting new note for user
            // having id req.user.id
            //Find the note to be deleted and delete it
            
            let note=await UserNotes.findById(req.params.id);
            if(!note){
                return res.status(404).send("Not found");
            }
            // checking if the person owns the notes or not
            if(note.user.toString()!==req.user.id){
                return res.status(401).send("Not Allowed");
            }
            note=await UserNotes.findByIdAndDelete({_id:req.params.id});
            res.json({
                "success":"Note has been deleted",
                note:note
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    });


export default router;
