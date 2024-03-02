import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.get('/checkAuthentication', verifyToken, (req,res)=>{
    res.send("You are logged in."); 
});
router.get('/checkuser/:id', verifyUser, (req,res)=>{
    res.send("Hello User, You are logged in and you can delete your account."); 
});
router.get('/checkadmin/:id', verifyAdmin, (req,res)=>{
    res.send("Hello Admin, You are logged in and you can delete all account."); 
});

//update
router.put('/:id', verifyUser, updateUser);

//delete
router.delete('/:id',verifyUser, deleteUser);

//get
router.get('/:id',verifyUser, getUser);

//get all
router.get('/',verifyAdmin, getAllUser);

export default router;