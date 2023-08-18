const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');


const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;
    
    const emptyFields = [];
    if(!title) emptyFields.push('title');
    if(!reps) emptyFields.push('reps');
    if(!load) emptyFields.push('load');

    if(emptyFields.length > 0){
        return res.status(400).json({message: 'Please fill in the fields.', emptyFields});
    }

    try{ 
        const user_id = req.user._id;
        const workout = await Workout.create({title, reps, load, user_id});
        res.status(200).json(workout);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}


const getWorkouts = async (req, res) => {
    try{
        const user_id = req.user._id
        const workouts = await Workout.find({ user_id }).sort({createdAt: -1});
        res.status(200).json(workouts);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}


const getWorkout = async (req, res) => {
    const {id} = req.params;

    if( !mongoose.Types.ObjectId.isValid(id) ) 
        return res.status(404).json({message: 'Invalid Workout ID'});

    try{
        const workout = await Workout.findById(id);
        if (!workout) {
            res.status(404).json({message: 'Workout not found'});
            return;
        }
        res.status(200).json(workout);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}


const updateWorkout = async (req, res) => {
    const {id} = req.params;

    if( !mongoose.Types.ObjectId.isValid(id) ) 
        return res.status(404).json({message: 'Invalid Workout ID'});

    try{
        const workout = await Workout.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        if (!workout) {
            res.status(404).json({message: 'Workout not found'});
            return;
        }
        res.status(200).json({message: 'Workout updated successfully'});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}


const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if( !mongoose.Types.ObjectId.isValid(id) ) 
        return res.status(404).json({message: 'Invalid Workout ID'});

    try{
        // const workout = await Workout.findByIdAndDelete(id);
        const workout = await Workout.findOneAndDelete({_id: id});
        if (!workout) {
            res.status(404).json({message: 'Workout not found'});
            return;
        }
        res.status(200).json(workout);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
}