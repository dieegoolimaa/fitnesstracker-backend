const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

const exerciseRoutes = require('./exercise.routes')
router.use('/exercises', exerciseRoutes)

module.exports = router
