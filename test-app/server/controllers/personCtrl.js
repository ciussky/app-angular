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
      db.models.Persons.update(req.body, { where: { id: req.body.id } }).then(() => {
        res.send({ success: true })
      }).catch(() => res.status(401));
    },

    findAll: async (req, res) => {
      await db.models.Persons.findAll({ include: {association: 'cars'}}).then(resp => {
        res.send(resp);
      })
    },
    find: (req, res) => {
      db.query(`SELECT id, fname, lname, cnp, age
      FROM "Persons"`, { type: db.QueryTypes.SELECT }).then(resp => {
        res.send(resp[0]);
      }).catch(() => res.status(401));
    },

    destroy: (req, res) => {
      // db.query(`DELETE FROM "Persons" WHERE id = ${req.params.id}`, { type: db.QueryTypes.DELETE }).then(() => {
      //   res.send({ success: req.params.id });
      // }).catch(() => res.status(401));

      db.models.Persons.destroy({where: { id: req.params.id }}).then(() => {
        res.send({ success: req.body.id });
      }).catch(() => res.status(401));
    }
  }
};
