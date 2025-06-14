const express = require("express");
const { deleteUser, getAllUser, getUser, updateUser } = require("../controllers/userController.js");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken.js");
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

module.exports = router;