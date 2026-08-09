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
    imageUrl: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269532/devis-gym/people/DSC07624-3.JPG.webp",
    caption: "Morning workout session with the team!  #DevisGym #MorningWorkout",
    date: "2024-01-15",
    likes: 127,
    comments: 23,
    instagramUrl: "https://instagram.com/p/example1" // Optional
  },
  {
    id: "post-2", 
    imageUrl: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268875/devis-gym/people/DSC07385.JPG.webp",
    caption: "New equipment arrival! Check out our latest additions to the gym ",
    date: "2024-01-14",
    likes: 89,
    comments: 12,
    instagramUrl: "https://instagram.com/p/example2"
  },
  {
    id: "post-3",
    imageUrl: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269384/devis-gym/people/DSC07593-3.JPG.webp", 
    caption: "Personal training session in progress. Results speak for themselves! ",
    date: "2024-01-13",
    likes: 156,
    comments: 31,
    instagramUrl: "https://instagram.com/p/example3"
  },
  {
    id: "post-4",
    imageUrl: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269421/devis-gym/people/DSC07603-3.JPG.webp",
    caption: "Group fitness class energy is unmatched! Join us next session ",
    date: "2024-01-12", 
    likes: 203,
    comments: 18,
    instagramUrl: "https://instagram.com/p/example4"
  },
  {
    id: "post-5",
    imageUrl: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269667/devis-gym/people/DSC07641-3.JPG.webp",
    caption: "Clean, modern, and ready for your workout! #GymLife #Pokhara",
    date: "2024-01-11",
    likes: 178,
    comments: 24,
    instagramUrl: "https://instagram.com/p/example5"
  },
  {
    id: "post-6",
    imageUrl: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269454/devis-gym/people/DSC07614-3.JPG.webp",
    caption: "One-on-one training delivers the best results. Book your session today! ",
    date: "2024-01-10",
    likes: 134,
    comments: 19,
    instagramUrl: "https://instagram.com/p/example6"
  }
];