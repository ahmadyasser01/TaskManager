import Task from "../models/task.js";
import { success,fail,filterObj,checkEmptyObject } from "../utils/apiUtils.js";


export const  getAllTasks = async (req,res)=>{
    try {
        const tasks = await Task.find({owner:req.user._id}).sort({priority: "descending"});

        if(!tasks) throw newError("No tasks found");

        res.status(200).json(success(tasks));
    } catch (error) {
        res.status(404).json(fail(error.message));
    }
}

export const  getTask = async (req,res)=>{
    try {
        const {id} = req.params;
        const task = await Task.findOne({_id:id,owner:req.user._id});

        if(!task) throw new Error("No tasks found");

        res.status(200).json(success(task));
    } catch (error) {
        res.status(404).json(fail(error.message));
    }
}

export const  deleteTask = async (req,res)=>{
    try {
        const {id} = req.params;
        const task = await Task.findOneAndDelete({_id:id,owner:req.user._id});
        if(!task) throw new Error("No tasks found");
        res.status(200).json(success(task));
    } catch (error) {
        res.status(404).json(fail(error.message));
    }
}

export const  updateTask = async (req,res)=>{
    try {
        const {id} = req.params;
        console.log('====================================');
        console.log(id);
        console.log('====================================');
        const {_id:userId} = req.user;
        const filteredBody = filterObj(req.body, 'title',"description","priority","status");
        // CHECK IF OBJECT IS EMPTY
        console.log('====================================');
        console.log(filteredBody);
        console.log('====================================');
        if(checkEmptyObject(filteredBody)) throw new Error('No updates found');
        const updateTask = await Task.findOneAndUpdate({_id:id,owner:userId}, filteredBody, {
            new: true,
            runValidators: true
        });
        if(!updateTask) throw new Error("Error updating task");

        res.status(200).json(success(updateTask));
    } catch (error) {
        res.status(404).json(fail(error.message));
    }
}

export const createTask = async (req, res) => {
    try {
        const {title,priority,status,description} = req.body
        const newTask = await Task.create({
            title,
            description,
            owner:req.user._id,
            priority,
            status
        });
    
        if(!newTask) throw newError("Error creating task");
        res.status(200).json(success(newTask));

        
    } catch (error) {
        res.status(404).json(fail(error.message));

    }


}