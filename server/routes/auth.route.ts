import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";
import { passport as googlePassport } from "../strategies/google.strategy";
import {
  passportLoginMiddleware,
  passportSignUpMiddleware,
} from "../middlewares/passportMiddleware";
import RedirectMeBaby from "../utils/redirector";

const router = Router();

router.post("/register", passportSignUpMiddleware, registerUser);
router.post("/login", passportLoginMiddleware, loginUser);
router.get(
  "/google",
  googlePassport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/google/callback",
  googlePassport.authenticate("google", { failureRedirect: "/login" }),
  RedirectMeBaby,
  loginUser
);
router.get("/logout", logoutUser);

export default router;
