const express = require("express");
const { body } = require("express-validator");
const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validate");
const controller = require("../controllers/task.controller");
const { allowedStatus } = require("../services/task.service");

const router = express.Router();
router.use(authenticate);

const taskValidation = [
  body("title").optional().trim().notEmpty().withMessage("Title is required").isLength({ max: 120 }),
  body("description").optional().trim().isLength({ max: 1000 }),
  body("status").optional().isIn(allowedStatus).withMessage("Invalid status"),
  body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Invalid due date"),
];

router.get("/", controller.getAll);
router.post(
  "/",
  [
    body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 120 }),
    body("description").optional().trim().isLength({ max: 1000 }),
    body("status").optional().isIn(allowedStatus).withMessage("Invalid status"),
    body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Invalid due date"),
  ],
  validate,
  controller.create
);
router.get("/:id", controller.getOne);
router.put("/:id", taskValidation, validate, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
