const express = require('express');
const router = express.Router();
const Users = require('../../Model/user');

router.post('/signup',async (req, res) => {
    const { username, email, password } = req.body;
    const user = Users.findOne({email:req.body.email});
        if(!user){
            Users.create(req.body,function(err,user){
                if(err){
                    console.log(`error in creating account, ${err}`); return ;

                }
                console.log('user created');
                res.status(201).json({ message: 'User created successfully', user: newUser });
            })
        }
        else{
            res.status(201).json({ message: 'User already  pressent'});
        }
        
    })



module.exports=router;