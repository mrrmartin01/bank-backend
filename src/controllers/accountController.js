const Account = require("../models/Account");
const generateAccountNumber = require("../utils/generateAccountNumber");

// Create new account
exports.createAccount = async (req, res) => {
  try {
    const { accountType } = req.body;

    const account = new Account({
      user: req.user.id,
      accountType,
      accountNumber: generateAccountNumber(),
    });

    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { accountType, balance } = req.body;
    const account = await Account.findById(req.params.id);

    if (!account) return res.status(404).json({ message: "Account not found" });

    // Check if current user is owner
    if (account.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this account" });
    }

    if (accountType) account.accountType = accountType;
    if (balance !== undefined) account.balance = balance;

    await account.save();
    res.json({ message: "Account updated successfully", account });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



// Get  accounts of logged-in user
exports.getMyAccounts = async (req, res) => {
  const accounts = await Account.find({ user: req.user.id });
  res.json(accounts);
};


// Get all accounts (admin only)
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().populate("user", "name email");
    res.status(200).json(accounts);
  } catch (err) {
    console.error("Error fetching accounts:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
