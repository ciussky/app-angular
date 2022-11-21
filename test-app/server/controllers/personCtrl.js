module.exports = db => {
  let selectedCars = []; //cars in db
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
      const updatePerson = await db.models.Persons.update(req.body, {where: { id: req.body.id}}).catch(() => res.status(401));
       
      const selectedNewCars = req.body.ngSelected;
      const carsToAdd = [];
      const carsToDelete = [];

      //user has 0 cars add all newSelected cars
      if(selectedCars.length === 0 && selectedNewCars.length > 0){
        for(let i = 0; i < selectedNewCars.length; i++){
            carsToAdd.push(selectedNewCars[i]);
        }
      }
      else{
        for (let i = 0; i < selectedNewCars.length; i++) {
          if (!selectedCars.includes(selectedNewCars[i])) {
            carsToAdd.push(selectedNewCars[i]);
          } 
        }
      }

      for (let i = 0; i < carsToAdd.length; i++) {
        await db.query(`INSERT INTO "Junctions" (id_person, id_car) VALUES(${req.body.id}, ${carsToAdd[i]})`, { type: db.QueryTypes.SELECT }).catch(() => res.status(401));
      }

      //removed selected cars, delete all cars from db
      if(selectedNewCars.length === 0 && selectedCars.length > 0){
        for(let i = 0; i < selectedCars.length; i++){
            carsToDelete.push(selectedCars[i]);
        }
      }
      else{
        for (let i = 0; i < selectedCars.length; i++) {
          if (!selectedNewCars.includes(selectedCars[i])) {
            carsToDelete.push(selectedCars[i]);
          } 
        }
      }

      for (let i = 0; i < carsToDelete.length; i++) {
        await db.query(`DELETE FROM "Junctions" WHERE id_person = ${req.body.id} and id_car = ${carsToDelete[i]}`, { type: db.QueryTypes.DELETE }).catch(() => res.status(401));
      }
      res.send({ success: true });
    },

    findAll: async (req, res) => {
      const findPersons = await db.models.Persons.findAll({ include: {association: 'cars'}, order: [['id', 'ASC']]}).catch(() => res.status(401));
        res.send(findPersons);
    },
    find: async (req, res) => {
      const editPerson = await db.models.Persons.findOne({ include: {association: 'cars'}, where: { id: req.params.id}}).catch(() => res.status(401));
      selectedCars = [];
      editPerson.cars.forEach(car => {
        selectedCars.push(car.id);
      });
      res.send(editPerson);
    },

    destroy: async (req, res) => {
      const deletePerson = await db.models.Persons.destroy({ where: { id: req.params.id }}).catch(() => res.status(401));
        res.send({success: true});
    }
  }
};
