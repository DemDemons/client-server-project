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
  fs.readFile(`./UserDir/${req.body.username}/${req.body.fileName}`, "utf-8", function (err, data) {
    if (err) { console.log(err) }
    console.log(data);
    res.send(JSON.stringify(data));
  })
})

router.post('/changeFileName', function (req, res, next) {
  fs.rename(`./UserDir/${req.body.username}/${req.body.fileName}`, `./UserDir/${req.body.username}/${req.body.newFileName}`, () => {
    console.log("\nFile Renamed!\n");
  })
  res.send("sent")
})

router.post('/copyFile', function (req, res, next) {
  console.log(req.body);
  //when we have multiple files do the change to the path of the copy
  // let path = ``;
  // if (req.body.destination.length === 0) {
  //   path = `./UserDir/${req.body.username}/${req.body.fileName}`;
  // }
  if (fs.existsSync(`./UserDir/${req.body.newDestination}`)) {
    fs.copyFile(`./UserDir/${req.body.username}/${req.body.fileName}`, `./UserDir/${req.body.newDestination}/${req.body.fileName}`, (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
    })
    res.send({ "answer": "true" })
  } else {
    res.send({ "answer": "false" })
  }
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
    fs.mkdirSync(`./UserDir/${req.body.username}`)
  })
})

router.post('/Dir', function (req, res, next) {
  let mainDir = {}
  let dirs = []
  let files = [];
  // if(req.body.mainUserDir){
  // }
    try {
      if (fs.existsSync(`./UserDir/${req.body.username}`)) {
        fs.readdir(`./UserDir/${req.body.username}`, (err, dir) => {
          if (err) {
            console.log(err);
          }
          dir.forEach(file => {
            console.log(`./UserDir/${req.body.username}/${file}`);
            const stats = fs.statSync(`./UserDir/${req.body.username}/${file}`)
            if (stats.isFile()) {
              files.push(file);
            } else if (stats.isDirectory()) {
              dirs.push(file);
            }
          })
          mainDir.files = files;
          mainDir.dirs = dirs;
  
          res.send(mainDir)
        })
      }
    } catch (err) {
      console.log(err);
    }
  
  // console.log(path.resolve(req.body.dirName))
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

router.post("/addFile", function (req, res, next) {
  console.log(req.body.destination.includes(req.body.username));
  let path = ``;
  if (req.body.destination === req.body.username) {
    path = `./UserDir/${req.body.username}/${req.body.fileName}`;
  } else{
    path = `./UserDir/${req.body.username}/${req.body.destination}/${req.body.fileName}`;
  }
  fs.appendFile(path, req.body.fileContent, function (err) {
    if (err) console.log(err);
    console.log('Saved!');
  });
})
router.get("/fileInfo", (req, res) => {
  let stats = fs.statSync(`./UserDir/${req.query.username}/${req.query.fileName}`);
  let fileSizeInBytes = stats.size;
  let type = req.query.fileName.split(".")[1];

  res.send(JSON.stringify({
    size: fileSizeInBytes,
    Mytpe: type
  }))
})

router.post("/deleteFile", (req, res) => {
  fs.unlink(`./UserDir/${req.body.username}/${req.body.fileName}`, (err) => {
    if (err) {
      return console.log(err);
    }
  });
  res.send({ "answer": `${req.body.fileName} has been deleted` })
})



module.exports = router;
