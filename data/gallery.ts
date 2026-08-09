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
  { id: "p1", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269232/devis-gym/people/DSC07536.JPG.webp", alt: "Gym community", available: true },
  { id: "t1", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269666/devis-gym/people/DSC07641-3.JPG.webp", alt: "Gym training session", available: true },
  
  // Row 2
  { id: "l1", category: "Lifestyle", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269532/devis-gym/people/DSC07624-3.JPG.webp", alt: "Outdoor fitness", available: true },
  { id: "g2", category: "Gym", src: "/devis/IMG_7359.JPG.jpeg", alt: "Professional gym facilities", available: true },
  { id: "p2", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269554/devis-gym/people/DSC07700-2.JPG.webp", alt: "Training together", available: true },
  
  // Row 3
  { id: "t2", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269586/devis-gym/people/DSC07732.JPG.webp", alt: "Strength training", available: true },
  { id: "l2", category: "Lifestyle", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269561/devis-gym/people/DSC07720-2.JPG.webp", alt: "Active lifestyle", available: true },
  { id: "g3", category: "Gym", src: "/devis/IMG_7360.JPG.jpeg", alt: "State-of-the-art equipment", available: true },
  
  // Continue mixing...
  { id: "p3", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269681/devis-gym/people/DSC07643-3.JPG.webp", alt: "Fitness community", available: true },
  { id: "t3", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269452/devis-gym/people/DSC07615-4.JPG.webp", alt: "Weightlifting workout", available: true },
  { id: "g4", category: "Gym", src: "/devis/IMG_7361.JPG.jpeg", alt: "Gym interior", available: true },
  
  { id: "l3", category: "Lifestyle", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269181/devis-gym/people/DSC07524.JPG.webp", alt: "Fitness journey", available: true },
  { id: "p4", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269362/devis-gym/people/DSC07586.JPG.webp", alt: "Team training", available: true },
  { id: "t4", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269433/devis-gym/people/DSC07608-3.JPG.webp", alt: "Barbell training", available: true },
  
  { id: "g5", category: "Gym", src: "/devis/IMG_7362.JPG.jpeg", alt: "Weight training area", available: true },
  { id: "l4", category: "Lifestyle", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269241/devis-gym/people/DSC07541.JPG.webp", alt: "Outdoor training", available: true },
  { id: "p5", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269120/devis-gym/people/DSC07450.JPG.webp", alt: "Zumba class", available: true },
  
  { id: "t5", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269518/devis-gym/people/DSC07618-3.JPG.webp", alt: "Power lifting", available: true },
  { id: "g6", category: "Gym", src: "/devis/IMG_7363.JPG.jpeg", alt: "Training facility", available: true },
  { id: "p6", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269176/devis-gym/people/DSC07483.JPG.webp", alt: "Dance fitness", available: true },
  
  { id: "l5", category: "Lifestyle", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269167/devis-gym/people/DSC07482.JPG.webp", alt: "Healthy lifestyle", available: true },
  { id: "t6", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269454/devis-gym/people/DSC07614-3.JPG.webp", alt: "Weight training", available: true },
  { id: "g7", category: "Gym", src: "/devis/IMG_7364.JPG.jpeg", alt: "Gym space", available: true },
  
  { id: "p7", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269256/devis-gym/people/DSC07554.JPG.webp", alt: "Group workout", available: true },
  { id: "t7", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269608/devis-gym/people/DSC07630-3.JPG.webp", alt: "Cardio training", available: true },
  { id: "l6", category: "Lifestyle", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269568/devis-gym/people/DSC07728-2.JPG.webp", alt: "Fitness culture", available: true },
  
  { id: "g8", category: "Gym", src: "/devis/IMG_7365.JPG.jpeg", alt: "Workout area", available: true },
  { id: "p8", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269203/devis-gym/people/DSC07534.JPG.webp", alt: "Fitness group", available: true },
  { id: "t8", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269580/devis-gym/people/DSC07628-3.JPG.webp", alt: "Cardio workout", available: true },
  
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
  { id: "p9", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269568/devis-gym/people/DSC07627-3.JPG.webp", alt: "Aerobics class", available: true },
  { id: "p10", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269270/devis-gym/people/DSC07567.JPG.webp", alt: "Training community", available: true },
  { id: "p11", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268875/devis-gym/people/DSC07385.JPG.webp", alt: "Gym members", available: true },
  { id: "p12", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269260/devis-gym/people/DSC07563.JPG.webp", alt: "Community spirit", available: true },
  { id: "p13", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268886/devis-gym/people/DSC07389.JPG.webp", alt: "Group training", available: true },
  { id: "p14", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268903/devis-gym/people/DSC07391.JPG.webp", alt: "Community workout", available: true },
  { id: "p15", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268914/devis-gym/people/DSC07392.JPG.webp", alt: "Team spirit", available: true },
  { id: "p16", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268930/devis-gym/people/DSC07400.JPG.webp", alt: "Fitness friends", available: true },
  { id: "p17", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268947/devis-gym/people/DSC07403.JPG.webp", alt: "Training buddies", available: true },
  { id: "p18", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268962/devis-gym/people/DSC07404.JPG.webp", alt: "Gym community", available: true },
  { id: "p19", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786268977/devis-gym/people/DSC07405.JPG.webp", alt: "Group fitness", available: true },
  { id: "p20", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269020/devis-gym/people/DSC07406.JPG.webp", alt: "Training partners", available: true },
  { id: "p21", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269036/devis-gym/people/DSC07410.JPG.webp", alt: "Workout team", available: true },
  { id: "p22", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269093/devis-gym/people/DSC07428.JPG.webp", alt: "Fitness community", available: true },
  { id: "p23", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269159/devis-gym/people/DSC07466.JPG.webp", alt: "Group energy", available: true },
  { id: "p24", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269189/devis-gym/people/DSC07528.JPG.webp", alt: "Community vibes", available: true },
  { id: "p25", category: "People", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269217/devis-gym/people/DSC07535.JPG.webp", alt: "Team workout", available: true },
  
  // Additional Training images
  { id: "t9", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269374/devis-gym/people/DSC07590-3.JPG.webp", alt: "CrossFit training", available: true },
  { id: "t10", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269393/devis-gym/people/DSC07599-3.JPG.webp", alt: "CrossFit workout", available: true },
  { id: "t11", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269554/devis-gym/people/DSC07626-3.JPG.webp", alt: "Functional training", available: true },
  { id: "t12", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269335/devis-gym/people/DSC07580.JPG.webp", alt: "Training session", available: true },
  { id: "t13", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269516/devis-gym/people/DSC07635-3.JPG.webp", alt: "Workout in action", available: true },
  { id: "t14", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269081/devis-gym/people/DSC07411.JPG.webp", alt: "Training intensity", available: true },
  { id: "t15", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269104/devis-gym/people/DSC07439.JPG.webp", alt: "Exercise session", available: true },
  { id: "t16", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269265/devis-gym/people/DSC07564.JPG.webp", alt: "Workout focus", available: true },
  { id: "t17", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269284/devis-gym/people/DSC07568.JPG.webp", alt: "Training dedication", available: true },
  { id: "t18", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269297/devis-gym/people/DSC07572.JPG.webp", alt: "Exercise routine", available: true },
  { id: "t19", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269310/devis-gym/people/DSC07573.JPG.webp", alt: "Workout performance", available: true },
  { id: "t20", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269325/devis-gym/people/DSC07574.JPG.webp", alt: "Training effort", available: true },
  { id: "t21", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269348/devis-gym/people/DSC07581.JPG.webp", alt: "Exercise intensity", available: true },
  { id: "t22", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269353/devis-gym/people/DSC07584.JPG.webp", alt: "Training power", available: true },
  { id: "t23", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269358/devis-gym/people/DSC07585.JPG.webp", alt: "Workout strength", available: true },
  { id: "t24", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269384/devis-gym/people/DSC07593-3.JPG.webp", alt: "Training focus", available: true },
  { id: "t25", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269388/devis-gym/people/DSC07595-3.JPG.webp", alt: "Exercise performance", available: true },
  { id: "t26", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269406/devis-gym/people/DSC07600-3.JPG.webp", alt: "Training session", available: true },
  { id: "t27", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269421/devis-gym/people/DSC07603-3.JPG.webp", alt: "Workout dedication", available: true },
  { id: "t28", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269429/devis-gym/people/DSC07611-3.JPG.webp", alt: "Training intensity", available: true },
  { id: "t29", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269435/devis-gym/people/DSC07612-3.JPG.webp", alt: "Exercise focus", available: true },
  { id: "t30", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269467/devis-gym/people/DSC07615-3.JPG.webp", alt: "Workout effort", available: true },
  { id: "t31", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269490/devis-gym/people/DSC07616-3.JPG.webp", alt: "Training strength", available: true },
  { id: "t32", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269506/devis-gym/people/DSC07617-3.JPG.webp", alt: "Exercise power", available: true },
  { id: "t33", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269543/devis-gym/people/DSC07625-3.JPG.webp", alt: "Training performance", available: true },
  { id: "t34", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269591/devis-gym/people/DSC07629-3.JPG.webp", alt: "Workout intensity", available: true },
  { id: "t35", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269621/devis-gym/people/DSC07632-3.JPG.webp", alt: "Training dedication", available: true },
  { id: "t36", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269637/devis-gym/people/DSC07636-3.JPG.webp", alt: "Exercise session", available: true },
  { id: "t37", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269695/devis-gym/people/DSC07646-3.JPG.webp", alt: "Training focus", available: true },
  { id: "t38", category: "Training", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269546/devis-gym/people/DSC07649-3.JPG.webp", alt: "Workout power", available: true },
  
  // Additional Lifestyle images
  { id: "l7", category: "Lifestyle", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269578/devis-gym/people/DSC07731.JPG.webp", alt: "Active life", available: true },
  { id: "l8", category: "Lifestyle", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269595/devis-gym/people/DSC07733.JPG.webp", alt: "Gym lifestyle", available: true },
  { id: "l9", category: "Lifestyle", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269602/devis-gym/people/DSC07734.JPG.webp", alt: "Training lifestyle", available: true },
  { id: "l10", category: "Lifestyle", src: "https://res.cloudinary.com/ufiebboc/image/upload/v1786269610/devis-gym/people/DSC07735-2.JPG.webp", alt: "Fitness dedication", available: true },
];

export const galleryCategories: GalleryCategory[] = [
  "Gym",
  "People",
  "Training",
  "Lifestyle",
];
