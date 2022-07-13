const express = require('express')

const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, wins } = req.body;
    const user = await User.signup({ email, username, password, wins});

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);



router.get(
  '/',
  asyncHandler(async (req, res) => {
    const getAllUsers = await User.findAll();



    return res.json(
      getAllUsers,
    );
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const targetUser = await User.findByPk(id);



    return res.json({ targetUser});
  })
);

router.put(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const { wins,id } = req.body;
    const user = await User.update({ wins }, {where: {id}});
    return res.json({
      user,
    });
  }),
);



module.exports = router;
