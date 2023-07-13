const express = require('express');
const User = require('../models/User');

const router = express.Router();


//get all
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.send(users)

    } catch(err){
        res.status(500).json({message: err.message});
    }

})

//get one
router.get('/:id', getUser ,async(req, res) => {
    try {
        // const user = await User.findById(req.params.id);
        // res.send(user);
        res.send(res.user); //Usando o getUser

    } catch (err) {
        res.status(500).json({message: err.message});
    }


})

//create a new
router.post('/', async (req, res) => {

    const user = new User({
        name: req.body.name,
        age: req.body.age,
        parents: req.body.parents
    })

    try{
        const newUser  = await User.create(user)
        res.status(201).send(newUser)

    }catch(err){
        res.status(400).json({message: err.message});
    }

})

//update
router.patch('/:id', getUser, async (req, res) => {
    //Verificar se o body está vázio
    if (req.body.name != null){
        res.user.name = req.body.name;
    }
    if (req.body.age != null){
        res.user.age = req.body.age;
    }
    if(req.body.parents != null){
        res.user.parents = req.body.parents;
    }
    if (req.body.birthday != null){
        res.user.birthday = req.body.birthday;
    }
    console.log(res.user)
    // try {
    //     const updatedUser = await res.user.save();
    //     res.json(updatedUser)

    // }catch(err){
    //     res.status(400).json({message: err.message});

    // }

})

//delete
router.delete('/:id', async(req, res) => {
    //Deletando usando query
    try {
        const user = await User.where("_id").equals(req.params.id).deleteOne();
        res.send(user).end();
    } catch (err) {
        res.status(500).json({message: err.message});
    }

})


//midleware function ----------
async function getUser(req, res, next) {
    let user
    try{
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({message: "User not found."});
        }

    }catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.user = user;
    next();
}

module.exports = router;