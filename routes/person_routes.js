const express = require('express');
const Person = require('../models/person');
const router = express.Router();

router.post('/', async (req,res) => {

    try {
        const data = req.body

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }

// newPerson.save((error, savedPerson) => {
//     if(error){
//         console.log('error saving person:', error);
//         req.status(500).json({error: 'internal server error'})
//     }else{
//         console.log('data saved successfully');
//         res.status(200).json(savedPerson);
//     }
// })
})

router.get('/', async (req, res) =>{
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
        
    } catch (err) {
        console.log(err);
    res.status(500).json({error: 'internal server error'});
    }
})

router.get('/:workType', async (req,res)=>{

   try {
    const workType = req.params.workType;
    if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
       const response = await Person.find({work: workType});
       console.log('response fetched');
       res.status(200).json(response); 
    } else{
        res.status(404).json({error: 'internal work type'});
    }
   } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal server error'});
   } 
})

router.put('/:id', async (req, res) =>{
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        
        console.log('data updated');
        res.status(200).json(response);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response =  await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        
        console.log('data deleted');
        res.status(200).json(response);
    } catch (err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});        
    }
})


module.exports = router;