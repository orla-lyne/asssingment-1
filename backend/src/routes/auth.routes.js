const express = require("express");
const { body } = require("express-validator");
const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
    body("email").trim().isEmail().withMessage("Enter a valid email").normalizeEmail(),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  ],
  validate,
  controller.register
);

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Enter a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  controller.login
);

router.get("/me", authenticate, controller.me);
router.post("/logout", authenticate, controller.logout);

module.exports = router;
