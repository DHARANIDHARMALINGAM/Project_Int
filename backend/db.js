const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',     
  user: 'root',        
  password: 'root', 
  database: 'Users'  
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to Mysql Database');
});

module.exports = connection;
