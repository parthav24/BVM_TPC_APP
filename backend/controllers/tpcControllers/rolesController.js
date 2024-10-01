import sequelize from "../../config/database.js";


// Add a new role
export const addRole = async (req, res) => {
    try {
        const { role_name } = req.body;

        await sequelize.query(
            `INSERT INTO roles (role_name) VALUES (?)`,
            {
                replacements: [role_name],
                type: sequelize.QueryTypes.INSERT
            }
        );

        res.status(201).json({ success: true, message: "Role added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing role
export const updateRole = async (req, res) => {
    try {
        const { role_id } = req.params;
        const { role_name } = req.body;

        await sequelize.query(
            `UPDATE roles SET role_name = ? WHERE role_id = ?`,
            {
                replacements: [role_name, role_id],
                type: sequelize.QueryTypes.UPDATE
            }
        );

        res.status(200).json({ success: true, message: "Role updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a role
export const deleteRole = async (req, res) => {
    try {
        const { role_id } = req.params;

        await sequelize.query(
            `DELETE FROM roles WHERE role_id = ?`,
            {
                replacements: [role_id],
                type: sequelize.QueryTypes.DELETE
            }
        );

        res.status(200).json({ success: true, message: "Role deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all roles
export const getRoles = async (req, res) => {
    try {
        const roles = await sequelize.query(
            `SELECT * FROM roles`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        );
 
        res.status(200).json({ success: true, data: roles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get role by id
export const getRoleById = async (req, res) => {
    try {
        const { role_id } = req.params;

        const roles = await sequelize.query(
            `SELECT * FROM roles where role_id = ? `,
            {
                replacements: [role_id],
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json({ success: true, data: roles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
