const User = require("../../models/User/User");
const Setting = require("../../models/Setting/Setting");

const usersSeed = require("./users/users.json");
const settingsSeed = require("./settings/settings.json");

const users = async () => {
  const user = await User.countDocuments();
  if (user === 0) {
    await User.insertMany(usersSeed);
    console.log("Added users.json to MongoDB");
  }
};

const settings = async () => {
  const settings = await Setting.countDocuments();
  if (settings === 0) {
    await Setting.insertMany(settingsSeed);
    console.log("Added settings.json to MongoDB");
  }
};

module.exports = () => {
  users();
  settings();
};
