const db = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const app = express();
const PORT = process.env.port || 1234;
const cors = require("cors");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 회원가입 api
app.post("/api/insert", (req, res) => {
  const userID = req.body.userID;
  const userPW = req.body.userPW;
  // 1. 입력 받은 아이디 값이 있는지 검사
  // 2. 카운트가 1이상이면 이미 가입한 회원이 있다는 알림 표시
  // 3. 카운트가 0이면 바료 회원 가입 성공
  // etc. 추후에 입력한 비밀번호 확인 인풋을 넣어서 검증 추가
  const getDupCnt = "SELECT COUNT(*) FROM mentee WHERE userID = ?";
  db.query(getDupCnt, [userID, userPW], (err, result) => {
    console.log(result[0]["COUNT(*)"]);
    var queryRes = result[0]["COUNT(*)"];
    if (queryRes >= 1) {
      res.send({ result: 0 });
    } else {
      const sqlQuery = "INSERT INTO mentee(userID, userPW) VALUES(?,?)";
      console.log("user ID : " + userID);
      console.log("user PW : " + userPW);
      db.query(sqlQuery, [userID, userPW], (err, result) => {
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
  console.log(req.body);
  const sqlQuery =
    "SELECT fst1in, scd1in, stu2in, stu3in FROM toc3in WHERE stu_no =?";
  db.query(sqlQuery, [req.body.userID], (err, result) => {
    res.send(result);
  });
});

app.post("/api/login", (req, res) => {
  const sqlQuery =
    "SELECT COUNT(*) FROM mentee WHERE userID = ? and userPW = ?";
  var cnt = 0;
  db.query(sqlQuery, [req.body.userID, req.body.userPW], (err, result) => {
    cnt = result[0]["COUNT(*)"];
    if (cnt >= 1) {
      res.send({ result: 1 });
    } else {
      res.send({ result: 0 });
    }
  });
});

app.post("/api/prog/mod3in", (req, res) => {
  console.log(req.body.tocData.fst1in);
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
  console.log(req.body.userID);
  const getuserID = req.body.userID;
  const sqlQuery = "SELECT userPW FROM mentee WHERE userID = ?";
  db.query(sqlQuery, getuserID, (err, result) => {
    res.send({ returnValue: result[0].userPW });
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
