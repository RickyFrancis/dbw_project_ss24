import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res) => {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ name: user.name, email: user.email, token });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  const isPasswordValid = await comparePasswords(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    res.status(401);
    res.json({
      message: 'Invalid username or password',
    });
    return;
  }

  const token = createJWT(user);
  res.json({ name: user.name, email: user.email, token });
};
