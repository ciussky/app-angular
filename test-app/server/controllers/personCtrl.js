module.exports = db => {
  return {
    create: (req, res) => {
      db.models.Persons.create(req.body).then((event) => {
        res.send({ success: true });

      db.query(`INSERT INTO "Junction"(id_person, id_car) VALUES(${event.id},${req.body.ngSelected[0]})`, { type: db.QueryTypes.SELECT }).then(resp => {
        res.send({ success:  true });
      }).catch(() => res.status(401));
 
      }).catch(() => res.status(401));
    },

    update: (req, res) => {
      db.models.Persons.update(req.body, { where: { id: req.body.id } }).then(() => {
        res.send({ success: true })
      }).catch(() => res.status(401));
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
