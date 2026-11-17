
const express = require("express");
const router = express.Router();

let students = require("../data/students");

// GET all students
router.get("/", (req, res) => {
    res.status(200).json({
        message: "All students fetched successfully",
        students: students
    });
});

// GET student by ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json({
        message: "Student found successfully",
        student: student
    });
});

// POST - Add new student
router.post("/", (req, res) => {
    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email ||
        !Number.isInteger(age) || age <= 0) {
        return res.status(400).json({
            message: "Please provide valid name, age, course and email"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name,
        age,
        course,
        email
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update student
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email ||
        !Number.isInteger(age) || age <= 0) {
        return res.status(400).json({
            message: "Please provide valid name, age, course and email"
        });
    }

    student.name = name;
    student.age = age;
    student.course = course;
    student.email = email;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE - Delete student
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

module.exports = router;
