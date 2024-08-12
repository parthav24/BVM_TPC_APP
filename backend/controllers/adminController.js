import sequelize from "../config/database.js";

export const approveUser = async (req, res) => {
  const { uid } = req.body;

  try {
    // Start a transaction
    await sequelize.transaction(async (t) => {
      // Fetch the user from the pending_users table
      const pendingUser = await sequelize.query(
        `SELECT * FROM pending_users WHERE uid = ?`,
        {
          replacements: [uid],
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      );

      // Check if the user exists in the pending_users table
      if (pendingUser.length === 0) {
        return res
          .status(404)
          .json({ message: "User not found in pending users" });
      }

      // Insert the user into the users table
      await sequelize.query(
        `INSERT INTO users (uid, dept_id, role, f_name, m_name, l_name, dob, gender, email, mobile, address, password, passout_year)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        {
          replacements: [
            pendingUser[0].uid,
            pendingUser[0].dept_id,
            pendingUser[0].role,
            pendingUser[0].f_name,
            pendingUser[0].m_name,
            pendingUser[0].l_name,
            pendingUser[0].dob,
            pendingUser[0].gender,
            pendingUser[0].email,
            pendingUser[0].mobile,
            pendingUser[0].address,
            pendingUser[0].password,
            pendingUser[0].passout_year,
          ],
          type: sequelize.QueryTypes.INSERT,
          transaction: t,
        }
      );

      // Fetch the user's results from the pending_results table
      const pendingResult = await sequelize.query(
        `SELECT * FROM pending_results WHERE id = ?`,
        {
          replacements: [uid],
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      );

      // Check if the result exists in the pending_results table
      if (pendingResult.length === 0) {
        return res
          .status(404)
          .json({ message: "Result not found in pending results" });
      }

      // Insert the user's results into the results table
      await sequelize.query(
        `INSERT INTO result (id, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, cpi, ssc_percentage, hsc_percentage, diploma_cpi, no_active_backlog, no_dead_backlog)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        {
          replacements: [
            pendingResult[0].id,
            pendingResult[0].sem1,
            pendingResult[0].sem2,
            pendingResult[0].sem3,
            pendingResult[0].sem4,
            pendingResult[0].sem5,
            pendingResult[0].sem6,
            pendingResult[0].sem7,
            pendingResult[0].sem8,
            pendingResult[0].cpi,
            pendingResult[0].ssc_percentage,
            pendingResult[0].hsc_percentage,
            pendingResult[0].diploma_cpi,
            pendingResult[0].no_active_backlog,
            pendingResult[0].no_dead_backlog,
          ],
          type: sequelize.QueryTypes.INSERT,
          transaction: t,
        }
      );

      // Remove the user's results from the pending_results table
      await sequelize.query(`DELETE FROM pending_results WHERE id = ?`, {
        replacements: [uid],
        type: sequelize.QueryTypes.DELETE,
        transaction: t,
      });

      // Remove the user from the pending_users table
      await sequelize.query(`DELETE FROM pending_users WHERE uid = ?`, {
        replacements: [uid],
        type: sequelize.QueryTypes.DELETE,
        transaction: t,
      });
    });

    res
      .status(200)
      .json({ message: "User approved and added to users and results tables" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error approving user", error: err.message });
  }
};

export const rejectUser = async (req, res) => {
  const { uid } = req.body;

  try {
    // Start a transaction
    await sequelize.transaction(async (t) => {
      // Check if the user exists in the pending_users table
      const pendingUser = await sequelize.query(
        `SELECT * FROM pending_users WHERE uid = ?`,
        {
          replacements: [uid],
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      );

      if (pendingUser.length === 0) {
        return res.status(404).json({ message: 'User not found in pending users' });
      }

      // Remove the user's results from the pending_results table
      await sequelize.query(`DELETE FROM pending_results WHERE id = ?`, {
        replacements: [uid],
        type: sequelize.QueryTypes.DELETE,
        transaction: t,
      });

      // Remove the user from the pending_users table
      await sequelize.query(`DELETE FROM pending_users WHERE uid = ?`, {
        replacements: [uid],
        type: sequelize.QueryTypes.DELETE,
        transaction: t,
      });
    });

    res.status(200).json({ message: 'User rejected and removed from pending tables' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting user', error: err.message });
  }
};

export const addCompany = async (req, res) => {
    try {
        const { name, role, resume, deadline } = req.body
        const new_deadline = new Date(deadline)
        await sequelize.transaction(async (t) => {

            await sequelize.query(
                `INSERT INTO company (name,role,resume,deadline)
                VALUES (?,?,?,?)`,
                {
                    replacements: [name, role, resume, new_deadline],
                    type: sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            )
            res.status(201).json({ success: true })
        });
    }
    catch (err) {
        res.status(501).json({ error: err.message });
    }
}
