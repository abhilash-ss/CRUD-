import express from 'express';
import passport from '../../service/passport';

const router = express.Router();

router.post('/login', (req: any, res, next) => {
  req.logout();
  passport.authenticate('local', (_, user, info) => {
    req.login(user, (err: any) => {
      if (user) {
        console.log(err);
        return res.status(200).json({ success: true, role: user.role });
      }
      return res.json({ success: false, ...info });
    });
  })(req, res, next);
});

router.post('/logout', (req: any, res, next) => {
  req.logout();
  res.json({ message: 'logged out' });
});

export default router;
