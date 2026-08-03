// Manual Instagram-style posts data
// Update this file manually when you want to change the gallery

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  likes: number;
  comments: number;
  instagramUrl?: string; // Optional link to real Instagram post
}

export const instagramPosts: InstagramPost[] = [
  {
    id: "post-1",
    imageUrl: "/gallery/gym-1.jpg",
    caption: "Morning workout session with the team! 💪 #DevisGym #MorningWorkout",
    date: "2024-01-15",
    likes: 127,
    comments: 23,
    instagramUrl: "https://instagram.com/p/example1" // Optional
  },
  {
    id: "post-2", 
    imageUrl: "/gallery/gym-2.jpg",
    caption: "New equipment arrival! Check out our latest additions to the gym 🏋️‍♂️",
    date: "2024-01-14",
    likes: 89,
    comments: 12,
    instagramUrl: "https://instagram.com/p/example2"
  },
  {
    id: "post-3",
    imageUrl: "/gallery/gym-3.jpg", 
    caption: "Personal training session in progress. Results speak for themselves! 🔥",
    date: "2024-01-13",
    likes: 156,
    comments: 31,
    instagramUrl: "https://instagram.com/p/example3"
  },
  {
    id: "post-4",
    imageUrl: "/gallery/gym-4.jpg",
    caption: "Group fitness class energy is unmatched! Join us next session 🎯",
    date: "2024-01-12", 
    likes: 203,
    comments: 18,
    instagramUrl: "https://instagram.com/p/example4"
  },
  {
    id: "post-5",
    imageUrl: "/gallery/gym-5.jpg",
    caption: "Clean, modern, and ready for your workout! #GymLife #Pokhara",
    date: "2024-01-11",
    likes: 178,
    comments: 24,
    instagramUrl: "https://instagram.com/p/example5"
  },
  {
    id: "post-6",
    imageUrl: "/gallery/gym-6.jpg",
    caption: "One-on-one training delivers the best results. Book your session today! 📞",
    date: "2024-01-10",
    likes: 134,
    comments: 19,
    instagramUrl: "https://instagram.com/p/example6"
  }
];