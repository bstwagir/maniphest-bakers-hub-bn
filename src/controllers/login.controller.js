
import db from '../Database/models';
import { comparePassword, generateToken } from '../utils/user.util';
import asyncWrapper from '../utils/handlingTryCatchBlocks.util';


const { User } = db;

const Login = asyncWrapper(async (req, res) => {

      const { email } = req.body;
      if (!email || !req.body.password) {
        return res
          .status(400)
          .json({ message: 'Please Fiil in blank fields', error: '' });
      }

      const doesExist = await User.findOne({ where: { email } });

      if (!doesExist) {
        return res.status(404).json({ message: "User doesn't exist", error: '' });
      }

      const isValid = await comparePassword(req.body.password, doesExist.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = await generateToken(doesExist);
      
      const userData = {
        id: doesExist.id,
        fullname: doesExist.fullname,
        email: doesExist.email,
        role: doesExist.role
      };
      return res
        .status(200)
        .header('authenticate', token)
        .json({ message: 'Logged in succesfully', token, userData });
    }); 



export default Login;