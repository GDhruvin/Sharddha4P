const Contact = require("../models/contact-model");
const Entry = require("../models/entry-model");

const contact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Client Found !" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const addContact = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    const maxIdContact = await Contact.findOne().sort("-id").exec();
    const newId = maxIdContact ? maxIdContact.id + 1 : 1;

    await Contact.create({ id: newId, name, mobile });

    res.status(200).json({ message: "Client create successfully" });
  } catch (error) {
    res.status(500).json({ message: "Client not created" });
  }
};

const updateUserByID = async (req, res) => {
  try {
    const userId = req.params.id;
    const UpdateData = req.body;
    const updateUser = await Contact.updateOne(
      { _id: userId },
      {
        $set: UpdateData,
      }
    );
    if (!updateUser) {
      return res.status(404).send({ message: "Client not found" });
    }
    return res.status(200).json({ message: "Client successfully update" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Contact.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ message: "Client not found" });
    }
    return res.status(200).json({ message: "Client successfully delete" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const addEntry = async (req, res) => {
  try {
    const { createdBy, month, date, sarin, inclu, aq, fourp, galexy, ls } =
      req.body;
    const maxIdContact = await Entry.findOne().sort("-id").exec();
    const newId = maxIdContact ? maxIdContact.id + 1 : 1;

    await Entry.create({
      id: newId,
      createdBy,
      month,
      date,
      sarin,
      inclu,
      aq,
      fourp,
      galexy,
      ls,
    });

    res.status(200).json({ message: "Entry create successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Entry not created" });
  }
};

const getEntryByID = async (req, res) => {
  try {
    const userId = req.params.id;
    const monthValue = req.params.month;
    const entries = await Entry.find({
      createdBy: userId,
      month: monthValue,
    }).sort({ _id: 1 });

    if (!entries || entries.length === 0) {
      return res.status(404).json({ message: "Entry not Found !" });
    }

    const groupedEntries = entries.reduce((acc, entry) => {
      const date = entry.date;

      if (!acc[date]) {
        acc[date] = {
          date,
          createdBy: entry.createdBy,
          month: entry.month,
          totalsarin: 0,
          totalinclue: 0,
          aq: 0,
          fourp: 0,
          galexy: 0,
          ls: 0,
          subentry: [],
        };
      }

      acc[date].totalsarin += entry.sarin || 0;
      acc[date].totalinclue += entry.inclu || 0;
      acc[date].aq += entry.aq || 0;
      acc[date].fourp += entry.fourp || 0;
      acc[date].galexy += entry.galexy || 0;
      acc[date].ls += entry.ls || 0;
      acc[date].subentry.push(entry);

      return acc;
    }, {});

    const result = Object.values(groupedEntries);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalValue = async (req, res) => {
  try {
    const userId = req.params.id;
    const monthValue = req.params.month;
    const entries = await Entry.find({
      createdBy: userId,
      month: monthValue,
    });

    if (!entries || entries.length === 0) {
      return res.status(404).json({ message: "Entry not Found !" });
    }

    const totals = entries.reduce(
      (acc, entry) => {
        acc.totalsarin += entry.sarin || 0;
        acc.totalinclue += entry.inclu || 0;
        acc.totalaq += entry.aq || 0;
        acc.totalfourp += entry.fourp || 0;
        acc.totalgalexy += entry.galexy || 0;
        acc.totalls += entry.ls || 0;

        return acc;
      },
      {
        totalsarin: 0,
        totalinclue: 0,
        totalaq: 0,
        totalfourp: 0,
        totalgalexy: 0,
        totalls: 0,
      }
    );

    return res.status(200).json(totals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteOldRecords = async () => {
  const currentMonth = new Date().getMonth() + 1; 
  const targetMonth = (currentMonth - 2 + 12) % 12 || 12;

  try {
    const result = await Entry.deleteMany({ month: targetMonth });
  } catch (error) {
    console.error("Error deleting records: after month completion", error);
  }
};

const updateEntryByID = async (req, res) => {
  try {
    const entryId = req.params.id;
    const UpdateData = req.body;
    const updateEntry = await Entry.updateOne(
      { id: entryId },
      {
        $set: UpdateData,
      }
    );
    if (!updateEntry) {
      return res.status(404).send({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry successfully update" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { deleteOldRecords };
module.exports = {
  contact,
  addContact,
  updateUserByID,
  deleteUserByID,
  addEntry,
  getEntryByID,
  getTotalValue,
  deleteOldRecords,
  updateEntryByID
};
