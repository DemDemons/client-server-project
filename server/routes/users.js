var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
const { request } = require('http');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ data: 'respond with a resource' });
});

router.post('/fileContent', function (req, res, next) {
  fs.readFile(`./UserDir/${req.body.username}Dir/${req.body.fileName}`, "utf-8", function (err, data) {
    if (err) { console.log(err) }
    console.log(data);
    res.send(JSON.stringify(data));
  })
})

router.post('/register', function (req, res, next) {
  fs.readFile("./public/users.json", function (err, data) {
    if (err) { console.log(err) }
    let users = JSON.parse(data);
    let newUser = {
      id: users.length + 1,
      name: req.body.username,
      password: req.body.password
    }
    users.push(newUser)
    fs.writeFile("./public/users.json", JSON.stringify(users), (err) => {
      if (err) return console.log(err)
      console.log("it worked!!!");
    })
    fs.mkdirSync(`./UserDir/${req.body.username}Dir`)
  })
})

router.post('/Dir', function (req, res, next) {
  let files = [];
  try {
    if (fs.existsSync(`./UserDir/${req.body.username}Dir`)) {
      console.log("if works");
      fs.readdir(`./UserDir/${req.body.username}Dir`, (err, dir) => {
        if (err) { console.log(err); }
        dir.forEach(file => {
          files.push(file);
        });
        res.send(files)
      })
    }
  } catch (err) {
    console.log(err);
  }
})

router.post("/login", function (req, res, next) {
  fs.readFile("./public/users.json", function (err, user) {
    if (err) { console.log(err) }
    const prasedUser = JSON.parse(user)
    for (let i = 0; i < prasedUser.length; i++) {
      if (prasedUser[i].name === req.body.username && prasedUser[i].password === req.body.password) {
        res.send({ "answer": "true" })
        return;
      }
    }
    res.send({ "answer": "false" })
  })
})

router.get("/fileInfo", (req, res) => {
  let stats = fs.statSync(`./UserDir/${req.query.username}Dir/${req.query.fileName}`);
  let fileSizeInBytes = stats.size;
  let type = req.query.fileName.split(".")[1];

  res.send(JSON.stringify({
    size: fileSizeInBytes,
    Mytpe: type
  }))
})

router.post("/deleteFile", (req, res) => {
  fs.unlink(`./UserDir/${req.body.username}Dir/${req.body.fileName}`, (err) => {
    if (err) {
      return console.log(err);
    }
  });
  res.send({ "answer": `${req.body.fileName} has been deleted` })
})



module.exports = router;
