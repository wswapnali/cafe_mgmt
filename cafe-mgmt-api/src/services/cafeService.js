const uuid = require("uuid");
const db = require("./db");
const helper = require("../../helper");
const fs = require("fs");

const getAllCafes = async (location = null) => {
  //   const offset = helper.getOffset(page, config.listPerPage);

  let sqlQuery = `SELECT cm.*, (select count(*) from cafe_employees ce where cm.id=ce.cafe_id group by cm.id) as employees
    FROM cafe_master cm  `;

  if (location) {
    sqlQuery += ` where cm.location = '` + location + `'  `;
  }
  sqlQuery += ` order by employees desc  `;
  const rows = await db.query(sqlQuery);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
};

const createNewCafe = async (req) => {
  const uuid = require("uuid");
  const id = uuid.v4();

  let message = "Something went wrong";
  const cafeData = req.body;
  const logo = req.file;

  const query =
    "INSERT INTO cafe_master (id, name, description, location) VALUES(?,?,?,?)";

  const values = [id, cafeData.name, cafeData.description, cafeData.location];

  //   return await db.query(query, values);
  const rows = await db.query(query, values);
  if (rows.affectedRows > 0) {
    message = "Cafe added succesfully";
  }

  if (logo) {
    fs.readFile(logo.path, async (err, logoData) => {
      const query = "Update cafe_master set logo = ? where id = ?";
      const values = [logoData, id];
      //   return await db.query(query, values);
      await db.query(query, values);
    });
  }

  return {
    message,
  };
};

const updateCafe = async (req) => {
  let message = "Something went wrong";
  const cafeData = req.body;
  const logo = req.file;
  const query =
    "UPDATE cafe_master SET name = ? , description = ? , logo = ? , location = ? where id = ?";
  let givenLogo = logo ? logo.toString("base64") : null;
  const values = [
    cafeData.name,
    cafeData.description,
    givenLogo,
    cafeData.location,
    cafeData.id,
  ];

  const rows = await db.query(query, values);
  if (rows.affectedRows > 0) {
    message = "Cafe updated succesfully";
  }

  return {
    message,
  };
};

const deleteCafe = async (req) => {
  let message = "Something went wrong";
  const cafeData = req.body;

  const values = [cafeData.id];
  const relationshipQuery =
    "select employee_id FROM cafe_employees WHERE cafe_id = ?";
  const relationshipQueryRows = await db.query(relationshipQuery, values);

  if (relationshipQueryRows.length > 0) {
    // delete relationship

    let empIds = relationshipQueryRows.map((row) => {
      return `'` + row["employee_id"] + `'`;
    });
    const deleteRelationQuery =
      "Delete from cafe_employees where employee_id in (" + empIds + ")";

    await db.query(deleteRelationQuery);

    // delete employee

    const deleteEmpQuery =
      "Delete from employee_master where id in (" + empIds + ")";
    await db.query(deleteEmpQuery);
  }

  // delete cafe

  const query = "DELETE FROM cafe_master WHERE id = ?";

  //   return await db.query(query, values);
  const rows = await db.query(query, values);
  if (rows.affectedRows > 0) {
    message = "Cafe deleted succesfully";
  }

  return {
    message,
  };
};

module.exports = {
  getAllCafes,
  createNewCafe,
  updateCafe,
  deleteCafe,
};
