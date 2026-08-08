export type GalleryCategory = "Gym" | "People" | "Training" | "Lifestyle";

export type GalleryImage = {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  available: boolean;
};

/**
 * Gallery images from Devi's Gym
 * Images categorized by: Gym, People, Training, Lifestyle
 * Gym: All images from /devis folder
 * People, Training, Lifestyle: All images from /people folder
 * Images are mixed across categories for better "All" view
 */
export const galleryImages: GalleryImage[] = [
  // Row 1 - Mix of all categories
  { id: "g1", category: "Gym", src: "/devis/IMG_7358.JPG.jpeg", alt: "Modern gym equipment", available: true },
  { id: "p1", category: "People", src: "/people/DSC07536.JPG", alt: "Gym community", available: true },
  { id: "t1", category: "Training", src: "/people/DSC07641-3.JPG", alt: "Gym training session", available: true },
  
  // Row 2
  { id: "l1", category: "Lifestyle", src: "/people/DSC07624-3.JPG", alt: "Outdoor fitness", available: true },
  { id: "g2", category: "Gym", src: "/devis/IMG_7359.JPG.jpeg", alt: "Professional gym facilities", available: true },
  { id: "p2", category: "People", src: "/people/DSC07700-2.JPG", alt: "Training together", available: true },
  
  // Row 3
  { id: "t2", category: "Training", src: "/people/DSC07732.JPG", alt: "Strength training", available: true },
  { id: "l2", category: "Lifestyle", src: "/people/DSC07720-2.JPG", alt: "Active lifestyle", available: true },
  { id: "g3", category: "Gym", src: "/devis/IMG_7360.JPG.jpeg", alt: "State-of-the-art equipment", available: true },
  
  // Continue mixing...
  { id: "p3", category: "People", src: "/people/DSC07643-3.JPG", alt: "Fitness community", available: true },
  { id: "t3", category: "Training", src: "/people/DSC07615-4.JPG", alt: "Weightlifting workout", available: true },
  { id: "g4", category: "Gym", src: "/devis/IMG_7361.JPG.jpeg", alt: "Gym interior", available: true },
  
  { id: "l3", category: "Lifestyle", src: "/people/DSC07524.JPG", alt: "Fitness journey", available: true },
  { id: "p4", category: "People", src: "/people/DSC07586.JPG", alt: "Team training", available: true },
  { id: "t4", category: "Training", src: "/people/DSC07608-3.JPG", alt: "Barbell training", available: true },
  
  { id: "g5", category: "Gym", src: "/devis/IMG_7362.JPG.jpeg", alt: "Weight training area", available: true },
  { id: "l4", category: "Lifestyle", src: "/people/DSC07541.JPG", alt: "Outdoor training", available: true },
  { id: "p5", category: "People", src: "/people/DSC07450.JPG", alt: "Zumba class", available: true },
  
  { id: "t5", category: "Training", src: "/people/DSC07618-3.JPG", alt: "Power lifting", available: true },
  { id: "g6", category: "Gym", src: "/devis/IMG_7363.JPG.jpeg", alt: "Training facility", available: true },
  { id: "p6", category: "People", src: "/people/DSC07483.JPG", alt: "Dance fitness", available: true },
  
  { id: "l5", category: "Lifestyle", src: "/people/DSC07482.JPG", alt: "Healthy lifestyle", available: true },
  { id: "t6", category: "Training", src: "/people/DSC07614-3.JPG", alt: "Weight training", available: true },
  { id: "g7", category: "Gym", src: "/devis/IMG_7364.JPG.jpeg", alt: "Gym space", available: true },
  
  { id: "p7", category: "People", src: "/people/DSC07554.JPG", alt: "Group workout", available: true },
  { id: "t7", category: "Training", src: "/people/DSC07630-3.JPG", alt: "Cardio training", available: true },
  { id: "l6", category: "Lifestyle", src: "/people/DSC07728-2.JPG", alt: "Fitness culture", available: true },
  
  { id: "g8", category: "Gym", src: "/devis/IMG_7365.JPG.jpeg", alt: "Workout area", available: true },
  { id: "p8", category: "People", src: "/people/DSC07534.JPG", alt: "Fitness group", available: true },
  { id: "t8", category: "Training", src: "/people/DSC07628-3.JPG", alt: "Cardio workout", available: true },
  
  // Additional Gym images
  { id: "g9", category: "Gym", src: "/devis/IMG_7366.JPG.jpeg", alt: "Gym equipment setup", available: true },
  { id: "g10", category: "Gym", src: "/devis/IMG_7367.JPG.jpeg", alt: "Training zone", available: true },
  { id: "g11", category: "Gym", src: "/devis/IMG_7368.JPG.jpeg", alt: "Gym facility", available: true },
  { id: "g12", category: "Gym", src: "/devis/IMG_7369.JPG.jpeg", alt: "Exercise area", available: true },
  { id: "g13", category: "Gym", src: "/devis/IMG_7370.JPG.jpeg", alt: "Workout space", available: true },
  { id: "g14", category: "Gym", src: "/devis/IMG_7371.JPG.jpeg", alt: "Gym interior view", available: true },
  { id: "g15", category: "Gym", src: "/devis/IMG_7372.JPG.jpeg", alt: "Training facility view", available: true },
  { id: "g16", category: "Gym", src: "/devis/IMG_7373.JPG.jpeg", alt: "Gym equipment area", available: true },
  { id: "g17", category: "Gym", src: "/devis/IMG_7374.JPG.jpeg", alt: "Workout facility", available: true },
  { id: "g18", category: "Gym", src: "/devis/IMG_7375.JPG.jpeg", alt: "Gym setup", available: true },
  { id: "g19", category: "Gym", src: "/devis/IMG_7376.JPG.jpeg", alt: "Training area", available: true },
  { id: "g20", category: "Gym", src: "/devis/IMG_7377.JPG.jpeg", alt: "Gym floor", available: true },
  
  // Additional People images
  { id: "p9", category: "People", src: "/people/DSC07627-3.JPG", alt: "Aerobics class", available: true },
  { id: "p10", category: "People", src: "/people/DSC07567.JPG", alt: "Training community", available: true },
  { id: "p11", category: "People", src: "/people/DSC07385.JPG", alt: "Gym members", available: true },
  { id: "p12", category: "People", src: "/people/DSC07563.JPG", alt: "Community spirit", available: true },
  { id: "p13", category: "People", src: "/people/DSC07389.JPG", alt: "Group training", available: true },
  { id: "p14", category: "People", src: "/people/DSC07391.JPG", alt: "Community workout", available: true },
  { id: "p15", category: "People", src: "/people/DSC07392.JPG", alt: "Team spirit", available: true },
  { id: "p16", category: "People", src: "/people/DSC07400.JPG", alt: "Fitness friends", available: true },
  { id: "p17", category: "People", src: "/people/DSC07403.JPG", alt: "Training buddies", available: true },
  { id: "p18", category: "People", src: "/people/DSC07404.JPG", alt: "Gym community", available: true },
  { id: "p19", category: "People", src: "/people/DSC07405.JPG", alt: "Group fitness", available: true },
  { id: "p20", category: "People", src: "/people/DSC07406.JPG", alt: "Training partners", available: true },
  { id: "p21", category: "People", src: "/people/DSC07410.JPG", alt: "Workout team", available: true },
  { id: "p22", category: "People", src: "/people/DSC07428.JPG", alt: "Fitness community", available: true },
  { id: "p23", category: "People", src: "/people/DSC07466.JPG", alt: "Group energy", available: true },
  { id: "p24", category: "People", src: "/people/DSC07528.JPG", alt: "Community vibes", available: true },
  { id: "p25", category: "People", src: "/people/DSC07535.JPG", alt: "Team workout", available: true },
  
  // Additional Training images
  { id: "t9", category: "Training", src: "/people/DSC07590-3.JPG", alt: "CrossFit training", available: true },
  { id: "t10", category: "Training", src: "/people/DSC07599-3.JPG", alt: "CrossFit workout", available: true },
  { id: "t11", category: "Training", src: "/people/DSC07626-3.JPG", alt: "Functional training", available: true },
  { id: "t12", category: "Training", src: "/people/DSC07580.JPG", alt: "Training session", available: true },
  { id: "t13", category: "Training", src: "/people/DSC07635-3.JPG", alt: "Workout in action", available: true },
  { id: "t14", category: "Training", src: "/people/DSC07411.JPG", alt: "Training intensity", available: true },
  { id: "t15", category: "Training", src: "/people/DSC07439.JPG", alt: "Exercise session", available: true },
  { id: "t16", category: "Training", src: "/people/DSC07564.JPG", alt: "Workout focus", available: true },
  { id: "t17", category: "Training", src: "/people/DSC07568.JPG", alt: "Training dedication", available: true },
  { id: "t18", category: "Training", src: "/people/DSC07572.JPG", alt: "Exercise routine", available: true },
  { id: "t19", category: "Training", src: "/people/DSC07573.JPG", alt: "Workout performance", available: true },
  { id: "t20", category: "Training", src: "/people/DSC07574.JPG", alt: "Training effort", available: true },
  { id: "t21", category: "Training", src: "/people/DSC07581.JPG", alt: "Exercise intensity", available: true },
  { id: "t22", category: "Training", src: "/people/DSC07584.JPG", alt: "Training power", available: true },
  { id: "t23", category: "Training", src: "/people/DSC07585.JPG", alt: "Workout strength", available: true },
  { id: "t24", category: "Training", src: "/people/DSC07593-3.JPG", alt: "Training focus", available: true },
  { id: "t25", category: "Training", src: "/people/DSC07595-3.JPG", alt: "Exercise performance", available: true },
  { id: "t26", category: "Training", src: "/people/DSC07600-3.JPG", alt: "Training session", available: true },
  { id: "t27", category: "Training", src: "/people/DSC07603-3.JPG", alt: "Workout dedication", available: true },
  { id: "t28", category: "Training", src: "/people/DSC07611-3.JPG", alt: "Training intensity", available: true },
  { id: "t29", category: "Training", src: "/people/DSC07612-3.JPG", alt: "Exercise focus", available: true },
  { id: "t30", category: "Training", src: "/people/DSC07615-3.JPG", alt: "Workout effort", available: true },
  { id: "t31", category: "Training", src: "/people/DSC07616-3.JPG", alt: "Training strength", available: true },
  { id: "t32", category: "Training", src: "/people/DSC07617-3.JPG", alt: "Exercise power", available: true },
  { id: "t33", category: "Training", src: "/people/DSC07625-3.JPG", alt: "Training performance", available: true },
  { id: "t34", category: "Training", src: "/people/DSC07629-3.JPG", alt: "Workout intensity", available: true },
  { id: "t35", category: "Training", src: "/people/DSC07632-3.JPG", alt: "Training dedication", available: true },
  { id: "t36", category: "Training", src: "/people/DSC07636-3.JPG", alt: "Exercise session", available: true },
  { id: "t37", category: "Training", src: "/people/DSC07646-3.JPG", alt: "Training focus", available: true },
  { id: "t38", category: "Training", src: "/people/DSC07649-3.JPG", alt: "Workout power", available: true },
  
  // Additional Lifestyle images
  { id: "l7", category: "Lifestyle", src: "/people/DSC07731.JPG", alt: "Active life", available: true },
  { id: "l8", category: "Lifestyle", src: "/people/DSC07733.JPG", alt: "Gym lifestyle", available: true },
  { id: "l9", category: "Lifestyle", src: "/people/DSC07734.JPG", alt: "Training lifestyle", available: true },
  { id: "l10", category: "Lifestyle", src: "/people/DSC07735-2.JPG", alt: "Fitness dedication", available: true },
];

export const galleryCategories: GalleryCategory[] = [
  "Gym",
  "People",
  "Training",
  "Lifestyle",
];
