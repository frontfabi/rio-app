const express = require('express')
const router = express.Router()
const passport = require('passport')


// @route   GET api/job/
// @desc    Return all company jobs
// @access  Private

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const job = await Job.find().populate('company');

    return res.send({
      job
    });
  }
  catch (err) {
    res.status(400).send({
      error: ' Erro ao carregar as vagas',
    });
  }
});

// @route   GET api/job/:jobId
// @desc    Return one company job
// @access  Private
router.get('/:jobId', passport.authenticate('jwt', { session: false }),
  async (req, res) => {

    try {
      const job = await Job.findById(req.params.projectId).populate('company');

      return res.send({
        job
      });
    }
    catch (err) {
      res.status(400).send({
        error: ' Erro ao carregar as vagas',
      });
    }
  });


// @route   POST api/job/
// @desc    Create new job
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, company: req.companyId });

    return res.send({
      job
    });

  }
  catch (err) {
    res.status(400).send({
      error: ' Erro ao criar a vaga',
    });
  }
});


// @route   PUT api/job/:jobId
// @desc    Update a job
// @access  Private
router.put('/:jobId', passport.authenticate('jwt', { session: false }), async (req, res) => {

  const { name, occupation } = req.body; //this is example TO DO add all 

  try {
    const job = await Job.findOneAndUpdate(req.params.jobId, { name, occupation }, { new: true });

    await job.save();

    return res.send({
      job
    });
  }
  catch (err) {
    res.status(400).send({
      error: ' Erro ao carregar a vaga',
    });
  }
});


// @route   DELETE api/job/:jobId
// @desc    Update  job
// @access  Private
router.post('/:jobId', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.jobId);

    return res.send();
  }
  catch (err) {
    res.status(400).send({
      error: ' Erro ao deletar a vaga',
    });
  }
})

module.exports = router