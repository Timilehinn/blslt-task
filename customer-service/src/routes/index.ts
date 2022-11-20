import { Router } from "express";
import { Deposit, ViewBalance, ViewTransactions } from "../controllers/Customer";

const router = Router();

router.post("/deposit", Deposit);
router.get("/get-balance", ViewBalance);
router.get("/get-transactions", ViewTransactions);


export default router;
