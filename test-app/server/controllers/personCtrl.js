module.exports = db => {
  return {
    create: async (req, res) => {
      let junction = [];
      let createdPerson = await db.models.Persons.create(req.body).catch(() => res.status(401));
      const hasCars = req.body.hasOwnProperty('ngSelected');
      if(hasCars){
        req.body.ngSelected.forEach(s => {
          junction.push({
            id_car: s,
            id_person: createdPerson.id
          })
        })
        await db.models.Junctions.bulkCreate(junction).catch(() => res.status(401));
      }
      res.send({ success: true });
    },

    update: async (req, res) => {
      const updatePerson = await db.models.Persons.update(req.body, { where: { id: req.body.id } }).catch(() => res.status(401));
      res.send({ success: true });
    },

    findAll: async (req, res) => {
      const findPersons = await db.models.Persons.findAll({ include: {association: 'cars'}, order: [['id', 'ASC']]}).catch(() => res.status(401));
        res.send(findPersons);
    },
    find: async (req, res) => {
      const editPerson = await db.models.Persons.findOne({ where: { id: req.params.id}}).catch(() => res.status(401));
      res.send(editPerson);
    },

    destroy: async (req, res) => {
      const deletePerson = await db.models.Persons.destroy({where: { id: req.params.id }}).catch(() => res.status(401));
        res.send({success: true});
    }
  }
};
