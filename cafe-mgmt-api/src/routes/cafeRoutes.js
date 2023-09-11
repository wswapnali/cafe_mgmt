const express = require("express");
const router = express.Router();

const cafeService = require("../services/cafeService");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const fs = require("fs/promises");
const path = require("path");

async function deleteAllFilesInDir(dirPath) {
  try {
    const files = await fs.readdir(dirPath);

    const deleteFilePromises = files.map((file) =>
      fs.unlink(path.join(dirPath, file))
    );

    await Promise.all(deleteFilePromises);
  } catch (err) {
    console.log(err);
  }
}

router.get("/", async function (req, res, next) {
  try {
    const location = req.query.location ? req.query.location : null;
    res.json(await cafeService.getAllCafes(location));
  } catch (err) {
    console.error(`Error while getting cafe `, err.message);
    next(err);
  }
});

router.post("/", upload.single("logo"), async function (req, res, next) {
  try {
    res.json(await cafeService.createNewCafe(req));
  } catch (err) {
    console.error(`Error while creating cafe `, err.message);
    next(err);
  } finally {
    deleteAllFilesInDir("uploads");
  }
});

router.put("/", upload.single("logo"), async function (req, res, next) {
  try {
    res.json(await cafeService.updateCafe(req));
  } catch (err) {
    console.error(`Error while updating cafe `, err.message);
    next(err);
  } finally {
    deleteAllFilesInDir("uploads");
  }
});

router.delete("/", upload.single("logo"), async function (req, res, next) {
  try {
    res.json(await cafeService.deleteCafe(req));
  } catch (err) {
    console.error(`Error while updating cafe `, err.message);
    next(err);
  } finally {
    deleteAllFilesInDir("uploads");
  }
});

module.exports = router;
