const {test} = require("ava");
const chalk = require("chalk");
const axios = require("axios");
const coinflip = require("coinflip");
const fs = require("fs");

const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("testing.json")
const db = low(adapter)

test("chalk.red exists", async test => {
  var thing = chalk.red;
  if (thing) {
    test.pass();
  } else {
    test.fail();
  }
});

test("chalk.green exists", async test => {
  var thing = chalk.green;
  if (thing) {
    test.pass();
  } else {
    test.fail();
  }
});

test("axios returns a string", async test => {
  test.plan(2);
  var joker = axios.create({
    "baseURL": "https://icanhazdadjoke.com/",
    "headers": {
      "Accept": "text/plain"
    }
  });
  var joke = await joker.request({
    "url": "/",
    "method": "GET"
  });
  var data = joke.data;
  test.truthy(data);
  test.is(typeof(data), "string");
});

test("coinflip returns a boolean", async test => {
  test.is(typeof(coinflip()), "boolean");
});

test.serial("lowdb defaults works", async test => {
  test.plan(2);
  db.defaults({
    testing: []
  }).write();
  test.true(fs.existsSync("testing.json"));
  var content = fs.readFileSync("testing.json", "utf8");
  test.truthy(content);
});

test.serial("lowdb push and find works", async test => {
  test.plan(2);
  var testing = db.get("testing");
  testing.push({
    id: "0123456789",
    name: "name1"
  }).write();
  testing.push({
    id: "9876543210",
    name: "name2"
  }).write();
  test.is(testing.find({
    id: "0123456789"
  }).value().name, "name1");
  test.is(testing.find({
    id: "9876543210"
  }).value().name, "name2");
  fs.unlinkSync("testing.json");
});