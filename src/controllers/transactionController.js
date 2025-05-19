const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
    
  const { type, amount, toAccountId } = req.body;

  try {
    const fromAccount = await Account.findOne({ user: req.user.id });

    if (!fromAccount)
      return res.status(404).json({ message: "Account not found" });

    if (type === "withdrawal" || type === "transfer") {
      if (fromAccount.balance < amount)
        return res.status(400).json({ message: "Insufficient funds" });
      fromAccount.balance -= amount;
    }

    if (type === "deposit") fromAccount.balance += amount;

    const transaction = new Transaction({
      account: fromAccount._id,
      type,
      amount,
      toAccount: toAccountId || null,
    });

    await fromAccount.save();
    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Transaction failed" });
  }
};
