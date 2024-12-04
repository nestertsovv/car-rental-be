import * as authServices from "../services/authServices.js";
import controllerWrapper from "../decorators/controllerWrapper.js";

const userSignup = async (req, res) => {
  const newUser = await authServices.signup({ ...req.body });

  res.status(201).json({
    userData: {
      email: newUser.email,
    },
  });
};

const userSignin = async (req, res) => {
  const { accessToken, refreshToken, userData } = await authServices.signin(
    req.body
  );

  res.json({
    accessToken,
    refreshToken,
    userData,
  });
};

const userCurrent = async (req, res) => {
  const user = req.user;

  const {
    accessToken,
    refreshToken,
    password,
    verificationToken,
    ...userData
  } = user.toObject();

  res.json({
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    userData,
  });
};

const userLogout = async (req, res) => {
  const { _id } = req.user;

  await authServices.updateUser(
    { _id },
    { accessToken: null, refreshToken: null }
  );

  res.status(204).json();
};

const userRefreshToken = async (req, res) => {
  const { _id } = req.user;
  const { authorization } = req.headers;
  const [_, token] = authorization.split(" ");

  const accessToken = await authServices.refreshToken({ _id, token });

  res.status(200).json({ accessToken });
};

export default {
  userSignup: controllerWrapper(userSignup),
  userSignin: controllerWrapper(userSignin),
  userCurrent: controllerWrapper(userCurrent),
  userLogout: controllerWrapper(userLogout),
  userRefreshToken: controllerWrapper(userRefreshToken),
};
