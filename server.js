const express = require('express');
const app = express();
require('dotenv').config()
 
//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
const apiRoutes = require('./api/routes.js');
const apiKeyControl = require('./src/middlewares/apiKeyControl.js');
app.use('/api', apiKeyControl, apiRoutes);
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.PORT_HTTP, () => {
    console.log(`Le serveur est démarré : http://localhost:${process.env.PORT_HTTP}` );
});
