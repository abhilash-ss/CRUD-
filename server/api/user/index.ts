import { Router } from 'express';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import Users from '../../model/Users';

const router = Router();

router.post('/addUser', async (req: any, res) => {
  try {
    const { userEmail, password, firstName, lastName, role } = req.body;
    if (!req.user || req.user.role !== 'admin') {
      return res.status(200).json({ success: false, message: 'You Are Not Allowed To Add User' });
    }
    if (role === 'admin') {
      return res.status(200).json({ success: false, message: 'You cant Add An Admin' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await Users.findOne({ where: { email: userEmail } });
    if (user) {
      return res.status(200).json({ success: false, message: 'User already exist' });
    }
    const CR_USER = await Users.create({ email: userEmail, password: hashedPassword, role, lastName, firstName });
    await CR_USER.save();
    return res.json({ success: true, message: 'User created' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'something went wrong' });
  }
});

router.post('/addAdmin', async (req: any, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const admin = await Users.findOne({ where: { email } });
    if (admin) {
      return res.status(500).json({ message: 'Admin already exist' });
    }
    const CR_ADMIN = await Users.create({ email, password: hashedPassword, role: 'admin', lastName, firstName });
    await CR_ADMIN.save();
    return res.json({ message: 'admin created' });
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' });
  }
});

router.get('/getUsers', async (req: any, res) => {
  try {
    const users = await Users.findAll();
    if (!req.user || req.user.role !== 'admin') {
      return res.status(200).json({ success: false, message: 'You Are Not Allowed To Fetch User list' });
    }
    return res.json({ success: true, users, message: 'Fetch users successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'something went wrong' });
  }
});

router.post('/deleteUser', async (req: any, res) => {
  try {
    const { id } = req.body;
    const deletedUser = await Users.destroy({ where: { id: { [Op.eq]: id } } });
    if (!req.user || req.user.role !== 'admin') {
      return res.status(200).json({ success: false, message: 'You Are Not Allowed To Delete User' });
    }
    if (!deletedUser) {
      return res.json({ success: false, message: 'something went wrong' });
    }
    return res.json({ success: true, message: `Delete user ${id} successfully` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'something went wrong' });
  }
});

export default router;
