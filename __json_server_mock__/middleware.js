module.exports = (req, res, next) => {
  console.log('>>>>> ', req);
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'sadhu' && req.body.password === '123') {
      return res.status(200).json({
        user: {
          token: 'before_login_token',
        },
      });
    } else {
      return res.status(400).json({ message: '用户名或者密码错误' });
    }
  }

  if (req.method === 'POST' && req.path === '/register') {
    return res.status(200).json({
      user: {
        id: Math.ceil(Math.random() * 10000000000),
        name: req.body.username,
        token: 'before_login_token',
      },
    });
  }

  next();
};
