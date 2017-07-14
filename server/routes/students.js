const router = require('express').Router();
const models = require('../../db/models');
const Student = models.Student;

module.exports = router;

router.get('/', (req, res) => {
    Student.findAll()
    .then(student => res.json(student));
});

router.get('/:id', (req, res) => {
    Student.findById(req.params.id)
    .then(student => {
        if (student) res.json(student);
        else res.sendStatus(404);
    });
});

router.post('/', (req, res) => {
    
    Student.create(req.body)
    .then(student => res.send(student))
    .catch(() => res.sendStatus(505));
})

router.put('/:id', (req, res, next) => {
    Student.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(student => student.update(req.body))
    .then(result => res.json(result))
    .catch(next);
})

router.delete('/:id', (req, res) => {
    Student.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => res.send({message: 'Student Removed'}));
})