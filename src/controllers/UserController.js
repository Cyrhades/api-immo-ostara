const UserRepository = require('../repository/UserRepository');
const serviceApiResponse = require('../services/dataApiResponse');

module.exports = class UserController {
    getAll(request, response) {
        const page = request.query.page || 1;
        const limit = 100;
        const offset = page * limit - limit;
        const User = new UserRepository();
        User.countAll().then(count => {
            User.selectAll(offset, limit).then(users => {            
                response.status(200).json(serviceApiResponse(users, page, count, limit));
            });
        });
    }

    getById(request, response) {
        const User = new UserRepository();
        User.selectOneById(request.params.id).then(user => {            
            response.status(200).json(serviceApiResponse(user));
        });
    }

    create(request, response) {
        const User = new UserRepository();
        let entity = {
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            email: request.body.email,
            password: request.body.password,
        };
        
        User.insert(entity).then(result => {
            response.status(201).json(serviceApiResponse(result));
        });
    }

    modify(request, response) {
       
        let entity = {};
        let fields = ['firstname', 'lastname', 'email', 'password'];
        fields.forEach(field => { if (request.body[field])  entity[field] = request.body[field]; });
        const User = new UserRepository();
        User.update(request.params.id, entity).then(result => {
            response.status(200).json(serviceApiResponse(result));
        });
    }

    remove(request, response) {
        const User = new UserRepository();
        User.delete(request.params.id).then(result => {
            response.status(200).json(serviceApiResponse(result));
        });
    }
}