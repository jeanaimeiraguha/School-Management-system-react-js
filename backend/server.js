import mysql from 'mysql';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "verify"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Connected to the database");
});

/// Select all users
app.get('/select', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to fetch users" });
        return res.status(200).json(result);
    });
});

// Select all students
app.get('/studentlist', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to fetch students" });
        return res.status(200).json(result);
    });
});

// Select all courses
app.get('/selectcourse', (req, res) => {
    const sql = "SELECT * FROM courses";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to fetch courses" });
        return res.status(200).json(result);
    });
});

// Get a single student for update
app.get('/selectupd/:studentid', (req, res) => {
    const { studentid } = req.params;
    const sql = "SELECT * FROM student WHERE studentid = ?";
    db.query(sql, [studentid], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to fetch student" });
        if (result.length === 0) return res.status(404).json({ error: "Student not found" });
        return res.status(200).json(result[0]);
    });
});

// Get a single course for update
app.get('/selectcourse/:courseid', (req, res) => {
    const { courseid } = req.params;
    const sql = "SELECT * FROM courses WHERE courseid = ?";
    db.query(sql, [courseid], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to fetch course" });
        if (result.length === 0) return res.status(404).json({ error: "Course not found" });
        return res.status(200).json(result[0]);
    });
});

// Update a student
app.put('/updatestudent/:studentid', (req, res) => {
    const { studentid } = req.params;
    const { firstname, lastname, gender, dob } = req.body;
    const sql = "UPDATE student SET firstname = ?, lastname = ?, gender = ?, dob = ? WHERE studentid = ?";
    db.query(sql, [firstname, lastname, gender, dob, studentid], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to update student" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Student not found" });
        return res.status(200).json({ message: "Student updated successfully" });
    });
});

// Update a course
app.put('/updatecourse/:courseid', (req, res) => {
    const { courseid } = req.params;
    const { coursename, credit } = req.body;
    const sql = "UPDATE courses SET coursename = ?, credit = ? WHERE courseid = ?";
    db.query(sql, [coursename, credit, courseid], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to update course" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Course not found" });
        return res.status(200).json({ message: "Course updated successfully" });
    });
});

// Delete a student
app.delete('/deletestudent/:studentid', (req, res) => {
    const { studentid } = req.params;
    const sql = "DELETE FROM student WHERE studentid = ?";
    db.query(sql, [studentid], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to delete student" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Student not found" });
        return res.status(200).json({ message: "Student deleted successfully" });
    });
});

// Delete a course
app.delete('/deletecourse/:courseid', (req, res) => {
    const { courseid } = req.params;
    const sql = "DELETE FROM courses WHERE courseid = ?";
    db.query(sql, [courseid], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to delete course" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Course not found" });
        return res.status(200).json({ message: "Course deleted successfully" });
    });
});

// Insert a user
app.post('/insert', (req, res) => {
    const { username, password } = req.body;
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to insert user" });
        return res.status(201).json({ message: "User inserted successfully", id: result.insertId });
    });
});

// Insert a course
app.post('/insertcourse', (req, res) => {
    const { coursename, credit } = req.body;
    const sql = "INSERT INTO courses (coursename, credit) VALUES (?, ?)";
    db.query(sql, [coursename, credit], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to insert course" });
        return res.status(201).json({ message: "Course inserted successfully", id: result.insertId });
    });
});

// Admin login
app.post('/adminlog', (req, res) => {
    const { adminName, password } = req.body;
    const sql = "SELECT * FROM admin WHERE adminName = ? AND password = ?";
    db.query(sql, [adminName, password], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });
        return res.status(200).json({ message: "Logged in successfully!", admin: results[0] });
    });
});
//enrollment

app.post('/insertenroll',(req,res)=>{
    const{studentid,courseid,date,grade}=req.body;
    const sql ="INSERT INTO enrollment (studentid,courseid,date,grade) VALUES(?,?,?,?)";
    db.query(sql,[studentid,courseid,date,grade],(err,result)=>{
        if(err) return res.status(400).json("failed")
            return res.status(200).json(result)

    }) 
})
app.get('/selectenrollment',(req,res)=>{
    const sql="SELECT * FROM enrollment";
    db.query(sql,(err,result)=>{
        if(err) return res.status(400).json("failed")
            return res.status(200).json(result)
    })
})

app.get('/updenroll/:courseid',(req,res)=>{
    const {courseid}=req.params;
    const sql="SELECT * FROM enrollment where courseid=?";
    db.query(sql,[courseid],(err,result)=>{
        if(err) return res.status(400).json("failed")
            return res.status(200).json(result[0])
    })
})
app.delete("/deleteenrollment/:courseid",(req,res)=>{
    const{courseid}=req.params;
    const sql ="DELETE FROM enrollment WHERE courseid=?";
    db.query(sql,[courseid],(err,result)=>{
         if(err) return res.status(400).json("failed")
            return res.status(200).json(result)
        
    })
})


app.put("/updateenrollment/:courseid",(req,res)=>{
    const{courseid}=req.params;
    const{studentid,date,grade}=req.body;
    const sql ="UPDATE enrollment set studentid=? , date=? ,grade=? where courseid=?";
    db.query(sql,[,studentid,date,grade,courseid],(err,result)=>{
         if(err) return res.status(400).json("failed")
            return res.status(200).json(result)
        
    })
})



// Get GPA for all students
app.get('/gpa', (req, res) => {
  const query = `
    SELECT 
      s.studentid,
      CONCAT(s.FirstName, ' ', s.LastName) AS studentName,
      ROUND(SUM(c.Credits * 
        CASE 
          WHEN e.Grade = 'A' THEN 4.0
          WHEN e.Grade = 'B' THEN 3.0
          WHEN e.Grade = 'C' THEN 2.0
          WHEN e.Grade = 'D' THEN 1.0
          ELSE 0.0
        END) / SUM(c.Credits), 2) AS GPA
    FROM Enrollment e
    JOIN Student s ON e.studentid = s.studentid
    JOIN Course c ON e.courseid = c.Courseid
    GROUP BY s.studentid;
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch GPA' });
    }
    res.status(200).json(results);
  });
});


// Server listen
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
