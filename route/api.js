const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Api/AuthController');
const UserController = require('../controllers/Api/UserController');
const MasterController = require('../controllers/Api/MasterController');
const CompanyController = require('../controllers/Api/CompanyController');

const multer = require('multer');
const {company }= require("../library/Upload");
const verifyToken = require('../middleware/auth');

router.post('/login', AuthController.authUser);

//masters route
router.get('/company-lists',[verifyToken] , MasterController.companyLists);
router.get('/user-types',[verifyToken] , MasterController.userTypes);
router.get('/saluations/:companyId',[verifyToken] , MasterController.saluationsList);
router.get('/blood-group/:companyId',[verifyToken] , MasterController.bloodGroupList);
router.get('/departments/:companyId',[verifyToken] , MasterController.departmentList);
router.get('/designations/:companyId',[verifyToken] , MasterController.designationList);
router.get('/reporing-to/:companyId',[verifyToken] , MasterController.usersList);
router.get('/emp-category/:companyId',[verifyToken] , MasterController.employeeCategory);
router.get('/employment-type/:companyId',[verifyToken] , MasterController.employmentType);
router.get('/grade-list/:companyId',[verifyToken] , MasterController.gradeLists);
router.get('/country-list',[verifyToken] , MasterController.countryLists);
router.get('/states-list/:countryId',[verifyToken] , MasterController.stateLists);
router.get('/cities-list/:stateId',[verifyToken] , MasterController.citiesList);

//users route.
router.post('/users-list',[verifyToken] , UserController.usersList);
router.post('/add-user',[verifyToken] , UserController.addUser);
router.put('/disable-user/:id',[verifyToken] , UserController.disableUser);
router.put('/enable-user/:id',[verifyToken] , UserController.enableUser);
router.delete('/delete-user/:id',[verifyToken] , UserController.deleteUser);
router.put('/restore-user/:id',[verifyToken] , UserController.restoreUser);
router.get('/get-user-info/:id',[verifyToken] , UserController.getUserInfo);
router.put('/update-user',[verifyToken] , UserController.updateUserInfo);

//company route.
router.post('/company-lists',[verifyToken] , CompanyController.companyLists);
router.post('/add-company',[verifyToken] , company.single('file'), CompanyController.addCompany);
router.put('/disable-company/:companyId',[verifyToken] , CompanyController.diableCompany);
router.put('/enable-company/:companyId',[verifyToken] , CompanyController.enableCompany);
router.get('/get-company-info/:companyId',[verifyToken] , CompanyController.getCompanyInfo);
router.put('/update-company/:companyId',[verifyToken] , company.single('file'), CompanyController.updateCompany);
router.delete('/delete-company/:companyId',[verifyToken] , CompanyController.deleteCompany);
router.put('/restore-company/:companyId',[verifyToken] , CompanyController.restoreCompany);



module.exports = router;