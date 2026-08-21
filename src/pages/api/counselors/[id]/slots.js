export default function handler(req, res) {
    const { id } = req.query;
    const slots = [
      { id: 1, time: "10:00 AM - 11:00 AM" },
      { id: 2, time: "12:00 PM - 1:00 PM" },
      { id: 3, time: "3:00 PM - 5:00 PM"},
    ];
    res.status(200).json(slots);
  }
  