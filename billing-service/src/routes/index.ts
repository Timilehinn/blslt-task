import { Router } from "express";
import { NewDepositTransaction } from "../controllers";

const router = Router();

router.post("/new-transaction", NewDepositTransaction);

export default router;
