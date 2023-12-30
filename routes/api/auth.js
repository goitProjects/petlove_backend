const express = require('express');
const ctrl = require('../../controllers/users');
const { validateBody, authenticate, validateId } = require('../../middlewares');
const { schemas } = require('../../models/user');
const { schemas: schemasPet } = require('../../models/pet');
const router = express.Router();

router.post('/signup', validateBody(schemas.signupSchema), ctrl.signup);
router.post('/signin', validateBody(schemas.signinSchema), ctrl.signin);
router.get('/current', authenticate, ctrl.currentUser);
router.get('/current/full', authenticate, ctrl.currentUserFull);
router.patch('/current/edit', authenticate, validateBody(schemas.updateUserSchema), ctrl.updateUser);
router.post('/current/pets/add', authenticate, validateBody(schemasPet.addPetSchema), ctrl.addPet);
router.delete('/current/pets/remove/:id', authenticate, validateId, ctrl.removePet);
router.post('/signout', authenticate, ctrl.signout);

module.exports = router;
