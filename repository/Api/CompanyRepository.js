let DB = require("../../models/index");
let codeGenerator = require("../../library/CodeGenerator");
let response = require("../../library/Response");
let message = require("../../library/Message");
let { Op } = require("sequelize");
const validator = require("validator");

const fs = require("fs");
const path = require("path");

let companyLists = async (req, res) => {
  try {
    let limit = parseInt(req.body.limit) || 10;
    let pageNumber = parseInt(req.body.pageNumber) || 1;
    const offset = (pageNumber - 1) * limit;
    const keyword = req.body.keyword || "";

    let whereClause = {};
    if (req.body.search.name.trim()) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${req.body.search.name.trim()}%` } },
      ];
    }

    if (req.body.search.location.trim()) {
      whereClause[Op.or] = [
        { location: { [Op.like]: `%${req.body.search.location.trim()}%` } },
      ];
    }

    if (req.body.search.description.trim()) {
      whereClause[Op.or] = [
        {
          description: { [Op.like]: `%${req.body.search.description.trim()}%` },
        },
      ];
    }

    if (req.body.search.status?.trim()) {
      whereClause.status = req.body.search.status.trim();
    }

    let dataList = await DB.Company.findAndCountAll({
      where: whereClause,
      attributes: [
        "id",
        "name",
        "logo",
        "location",
        "description",
        "status",
        "created_at",
        "updated_at",
      ],
      include: [{ model: DB.ApprovalStatus, left: true, attributes: ["name"] }],
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    let data = {
      totalRecord: dataList.count,
      totalpage: Math.ceil(dataList.count / limit),
      records: dataList.rows,
    };
    let messages = dataList?.count ? message.recordFound : message.noRecord;
    return response.success(res, messages, data);
  } catch (error) {
    console.log(error);
    return response.error(res, message.serverError);
  }
};

const addCompany = async (req, res) => {
    try {

        let client=await DB.Company.create({
          "name":validator.escape(req.body.name.trim()),
          "location":validator.escape(req.body.location.trim()),
          "description":validator.escape(req.body.description.trim()),
          "logo":req?.file?.filename ? req?.file?.filename : 'default.png',
          "status":1,
          "approval_status":1,
          "created_at":Date.now(),
          "created_by":req.body.createdBy,
        });
        if (client) {
          return response.success(res, message.created);
        }else {
          return response.error(res, message.serverError);
        }

    } catch (err) {
      console.log(err);
        return response.error(res, message.serverError);
    }
}

//going to disable company.
let diableCompany=async(req, res)=>{
    try {
        let disable=await DB.Company.update({
          "status":"0"
        },{
          where:{id:req.params.companyId}
        });
        if (disable) {
          return response.success(res, message.disabled);
        }else {
          return response.error(res, message.serverError);
        }
    } catch (err) {
      console.log(err);
        return response.error(res, message.serverError);
    }
}

//going to enable company.
let enableCompany=async(req, res)=>{
    try {
        let enable=await DB.Company.update({
          "status":"1"
        },{
          where:{id:req.params.companyId}
        });
        if (enable) {
          return response.success(res, message.enabled);
        }else {
          return response.error(res, message.serverError);
        }
    } catch (err) {
      console.log(err);
        return response.error(res, message.serverError);
    }
}

//going to enable company.
let getCompanyInfo=async(req, res)=>{
    try {
        let info=await DB.Company.findOne({
          where:{id:req.params.companyId},
          attributes:['id', 'name', 'logo', 'location', 'description', 'status', 'approval_status_id']
        });
        if (info) {
          return response.success(res, message.recordFound, info);
        }else {
          return response.error(res, message.serverError);
        }
    } catch (err) {
      console.log(err);
        return response.error(res, message.serverError);
    }
}

//going to update company info.
let updateCompany=async(req, res)=>{
    try {
       let info=await DB.Company.findOne({
          where:{id:req.params.companyId},
          attributes:['id', 'name', 'logo', 'location', 'description', 'status', 'approval_status_id']
        });
        let oldLogo=info?.logo ? info?.logo : 'default.png';

        let updateClient=await DB.Company.update({
          "name":validator.escape(req.body.name.trim()),
          "location":validator.escape(req.body.location.trim()),
          "description":validator.escape(req.body.description.trim()),
          "logo":req?.file?.filename ? req?.file?.filename : oldLogo,
          "approval_status":1,
          "updated_at":Date.now(),
          "updated_by":req.body.createdBy,
        },{
           where:{id:req.params.companyId}
        });
        if (updateClient) {
          return response.success(res, message.updated);
        }else {
          return response.error(res, message.serverError);
        }
    } catch (err) {
      console.log(err);
        return response.error(res, message.serverError);
    }
}

//going to delete company.
let deleteCompany=async(req, res)=>{
    try {
        let deleteCompany=await DB.Company.destroy({
          where:{id:req.params.companyId}
        });
        
        if (deleteCompany) {
          return response.success(res, message.deleted);
        }else {
          return response.error(res, message.serverError);
        }
    } catch (err) {
      console.log(err);
        return response.error(res, message.serverError);
    }
}

//going to restore company.
let restoreCompany=async(req, res)=>{
    try {
        let deleteCompany=await DB.Company.restore({
          where:{id:req.params.companyId}
        });
        
        if (deleteCompany) {
          return response.success(res, message.restored);
        }else {
          return response.error(res, message.serverError);
        }
    } catch (err) {
      console.log(err);
        return response.error(res, message.serverError);
    }
}

module.exports = {
  companyLists,
  addCompany,
  diableCompany,
  enableCompany,
  getCompanyInfo,
  updateCompany,
  deleteCompany,
  restoreCompany
};
