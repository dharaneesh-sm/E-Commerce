const fs = require("fs");

const DATA_FILE = "usersData.json";

//Instead of using .toString(), we can use utf8.
const getUsers = () => {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf8");
};

const getAllUsers = async(req,res) => {
    try {
        const users = getUsers();
        res.json(users);
    } 
    catch (error) {
        res.status(500).json({ message: "Error reading users data" });
    }
}

const getUserByID = async(req,res) => {
    const users = getUsers();
    const user = users.find((u) => u.id === parseInt(req.params.id));

  if (user) {
    res.json(user);
  } 
  else {
    res.status(404).json({ message: "User not found" });
  }
}

const addNewUser = async(req,res) => {
    const users = getUsers();
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email,
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: "User added", user: newUser });
}

const removeUser = async(req,res) => {
    let users = getUsers();
    const userId = parseInt(req.params.id);

    if (!users.some((user) => user.id === userId)) {
        return res.status(404).json({ message: "User not found" });
    }

    users = users.filter((user) => user.id !== userId);
    saveUsers(users);

    res.json({ message: "User deleted successfully" });
}

module.exports = { getAllUsers, getUserByID, addNewUser, removeUser }