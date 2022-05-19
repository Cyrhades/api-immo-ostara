const uuidAPIKey = require('uuid-apikey');
const UserRepository = require('../repository/UserRepository');

module.exports = (req, res, next)  => {
    // Validation de la clef API, exemple ApiKey : 1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X
    if (typeof req.headers['x-api-key'] == 'undefined' || uuidAPIKey.isAPIKey(req.headers['x-api-key']) !== true ) {
        res.status(400).json({error : `La demande n'est pas valide.`});
        return;
    } 
    // On doit convvertir la clef API en UUID
    const uuid = uuidAPIKey.toUUID(req.headers['x-api-key']);
    // On recherche 
    UserRepo.findByUuid(uuid).then((record)=> {
        if(record)  next();
        else res.status(404).json({error : `La demande n'est pas valide.`});
    }).catch((error) => { 
        res.status(404).json({error : `La demande n'est pas valide.`});
    });
};