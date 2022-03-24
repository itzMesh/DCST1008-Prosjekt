import mysql from 'mysql';

// Create a pool of connections to the mysql server.
// Read more about connection pools here: https://en.wikipedia.org/wiki/Connection_pool
export let pool = mysql.createPool({
	host: 'mysql-ait.stud.idi.ntnu.no',
	connectionLimit: 14, // Limit the number of simultaneous connections to avoid overloading the mysql server
	user: 'martishv', // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
	password: 'WdEfiC0a', // Replae "password" with your mysql-ait.stud.idi.ntnu.no password
	database: 'martishv', // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
});
