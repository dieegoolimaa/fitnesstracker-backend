const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

//route files
const authRoutes = require('./auth.routes');
const exerciseRoutes = require('./exercise.routes');


// Use the route files
router.use('/auth', authRoutes);
router.use('/exercises', exerciseRoutes);



module.exports = router
