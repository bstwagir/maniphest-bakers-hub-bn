/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '../Database/models';
import validateSignup from '../validation/signup.validator';
import asyncWrapper from '../utils/handlingTryCatchBlocks.util.js';
import ROLES_LIST from '../utils/userRoles.util';
import { hashPassword } from '../utils/user.util.js';


const { User } = db;

// create and save new user
export const createUser = asyncWrapper(async (req, res) => {
  const { email } = req.body;
  const { error } = validateSignup(req.body);

  if (error) {
    return res.status(406).send(error.details[0].message);
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return res
      .status(401)
      .json({ message: 'Email already used, please use different email.' });
  }

  const hashedPassword = await hashPassword(req.body.password);
  const userRole = 'customer';

  const newRole = ROLES_LIST[userRole];

  const user = {
    fullName: `${req.body.firstname} ${req.body.lastname}`,
    email: req.body.email,
    password: hashedPassword,
    role: JSON.stringify(newRole),
  };

  User.create(user)
  return res.status(200).json({ message: 'Email verified successfully' });
});

