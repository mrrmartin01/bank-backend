const Account = require("../models/Account");
const Transaction = require("../models/Transaction");


exports.createTransaction = async (req, res) => {
  const { transactionType, description, amount, status, toAccount } = req.body;

  try {
    const fromAccount = await Account.findOne({ user: req.user.id });
    if (!fromAccount) return res.status(404).json({ message: "Account not found" });

    if (transactionType === "withdrawal" || transactionType === "transfer") {
      if (fromAccount.balance < amount)
        return res.status(400).json({ message: "Insufficient funds" });

      fromAccount.balance -= amount;
    }

    if (transactionType === "deposit") {
      fromAccount.balance += amount;
    }

    if (transactionType === "transfer") {
      const destinationAccount = await Account.findById(toAccount);
      if (!destinationAccount)
        return res.status(404).json({ message: "Destination account not found" });

      destinationAccount.balance += amount;
      await destinationAccount.save();
    }

    const transaction = new Transaction({
      transactionRef: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      userID: req.user.id,
      accountID: fromAccount._id,
      transactionType,
      amount,
      description,
      status,
      toAccount: toAccount || null,
    });

    await fromAccount.save();
    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Transaction failed" });
  }
};



exports.getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userID: req.user.id })
      .populate("accountID", "accountNumber")
      .populate("toAccount", "accountNumber")
      .sort({ createdAt: -1 });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};
