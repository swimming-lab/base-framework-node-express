var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        comment: "고유번호 UUID",
      },
      email: {
        type: DataTypes.STRING(100),
        validate: {
          isEmail: true,
        },
        comment: "이메일",
      },
      password: {
        type: DataTypes.STRING,
        comment: "비밀번호",
      },
      name: {
        type: DataTypes.STRING(100),
        comment: "이름",
      },
      phone: {
        type: DataTypes.STRING(72),
        comment: "전화번호",
      },
    }, {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "users", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on      
      // Removed `classMethods` and `instanceMethods from ES6.
      // instanceMethods: {
      //   validPassword: function() {
      //     return this.password === password;
      //   },
      //   generateJWT: function() {
      //     var today = new Date();
      //     var exp = new Date(today);
      //     exp.setDate(today.getDate() + 60);
      //     return jwt.sign({
      //       id: this._id,
      //       username: this.name,
      //       exp: parseInt(exp.getTime() / 1000),
      //     }, secret);
      //   },
      //   toAuthJSON: function() {
      //     return {
      //       username: this.name,
      //       email: this.email,
      //       token: this.generateJWT(),
      //     };
      //   },
      // }
    });

    users.prototype.validPassword = function(password) {      
      return this.password === password;
    };

    users.prototype.generateJWT = function() {
      var today = new Date();
      var exp = new Date(today);
      exp.setDate(today.getDate() + 60);
      return jwt.sign({
        id: this._id,
        username: this.name,
        exp: parseInt(exp.getTime() / 1000),
      }, secret);
    };

    users.prototype.toAuthJSON = function() {
      return {
        username: this.name,
        email: this.email,
        token: this.generateJWT(),
      };
    };

    return users;
  };