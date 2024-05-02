const Workout = require('../models/Workout.model');
const { isAuthenticated } = require('../middlewares/route-guard.middleware');
const router = require('express').Router();

// GET all workouts
router.get('/', async (req, res) => {
  try {
    const allWorkouts = await Workout.find();
    if (allWorkouts.length === 0) {
      return res.status(404).json({ message: 'No Workouts listed' });
    }
    res.status(200).json(allWorkouts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// GET one workout
router.get('/:workoutId', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// POST one workout
router.post('/', isAuthenticated, async (req, res) => {
  const newWorkoutPayload = req.body;
  newWorkoutPayload.createdBy = req.tokenPayload.userId;
  try {
    const newWorkout = await Workout.create(newWorkoutPayload);
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// PUT one workout
router.put('/:workoutId', async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.workoutId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout updated successfully', workout: updatedWorkout });
  } catch (error) {
    console.error('Error updating workout', error);
    res.status(500).json(error);
  }
});

// DELETE one workout
router.delete('/:workoutId', async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.workoutId);
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;

