import express from "express";
import employees from "#db/employees";
const app = express();

app.get("/", (req, res) => {
  try {
    res.send("Hello employees!");
  } catch (err) {
    console.error(err);
  }
});

app.get("/employees", (req, res) => {
  try {
    res.send(employees);
  } catch (err) {
    console.error(err);
  }
});

app.get("/employees/random", (req, res, next) => {
  try {
    const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
    res.send(randomEmployee);
  } catch (err) {
    next(err);
  }
});

app.get("/employees/:id", (req, res, next) => {
  try {
    const { id: employeeId } = req.params;

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === parseInt(employeeId)) {
        res.send(employees[i]);
        return;
      }
    }

    const idError = Error("Employee not found.");
    idError.code = 404;
    throw idError;
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(err.code || 500).send(err.message);
});

export default app;
