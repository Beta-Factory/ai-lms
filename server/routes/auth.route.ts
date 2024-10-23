import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";
import { passport } from "../strategies/local.strategy";
import { passport as googlePassport } from "../strategies/google.strategy";
import RedirectMeBaby from "../utils/redirector";

const router = Router();

router.post(
  "/register",
  passport.authenticate("local-signup"),
  registerUser,
  RedirectMeBaby
);
router.post(
  "/login",
  (req, res, next) => {
    passport.authenticate(
      "local-login",
      (err: { message: any }, user: any, info: { message: any }) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        if (!user) {
          console.log("info", info);
          return res.status(400).json({ message: info.message });
        }
        return res
          .status(200)
          .json({ message: "User registered successfully", user });
      }
    )(req, res, next);
  },
  loginUser,
  RedirectMeBaby
);
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
