import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveyController } from "./controllers/SurveysController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveyController();


router.post("/users", userController.create);
router.post("/surveys", surveysController.create);


export { router };
