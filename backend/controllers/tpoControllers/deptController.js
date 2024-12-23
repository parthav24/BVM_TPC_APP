import sequelize from "../../config/database.js";

// Create a new department
export const createDepartment = async (req, res) => {
  const { dept_name } = req.body;
  try {
    await sequelize.query(
      `INSERT INTO department (dept_name) VALUES (?)`,
      {
        replacements: [dept_name],
        type: sequelize.QueryTypes.INSERT,
      }
    );
    res.status(201).json({ message: "Department created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating department", error: err.message });
  }
};

// Retrieve all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await sequelize.query(`SELECT * FROM department`, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json(departments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving departments", error: err.message });
  }
};

// Retrieve a single department by ID
export const getDepartmentById = async (req, res) => {
  const { dept_id } = req.params;

  try {
    const department = await sequelize.query(
      `SELECT * FROM department WHERE dept_id = ?`,
      {
        replacements: [dept_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (department.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving department", error: err.message });
  }
};

// Update a department
export const updateDepartment = async (req, res) => {
  const { dept_id } = req.params;
  const { dept_name } = req.body;
  console.log(dept_id, dept_name);

  try {
    const result = await sequelize.query(
      `UPDATE department SET dept_name = ? WHERE dept_id = ?`,
      {
        replacements: [dept_name, dept_id],
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    if (result[1] === 0) {
      return res
        .status(404)
        .json({ message: "Department not found or no changes made" });
    }

    res.status(200).json({ message: "Department updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating department", error: err.message });
  }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
  const { dept_id } = req.params;
  console.log(typeof(dept_id));

  try {
    // Attempt to delete the department with the provided ID
    const result = await sequelize.query(
      `DELETE FROM department WHERE dept_id = ?`,
      {
        replacements: [Number(dept_id)],
        type: sequelize.QueryTypes.DELETE,
      }
    );

    // If successful, return a success message
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (err) {
    console.log("error delete", err);
    res
      .status(500)
      .json({ message: "Error deleting department", error: err.message });
  }
};
