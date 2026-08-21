export default function handler(req, res) {
    res.status(200).json([
      {
        id: 1,
        name: "Dr. John Doe",
        skills: ["Career Counseling", "Stress Management"],
        qualifications: "PhD in Psychology",
        rating: 4,
      },
      {
        id: 2,
        name: "Jane Smith",
        skills: ["Personal Development", "Interview Preparation"],
        qualifications: "MSc in Counseling",
        rating: 3.5,
      },
      {
        id: 3,
        name: "Chris Evans",
        skills: ["Personality Development", "Community Building"],
        qualifications: "MSc in Counseling",
        rating: 2,
      },
      {
        id: 4,
        name: "Raj Chandreshekharan",
        skills: ["Personality Development", "Community Building"],
        qualifications: "MSc in Counseling",
        rating: 4.5,
      },
      {
        id: 5,
        name: "Sandeep Maheshwari",
        skills: ["Personality Development", "Community Building"],
        qualifications: "MSc in Counseling",
        rating: 2,
      },
    ]);
  }
  