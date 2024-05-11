import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { db } from "./db/database.js";
import * as bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("frontend/public"));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "frontend/public/images/");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + "_" + Date.now() + path.extname(file.originalname)
		);
	},
});

const upload = multer({
	storage: storage,
});

app.post("/upload/:id", upload.single("file"), (req, res) => {
	// console.log(req.file);
	const image = req.file.filename;
	const id = req.params.id;
	const sql = "UPDATE products SET `imageUrl` =? WHERE id=?";
	db.query(sql, [image, id], (err, result) => {
		if (err) return res.json({ Message: "Error" });
		return res.json({ Status: "Success" });
	});
});

//get Data from db
app.get("/g", (req, res) => {
	// res.send("Hello");
	console.log(req.body);
	const sql = "SELECT * FROM products";
	db.query(sql, (err, result) => {
		console.log(result);
		if (err) return res.json({ Message: "Error inside server", err });
		return res.json(result);
	});
});

//Insert into db
app.post("/products", (req, res) => {
	const sql = "INSERT INTO products(`title`,`description`) VALUES(?)";
	const values = [req.body.productName, req.body.productDescription];
	db.query(sql, [values], (err, result) => {
		if (err) return res.json({ Message: "error inside server", err });
		return res.json(result);
	});
});

//read product details
app.get("/read/:id", (req, res) => {
	// res.send("Hello");
	const sql = "SELECT * FROM products WHERE id= ?";
	const id = req.params.id;
	db.query(sql, [id], (err, result) => {
		if (err) return res.json({ Message: "Error inside server", err });
		return res.json(result);
	});
});

//update product

app.put("/update/:id", (req, res) => {
	const sql = "UPDATE products SET `title`=?, `description`=? WHERE id=?";
	const id = req.params.id;
	db.query(sql, [req.body.title, req.body.description, id], (err, result) => {
		if (err) return res.json({ Message: "error inside server", err });
		return res.json(result);
	});
});

//Delete
app.delete("/delete/:id", (req, res) => {
	const sql = "DELETE FROM products WHERE id =?";
	const id = req.params.id;
	db.query(sql, [id], (err, result) => {
		if (err) return res.json({ Message: "error inside server", err });
		return res.json(result);
	});
});

app.listen(5000, async () => {
	console.log("Server is running on port 5000");
	// const saltOrRound = 10;
	// const encrypted = await bcrypt.hash("Ivan", saltOrRound);
	// console.log(encrypted);
});
