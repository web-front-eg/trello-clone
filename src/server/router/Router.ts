import express from "express";
import * as Control from "../controller/Control";

export const router = express.Router();

// save lists
router.post("/", Control.saveLists);
router.post("/detect", Control.detectAnyChange);

// load lists
router.get("/", Control.loadLists);
