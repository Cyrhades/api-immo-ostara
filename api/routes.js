const express = require('express');
const apiUsersRoutes = require('./routes.users.js');
const router = express.Router();
 
router.use(express.json()); 
// ... chargement de vos prochaines routes ici
router.use('/user', apiUsersRoutes); // /api/user
 
// Si une route n'existe pas, erreur 404
router.route("*").all((req,res) => { res.status(404).send(); });
module.exports = router;