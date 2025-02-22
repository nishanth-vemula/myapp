const express= require('express');
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.json());
let students=[
    {"id":"1","name":"raj","age":"20"},
    {"id":"2","name":"sai","age":"21"},
    {"id":"3","name":"sam","age":"22"}
];
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Home Page</h1>');
});
app.get('/text', (req, res) => {
    res.type('text/plain');
    res.send('This is a plain text response');
});
app.get('/html',(req,res)=> {
    res.type('text.html');
    res.send('<h1> this is html page </h1>');
});
app.get('/json', (req, res) => {
    res.json({ message: 'This is a JSON response', status: 'success' });
});
app.get("/students/:id",(req,res)=>{
    const id=req.params.id;
    const student=students.find(s=>s.id===id);
    if(student) {
        res.status(200).json(
            {
                "message":"Student found",student
            }
        )
    }
    else {
        res.status(404).json({"message":"Student not found"});
    }
});
app.delete("/deleteStudent/:id",(req,res)=>{
    const id=req.params.id;
    const index=students.findIndex(s=>s.id===id);
    if(index!==-1){
        students.splice(index,1);
        res.status(200).json({"message":"Student deleted"});
        }else{
            res.status(404).json({"message":"Student not found"});
            }
            });
app.post("/addStudent", (req, res) => {
    const { id, name, age } = req.body;
    if (id && name && age) {
        students.push({ id, name, age });
        res.status(201).json({ message: "Student added successfully", student: { id, name, age } });
    } else {
        res.status(400).json({ message: "Missing required fields" });
    }
});
app.put("/updateStudent/:id", (req, res) => {
    const id = req.params.id;
    const { name, age } = req.body;
    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex !== -1) {
        students[studentIndex] = { id, name, age };
        res.status(200).json({
            message: "Student updated successfully",
            student: { id, name, age }
        });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});