const router = require('express').Router();
const models = require('../../db/models');
const Campus = models.Campus;

module.exports = router;

router.get('/', (req, res) => {
    Campus.findAll()
    .then(campus => res.json(campus));
});

router.get('/:id', (req, res) => {
    Campus.findById(req.params.id)
    .then(campus => {
        if (campus) res.json(campus);
        else res.sendStatus(404);
    });
});

router.post('/', (req, res) => {
    console.log('campus post');
    console.log(req.body);
    Campus.create(req.body)
    .then(campus => res.send({message: 'Campus added', campus}))
    .catch((e) => {
        console.log(e);
        res.sendStatus(505)
    });
})

router.put('/:id', (req, res) => {
    Campus.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true
    }).spread((row, updatedRow) => {
        res.send({message: 'Campus information updated', campus: updatedRow[0]})
    }) 
})

router.delete('/:id', (req, res) => {
    Campus.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => res.send({message: 'Campus Removed'}));
})
