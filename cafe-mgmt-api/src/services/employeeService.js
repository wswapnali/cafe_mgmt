const db = require("./db");
const helper = require("../../helper");

const getAllEmployees = async (cafe = null) => {
  //   const offset = helper.getOffset(page, config.listPerPage);
  let whereCond = "";
  if (cafe) {
    whereCond = `where ce.cafe_id='` + cafe + `' `;
  }
  let sqlQuery =
    ` select em.*,
      cm.name as cafe_name,
      cm.id as cafe_id,
      DATEDIFF(CURDATE(), ce.start_date) as days_worked
      from employee_master em
      left join cafe_employees ce
      on em.id=ce.employee_id left join cafe_master cm
    on ce.cafe_id = cm.id
    ` +
    whereCond +
    ` 
    order by days_worked desc
      `;

  const rows = await db.query(sqlQuery);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
};

const createEmployee = async (req) => {
  const uuid = require("uuid");
  const iduuid = uuid.v4();
  let id = "UI" + iduuid.substring(0, 7);

  let message = "Something went wrong";
  const empData = req.body;

  const query =
    "INSERT INTO employee_master (id, name, email_address, phone_number, gender) VALUES(?,?,?,?,?)";
  const values = [
    id,
    empData.name,
    empData.email_address,
    empData.phone_number,
    empData.gender,
  ];

  const rows = await db.query(query, values);

  if (empData?.cafe) {
    const cafeEmpQuery =
      "insert into cafe_employees (cafe_id, employee_id, start_date)  values( ? , ? , ?)";

    let now = new Date();

    const month = now.getMonth() + 1;
    let start_date = empData.start_date
      ? empData.start_date
      : now.getFullYear() + "-" + month + "-" + now.getDate();
    const cafeEmpValues = [empData.cafe, id, start_date];
    await db.query(cafeEmpQuery, cafeEmpValues);
  }

  if (rows.affectedRows > 0) {
    message = "Employee added succesfully";
  }

  return {
    message,
  };
};

const deleteEmployee = async (req) => {
  const data = req.body;

  const cafe_employees_query =
    "Delete from cafe_employees where employee_id = ?";
  const cafe_employees_values = [data.id];

  await db.query(cafe_employees_query, cafe_employees_values);

  const employee_master_query = "Delete from employee_master where id = ?";
  const employee_master_values = [data.id];

  const rows = await db.query(employee_master_query, employee_master_values);

  if (rows.affectedRows > 0) {
    message = "Employee deleted succesfully";
  }

  return {
    message,
  };
};

const updateEmployee = async (req) => {
  const data = req.body;

  let now = new Date();

  const month = now.getMonth() + 1;
  let start_date = data?.start_date
    ? data?.start_date
    : now.getFullYear() + "-" + month + "-" + now.getDate();

  if (data.cafe) {
    const cafe_employees_query_del =
      "DELETE from cafe_employees where employee_id = ?";
    const cafe_employees_query_val = [data.id];

    const rowsDelete = await db.query(
      cafe_employees_query_del,
      cafe_employees_query_val
    );

    const cafe_employees_query =
      "INSERT INTO cafe_employees (cafe_id,employee_id,start_date) values(?,?,?)";
    const cafe_employees_values = [data.cafe, data.id, start_date];
    const rowsUpdate = await db.query(
      cafe_employees_query,
      cafe_employees_values
    );
  }
  const employee_master_query =
    "Update employee_master set name =? , email_address=?,phone_number=?,gender=? where id = ?";
  const employee_master_values = [
    data.name,
    data.email_address,
    data.phone_number,
    data.gender,
    data.id,
  ];
  const rows = await db.query(employee_master_query, employee_master_values);

  if (rows.affectedRows > 0) {
    message = "Employee updated succesfully";
  }

  return {
    message,
  };
};

module.exports = {
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
