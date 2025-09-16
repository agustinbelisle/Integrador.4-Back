import { Router } from "express"; 
import { handleContactForm } from "../../controllers/contact/contactController";

const router = Router();


router.post("/", (req, res, next) => {
  Promise.resolve(handleContactForm(req, res)).catch(next);
});

export default router;
