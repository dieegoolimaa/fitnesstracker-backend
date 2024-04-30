const Exercise = require('../models/Book.model')
const { isAuthenticated } = require('../middlewares/route-guard.middleware')
const router = require('express').Router()

// GET all exercises
router.get('/', async (req, res) => {
  try {
    const allExercises = await Exercise.find()
    res.status(200).json(allExercises)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})
// GET one exercise
router.get('/:exerciseId', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.exerciseId)
    res.status(200).json(exercise)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})
// POST one exercise
router.post('/', isAuthenticated, async (req, res) => {
    const newExercisePayload = req.body 
    newExercisePayload.createdBy = req.tokenPayload.userId
    try {
      const newExercise = await Book.create(newExercisePayload)
      res.status(201).json(newExercise)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  })
// PUT one exercise
router.put('/:exerciseId', async (req, res) => {
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.exerciseId, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ message: 'Exercise updates successfully', exercise: updatedExercise })
  } catch (error) {
    console.log('Error updating exercise', error)
    res.status(500).json(error)
  }
})
// DELETE one exercise
router.delete('/:exerciseId', async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.exerciseId)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})
module.exports = router