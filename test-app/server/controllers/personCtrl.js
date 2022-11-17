module.exports = db => {
  return {
    create: async (req, res) => {
      let selectedCars = req.body.ngSelected;
      let junction = [];
      let createdPerson = await db.models.Persons.create(req.body).catch(() => res.status(401));

      res.send({ success: true });

      if(selectedCars.length > 0){
        selectedCars.forEach(s => {
          junction.push({
            id_car: s,
            id_person: createdPerson.id
          });
        });
      }
 

      await db.models.Junction.bulkCreate(junction).catch(() => res.status(401));
    },

    update: async (req, res) => {
      await db.models.Persons.update(req.body, { where: { id: req.body.id } }).catch(() => res.status(401));
        res.send({ success: req.body.id })
    },

    findAll: (req, res) => {
      db.query(`SELECT * FROM "Persons" LEFT JOIN "Junction" ON "Persons".id = "id_person" LEFT JOIN "Cars" on "Cars".id = "id_car"`, { type: db.QueryTypes.SELECT }).then(resp => {
        res.send(resp);
      }).catch(() => res.status(401));
    },

    find: (req, res) => {
      db.query(`SELECT id, fname, lname, cnp, age
      FROM "Persons"`, { type: db.QueryTypes.SELECT }).then(resp => {
        res.send(resp[0]);
      }).catch(() => res.status(401));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "Persons" WHERE id = ${req.params.id}`, { type: db.QueryTypes.DELETE }).then(() => {
        res.send({ success: true });
      }).catch(() => res.status(401));
    }
  };
};
