const {test, beforeEach, afterEach} = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const {registerUser, checkLogin} = require("./userinfo");
const TEST_FILE = "test-users.json";

beforeEach(() => {
    if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE);
});

afterEach(() => {
    if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE);
});

test("creating users file", () => {
    registerUser("paul", "paul123",TEST_FILE);
    assert.strictEqual(fs.existsSync(TEST_FILE), true);
});

test("The user's info is stored in the file", () => {
    registerUser("paul", "paul123", TEST_FILE);
    const data = JSON.parse(fs.readFileSync(TEST_FILE, "utf8"));
    assert.strictEqual(data.paul, "paul123");
});

 test("no duplicates usernames allowed", () => {
    registerUser("paul", "paul123", TEST_FILE);
    assert.strictEqual(registerUser("paul", "other", TEST_FILE), false);
 });

 test("a stored username can log in", () => {
    registerUser("paul","paul123", TEST_FILE);
    assert.strictEqual(checkLogin("paul", "paul123", TEST_FILE), true);
 });

 test("wrong password will be denied", () => {
    registerUser("paul", "paul123", TEST_FILE);
    assert.strictEqual(checkLogin("paul", "nope", TEST_FILE), false);
 });