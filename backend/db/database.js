import mysql from "mysql2";

// const pool = mysql.createPool({
// 	host: "localhost",
// 	user: "root",
// 	database: "pos",
// 	password: "",
// });

// module.exports = pool.promise();

export const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "pos",
	password: "",
});
