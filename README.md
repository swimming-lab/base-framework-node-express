# node-js express base framework

### node,npm,express 설치
```
brew install node

node -v
npm -v

npm install express-generator -g
```

### express 프로젝트 생성
```
express --view=pug base-framework-node-express
```

### 시작하기
```
cd base-framework-node-express
npm install
DEBUG=base-framework-node-express:* npm start
```

### 의존성
```
npm install sequelize sequelize-cli mysql2 -g
npm install express-jwt passport passport-local jsonwebtoken
```

### DB생성
```
sequelize init
sequelize db:create
```

[참고]
- https://expressjs.com/ko/