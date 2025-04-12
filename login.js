const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const user = await User.create({
      name,
      email,
      password
    });

    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({
      success: true,
      token
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(200).json({
      success: true,
      token
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
