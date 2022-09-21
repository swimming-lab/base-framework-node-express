var express = require('express');
var router = express.Router();
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
    email: "ryan@gmail.com",
    password: "123456",
    name: "Ryan",
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

router.put('/', function(req, res, next) {
  users.update({name: "Ryans"}, {where: {}})
    .then((result) => {
        console.log("수정 성공: ", result);
    })
    .catch((err) => {
        console.log("수정 Error: ", err);
    });
  res.send('users updated');
});

router.delete('/', function(req, res, next) {
  users.destroy({where: {name: "Ryans"}})
    .then((result) => {
        console.log("삭제 성공: ", result);
    })
    .catch((err) => {
        console.log("삭제 Error: ", err);
    });
  res.send('users deleted');
});

module.exports = router;
