const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

//route files
const authRoutes = require('./auth.routes');
const exerciseRoutes = require('./exercise.routes');
const workoutRoutes = require('./workout.routes');

// Use the route files
router.use('/auth', authRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/workouts', workoutRoutes);


module.exports = router
