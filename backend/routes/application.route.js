import express from "express";
import{ applyjob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controllers.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,applyjob)
router.route("/get").get(isAuthenticated,getAppliedJobs)
router.route("/:id/application").get(isAuthenticated,getApplicants)
router.route("/status/:id/update").post(isAuthenticated,updateStatus)


export default router;