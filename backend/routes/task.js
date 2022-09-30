import express from 'express';
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from '../controllers/task.js';
import {protect} from '../controllers/auth.js'

const router = express.Router();

// PROTECT MIDDLEWARE TO APPLY AUTHORIZATION
router.use(protect)

router.route('/')
    .get(getAllTasks)
    .post(createTask);


router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask);

export default router;