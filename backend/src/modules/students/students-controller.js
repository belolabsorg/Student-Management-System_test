const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, class: className, section, roll } = req.query;

    const students = await getAllStudents({
        name,
        className,
        section,
        roll,
    });
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const { name, class: className, section, roll } = req.body;
    const newStudent = await addNewStudent({
        name,
        class: className,
        section,
        roll,
    });
    res.json(newStudent);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const payload = {
        ...req.body,
        userId: parseInt(id),
    };

    const updatedStudent = await updateStudent(payload);

    res.json(updatedStudent);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const student = await getStudentDetail(parseInt(id));
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id, reviewerId } = req.params;
    const { status } = req.body;

    const student = await setStudentStatus({
        userId: parseInt(id),
        reviewerId,
        status,
    });

    res.json(student);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
