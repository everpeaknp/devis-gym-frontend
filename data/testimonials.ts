export type Testimonial = {
  id: string;
  name: string;
  role: string;
  memberSince: string;
  rating: number;
  quote: string;
  image?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aman Thakuri",
    role: "Member",
    memberSince: "2024",
    rating: 5,
    quote: "The community is what keeps me coming back. Everyone supports each other. It's more than a gym - it's a family.",
    // image: "/Testimonials/bohemian-man-with-his-arms-crossed.jpg", // Placeholder - replace with actual member photos
  },
  {
    id: "t2",
    name: "Rajesh Sharma",
    role: "Member",
    memberSince: "2023",
    rating: 5,
    quote: "Best gym in Pokhara. The equipment is top-notch and the trainers really know their stuff. I've seen real results in just 3 months.",
    // image: "/Testimonials/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign.jpg", // Placeholder - replace with actual member photos
  },
  {
    id: "t3",
    name: "Sarah Ranabhat",
    role: "Member",
    memberSince: "2024",
    rating: 5,
    quote: "I was intimidated to start, but the atmosphere here is so welcoming. Everyone's focused on their own journey, and it's inspiring.",
    // image: "/Testimonials/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray.jpg", // Placeholder - replace with actual member photos
  },
  {
    id: "t4",
    name: "Prakash Adhikari",
    role: "Member",
    memberSince: "2022",
    rating: 5,
    quote: "Clean facility, great vibe, and real people who are serious about training. This isn't a flashy Instagram gym - it's a place to actually work.",
    // image: "/Testimonials/pexels-man-1845259_1920.jpg", // Placeholder - replace with actual member photos
  },
];

export const testimonialsIntro = {
  eyebrow: "Testimonials",
  heading: "What Our Members Say",
  body: "Our members' success stories speak louder than any marketing. Here's what they have to say about their gym experience.",
};
