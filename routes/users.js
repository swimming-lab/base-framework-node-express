var express = require('express');
var router = express.Router();
var auth = require('./auth');
var passport = require('passport');
const { users } = require("../models");


/* GET users listing. */
router.get('/', function(req, res, next) {
  users.findOne({})
    .then((result) => {
        console.log("조회 성공: ", result);
    })
    .catch((err) => {
        console.log("조회 Error: ", err);
    })

    // users.findAll({attributes: ['id']})
    // .then((result) => {
    //     console.log("조회 성공: ", result);
    // })
    // .catch((err) => {
    //     console.log("조회 Error: ", err);
    // })

  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  users.create({
    email: "test@test.com",
    password: "1q2w3e4r%T",
    name: "swimming",
    phone: "010-0000-0000"
  })
  .then((result) => {
      console.log("저장 성공: ", result);
  })
  .catch((err) => {
      console.log("저장 Error: ", err);
  });
  res.send('users created');
});

router.put('/',  function(req, res, next) {
  users.update({email: "test@test.com"}, {where: {}})
    .then((result) => {
        console.log("수정 성공: ", result);
    })
    .catch((err) => {
        console.log("수정 Error: ", err);
    });
  res.send('users updated');
});

router.delete('/', auth.required, function(req, res, next) {
  users.destroy({where: {email: "test@test.com"}})
    .then((result) => {
        console.log("삭제 성공: ", result);
    })
    .catch((err) => {
        console.log("삭제 Error: ", err);
    });
  res.send('users deleted');
});

router.post('/login', function(req, res, next) {
  if (!req.body.users.email) {
    return res.status(422).json({errors: {email: "can't be blank"}});
  }
  console.log("email 성공: ", req.body.users.email);
  if (!req.body.users.password) {
    return res.status(422).json({errors: {password: "can't be blank"}});
  }
  console.log("password 성공: ", req.body.users.password);

  passport.authenticate('local', {session: false}, function(err, user, info) {
    if (err) { return next(err); }
    console.log(user);
    if (user) {
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      console.log(info);
      return res.status(422).json(info);
    }
  })(req, res, next);
});

module.exports = router;
