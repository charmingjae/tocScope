const db = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const app = express();
const PORT = process.env.port || 1234;
const cors = require("cors");
const hashing = require("./config/hashing");
const salt = require("./config/salt");
const { request } = require("express");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 회원가입 api
app.post("/api/insert", (req, res) => {
  const userID = req.body.userID;
  const userPW = req.body.userPW;
  const hashed = hashing.enc(userID, userPW, salt);
  console.log("salt : ", salt);
  console.log(hashed);
  // 1. 입력 받은 아이디 값이 있는지 검사
  // 2. 카운트가 1이상이면 이미 가입한 회원이 있다는 알림 표시
  // 3. 카운트가 0이면 바료 회원 가입 성공
  // etc. 추후에 입력한 비밀번호 확인 인풋을 넣어서 검증 추가
  const getDupCnt = "SELECT COUNT(*) FROM mentee WHERE userID = ?";
  db.query(getDupCnt, [userID, hashed], (err, result) => {
    var queryRes = result[0]["COUNT(*)"];
    if (queryRes >= 1) {
      res.send({ result: 0 });
    } else {
      const sqlQuery = "INSERT INTO mentee(userID, userPW) VALUES(?,?)";
      console.log("user ID : " + userID);
      console.log("user PW : " + hashed);
      db.query(sqlQuery, [userID, hashed], (err, result) => {
        res.send("success!");
      });
    }
  });
});

app.get("/", (req, res) => {
  console.log("success!");
});

app.get("/api/get", (req, res) => {
  const sqlQuery = "SELECT * FROM mentee";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get/3in", (req, res) => {
  const sqlQuery =
    "SELECT idx, stu_name, fst1in, scd1in, stu2in, stu3in FROM toc3in";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/api/post/mod3in", (req, res) => {
  const sqlQuery =
    "SELECT fst1in, scd1in, stu2in, stu3in FROM toc3in WHERE stu_no =?";
  db.query(sqlQuery, [req.body.userID], (err, result) => {
    res.send(result);
  });
});

app.post("/api/login", (req, res) => {
  const userID = req.body.userID;
  const userPW = req.body.userPW;
  const hashed = hashing.enc(userID, userPW, salt);
  const sqlQuery =
    "SELECT COUNT(*) FROM mentee WHERE userID = ? and userPW = ?";
  var cnt = 0;
  db.query(sqlQuery, [req.body.userID, hashed], (err, result) => {
    cnt = result[0]["COUNT(*)"];
    if (cnt >= 1) {
      res.send({ result: 1 });
    } else {
      res.send({ result: 0 });
    }
  });
});

app.post("/api/prog/mod3in", (req, res) => {
  var stuNo = req.body.userID;
  var fst1in = req.body.tocData.fst1in;
  var scd1in = req.body.tocData.scd1in;
  var stu2in = req.body.tocData.stu2in;
  var stu3in = req.body.tocData.stu3in;
  if (fst1in == "") fst1in = "미이수";
  if (scd1in == "") scd1in = "미이수";
  if (stu2in == "") stu2in = "미이수";
  if (stu3in == "") stu3in = "미이수";

  const sqlQuery =
    "UPDATE toc3in SET fst1in=?, scd1in=?, stu2in=?, stu3in=? WHERE stu_no = ?";

  db.query(sqlQuery, [fst1in, scd1in, stu2in, stu3in, stuNo], (err, result) => {
    res.send("success!");
  });
});

app.post("/api/getPw", (req, res) => {
  const getuserID = req.body.userID;
  const getuserPW = req.body.userPW;
  const hashed = hashing.enc(getuserID, getuserPW, salt);
  const sqlQuery = "SELECT userPW FROM mentee WHERE userID = ?";
  db.query(sqlQuery, getuserID, (err, result) => {
    if (hashed === result[0].userPW) {
      res.send({ result: 1 });
    } else {
      res.send({ result: 0 });
    }
  });
});

app.post("/api/updatepw", (req, res) => {
  const getuserID = req.body.userID;
  const getchngPW = req.body.chngPW;
  const hashed = hashing.enc(getuserID, getchngPW, salt);
  const sqlQuery = "UPDATE mentee SET userPW = ? WHERE userID = ?";
  db.query(sqlQuery, [hashed, getuserID], (err, result) => {
    res.send("success!");
  });
});

app.post("/api/resetPW", (req, res) => {
  const requestID = req.body.requestID;
  const sqlQuery = "SELECT COUNT(*) FROM mentee WHERE userID = ?";
  db.query(sqlQuery, requestID, (err, result) => {
    const getResult = result[0]["COUNT(*)"];

    if (getResult >= 1) {
      // 요청된 아이디가 회원 목록에 있으면
      // 리셋 요청 데이터베이스에 해당 아이디 추가
      const sqlQuery = "INSERT INTO resetPW(requestID) VALUES(?)";
      db.query(sqlQuery, requestID, (err, result) => {
        const chkSucceed = result.affectedRows;
        if (chkSucceed >= 1) {
          res.send({ result: 1 });
        } else {
          res.send({ result: 0 });
        }
      });
    } else {
      // 요청된 아이디가 회원 목록에 없으면
      // "Not Found" 리턴하기
      res.send("Cannot found");
    }
  });
});

app.get("/api/get/resetPw", (req, res) => {
  const sqlQuery = "SELECT * FROM resetPW";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/api/prog/resetPW", (req, res) => {
  const requestID = req.body.requestID;

  const hashed = hashing.enc(requestID, "test", salt);
  const sqlQuery = "UPDATE mentee SET userPW = ? WHERE userID = ?";
  db.query(sqlQuery, [hashed, requestID], (err, result) => {
    if (result.affectedRows >= 1) {
      res.send({ result: 1 });
    } else {
      res.send({ result: 0 });
    }
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
