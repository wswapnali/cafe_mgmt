const express = require("express");
const router = express.Router();
const emplyeeService = require("../services/employeeService");

router.get("/", async function (req, res, next) {
  try {
    const cafe = req.query.cafe ? req.query.cafe : null;
    res.json(await emplyeeService.getAllEmployees(cafe));
  } catch (err) {
    console.error(`Error while getting employee `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await emplyeeService.createEmployee(req));
  } catch (err) {
    console.error(`Error while creating employee `, err.message);
    next(err);
  }
});

router.put("/", async function (req, res, next) {
  try {
    res.json(await emplyeeService.updateEmployee(req));
  } catch (err) {
    console.error(`Error while creating employee `, err.message);
    next(err);
  }
});

router.delete("/", async function (req, res, next) {
  try {
    res.json(await emplyeeService.deleteEmployee(req));
  } catch (err) {
    console.error(`Error while creating employee `, err.message);
    next(err);
  }
});

module.exports = router;
