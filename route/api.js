const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Api/AuthController');
const UserController = require('../controllers/Api/UserController');
const MasterController = require('../controllers/Api/MasterController');
const CompanyController = require('../controllers/Api/CompanyController');

const multer = require('multer');
const {company }= require("../library/Upload");
const verifyToken = require('../middleware/auth');
const rateLimiter=require("../middleware/rateLimiter");

router.post('/login', AuthController.authUser);
router.post('/refresh-token', AuthController.refreshToken);

//masters route
router.get('/company-lists',[verifyToken, rateLimiter] , MasterController.companyLists);
router.get('/user-types',[verifyToken, rateLimiter] , MasterController.userTypes);
router.get('/saluations/:companyId',[verifyToken, rateLimiter] , MasterController.saluationsList);
router.get('/blood-group/:companyId',[verifyToken, rateLimiter] , MasterController.bloodGroupList);
router.get('/departments/:companyId',[verifyToken, rateLimiter] , MasterController.departmentList);
router.get('/designations/:companyId',[verifyToken, rateLimiter] , MasterController.designationList);
router.get('/reporing-to/:companyId',[verifyToken, rateLimiter] , MasterController.usersList);
router.get('/emp-category/:companyId',[verifyToken, rateLimiter] , MasterController.employeeCategory);
router.get('/employment-type/:companyId',[verifyToken, rateLimiter] , MasterController.employmentType);
router.get('/grade-list/:companyId',[verifyToken, rateLimiter] , MasterController.gradeLists);
router.get('/country-list',[verifyToken, rateLimiter] , MasterController.countryLists);
router.get('/states-list/:countryId',[verifyToken, rateLimiter] , MasterController.stateLists);
router.get('/cities-list/:stateId',[verifyToken, rateLimiter] , MasterController.citiesList);

//users route.
router.post('/users-list',[verifyToken, rateLimiter] , UserController.usersList);
router.post('/add-user',[verifyToken, rateLimiter] , UserController.addUser);
router.put('/disable-user/:id',[verifyToken, rateLimiter] , UserController.disableUser);
router.put('/enable-user/:id',[verifyToken, rateLimiter] , UserController.enableUser);
router.delete('/delete-user/:id',[verifyToken, rateLimiter] , UserController.deleteUser);
router.put('/restore-user/:id',[verifyToken, rateLimiter] , UserController.restoreUser);
router.get('/get-user-info/:id',[verifyToken, rateLimiter] , UserController.getUserInfo);
router.put('/update-user',[verifyToken, rateLimiter] , UserController.updateUserInfo);

//company route.
router.post('/company-lists',[verifyToken, rateLimiter] , CompanyController.companyLists);
router.post('/add-company',[verifyToken, rateLimiter] , company.single('file'), CompanyController.addCompany);
router.put('/disable-company/:companyId',[verifyToken, rateLimiter] , CompanyController.diableCompany);
router.put('/enable-company/:companyId',[verifyToken, rateLimiter] , CompanyController.enableCompany);
router.get('/get-company-info/:companyId',[verifyToken, rateLimiter] , CompanyController.getCompanyInfo);
router.put('/update-company/:companyId',[verifyToken, rateLimiter] , company.single('file'), CompanyController.updateCompany);
router.delete('/delete-company/:companyId',[verifyToken, rateLimiter] , CompanyController.deleteCompany);
router.put('/restore-company/:companyId',[verifyToken, rateLimiter] , CompanyController.restoreCompany);



module.exports = router;