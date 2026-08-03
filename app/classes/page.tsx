import BackButton from "@/components/ui/BackButton";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Image from "next/image";

const classes = [
  {
    id: 'outdoor',
    title: 'Outdoor Classes',
    description: 'Train in the fresh air with our outdoor fitness programs. Perfect for those who love nature and want to break free from traditional gym walls.',
    features: ['Morning Boot Camps', 'Trail Running Groups', 'Outdoor Yoga Sessions', 'Park Workouts'],
    image: '/gallery/gym-1.jpeg'
  },
  {
    id: 'personal',
    title: 'Personal Training',
    description: 'One-on-one sessions with certified trainers tailored to your specific fitness goals and needs.',
    features: ['Customized Workout Plans', 'Nutrition Guidance', 'Progress Tracking', 'Flexible Scheduling'],
    image: '/gallery/training-1.jpeg'
  },
  {
    id: 'group',
    title: 'Group Training',
    description: 'Join our energetic group classes and train with others who share your fitness passion.',
    features: ['HIIT Classes', 'Strength Training', 'Cardio Sessions', 'Functional Fitness'],
    image: '/gallery/gym-2.jpeg'
  },
  {
    id: 'digital',
    title: 'Digital Coaching',
    description: 'Get professional guidance from anywhere with our online coaching programs and virtual sessions.',
    features: ['Virtual Personal Training', 'Online Nutrition Plans', 'Progress Monitoring App', '24/7 Support'],
    image: '/gallery/training-2.jpeg'
  }
];

export default function ClassesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container-edge py-24">
        <BackButton />
        
        <div className="mt-8">
          <SectionHeading 
            eyebrow="Training Programs"
            title="Choose Your Path"
            className="text-center"
          />
          
          <Reveal delay={0.2}>
            <p className="text-center text-muted max-w-2xl mx-auto mt-6 leading-relaxed">
              Whether you prefer outdoor adventures, personalized attention, group energy, 
              or digital convenience, we have the perfect training program for your lifestyle.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 mt-16 md:grid-cols-2 lg:gap-12">
          {classes.map((classType, index) => (
            <Reveal key={classType.id} delay={index * 0.1}>
              <article className="group bg-background-elevated border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-colors duration-300">
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={classType.image}
                    alt={classType.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={85}
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-4">
                    {classType.title}
                  </h3>
                  
                  <p className="text-muted leading-relaxed mb-6">
                    {classType.description}
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    {classType.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full border-accent text-accent hover:bg-accent hover:text-background"
                  >
                    <a href="#contact">
                      Learn More
                    </a>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}