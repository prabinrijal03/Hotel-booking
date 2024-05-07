const Hotel = require("../model/Hotel.js");

exports.updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating hotel" });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Hotel has been deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting hotel" });
  }
};

exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching hotel" });
  }
};

exports.getAllHotel = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching hotels" });
  }
};

exports.search = async (req, res) => {
  try {
    const searchTerm = req.body.address.toLowerCase();
    const searchQuery = { address: { $regex: searchTerm, $options: "i" } };
    const searchQuery1 = { name: { $regex: searchTerm, $options: "i" } };

    const data = await Hotel.find({
      $or: [searchQuery, searchQuery1],
    });

    // searchQuery1, searchQuery;

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching hotels" }); // Handle errors
  }
};
