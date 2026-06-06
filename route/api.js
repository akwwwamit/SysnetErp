const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Api/AuthController');
const UserController = require('../controllers/Api/UserController');
const MasterController = require('../controllers/Api/MasterController');

// API route example
router.post('/login', AuthController.authUser);

router.get('/company-lists', MasterController.companyLists);
router.get('/user-types', MasterController.userTypes);
router.get('/saluations/:companyId', MasterController.saluationsList);
router.get('/blood-group/:companyId', MasterController.bloodGroupList);
router.get('/departments/:companyId', MasterController.departmentList);
router.get('/designations/:companyId', MasterController.designationList);
router.get('/reporing-to/:companyId', MasterController.usersList);
router.get('/emp-category/:companyId', MasterController.employeeCategory);
router.get('/employment-type/:companyId', MasterController.employmentType);
router.get('/grade-list/:companyId', MasterController.gradeLists);
router.get('/country-list', MasterController.countryLists);
router.get('/states-list/:countryId', MasterController.stateLists);
router.get('/cities-list/:stateId', MasterController.citiesList);

router.post('/users-list', UserController.usersList);
router.post('/add-user', UserController.addUser);
router.put('/disable-user/:id', UserController.disableUser);
router.put('/enable-user/:id', UserController.enableUser);
router.delete('/delete-user/:id', UserController.deleteUser);
router.put('/restore-user/:id', UserController.restoreUser);
router.get('/get-user-info/:id', UserController.getUserInfo);
router.put('/update-user', UserController.updateUserInfo);





module.exports = router;