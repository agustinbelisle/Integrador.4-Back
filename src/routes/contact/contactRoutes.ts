import { Router } from "express"; 
import { handleContactForm } from "../../controllers/contact/contactController";

const router = Router();

// Cambié la ruta a '/' para que quede /api/contact al montar en index.ts
router.post("/", (req, res, next) => {
  Promise.resolve(handleContactForm(req, res)).catch(next);
});

export default router;
