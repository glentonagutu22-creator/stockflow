import ReceiptSettings from "../models/ReceiptSettings.js";

// Get receipt settings
export const getReceiptSettings = async (req, res) => {
  try {
    let settings = await ReceiptSettings.findOne({ user: req.user.id });

    // Create default settings if none exist
    if (!settings) {
      settings = await ReceiptSettings.create({});
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update receipt settings
export const updateReceiptSettings = async (req, res) => {
  try {
    let settings = await ReceiptSettings.findOne();

    if (!settings) {
      settings = await ReceiptSettings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    res.status(200).json({
      message: "Receipt settings updated successfully.",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};