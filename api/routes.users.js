const express = require('express');
const router = express.Router();
const UserController = require('../src/controllers/UserController');
const controller = new UserController();

// Récupére tous les utilisateurs
router.get('/', (req, res) => {  (new UserController).getAll(req, res); });
// Récupére 1 utilisateur via son ID
router.get('/:id', (req, res) => { controller.getById(req, res); });
// Création d'un utilisateur
router.post('/', controller.create );
// Modification d'un utilisateur via son ID
router.put('/:id', controller.modify);
// Suppression d'un utilisateur via son ID
router.delete('/:id', controller.remove);
 
// Les autres méthodes sont donc non allouées
router.route('/').all((req,res) => { res.status(405).send(); });
router.route('/:id').all((req,res) => { res.status(405).send(); });
 
// Export du router
module.exports = router;