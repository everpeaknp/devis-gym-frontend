'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
	const scaleLogoOnly = useTransform(scrollYProgress, [0, 1], [1, 1.1]); // Minimal logo zoom

	// Moving animations for equipment images (moderate spreading effect)
	const spreadTopLeft = useTransform(scrollYProgress, [0, 1], [0, -300]);
	const spreadTopRight = useTransform(scrollYProgress, [0, 1], [0, 300]);
	const spreadBottomLeft = useTransform(scrollYProgress, [0, 1], [0, -280]);
	const spreadBottomRight = useTransform(scrollYProgress, [0, 1], [0, 280]);
	const spreadUp = useTransform(scrollYProgress, [0, 1], [0, -240]);
	const spreadDown = useTransform(scrollYProgress, [0, 1], [0, 240]);
	const spreadLeft = useTransform(scrollYProgress, [0, 1], [0, -350]);
	const spreadRight = useTransform(scrollYProgress, [0, 1], [0, 350]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[150vh] bg-background absolute top-0 left-0 right-0 sm:relative sm:top-auto sm:left-auto sm:right-auto">
			<div className="sticky top-0 h-screen overflow-hidden bg-background flex items-center justify-center">
				{images.map(({ src, alt }, index) => {
					// Check if this is the logo image and use appropriate scale
					const isLogo = src.includes('logo.png');
					const scale = isLogo ? scaleLogoOnly : scales[index % scales.length];
					
					// Different spreading patterns for each equipment image, but 4.png stays center
					let xMove: MotionValue<number> | number = 0;
					let yMove: MotionValue<number> | number = 0;
					
					if (index !== 4) { // Don't move 4.png (it stays in center)
						if (index === 1) { xMove = spreadTopLeft; yMove = spreadUp; }
						else if (index === 2) { xMove = spreadTopRight; yMove = spreadUp; }
						else if (index === 3) { xMove = spreadLeft; yMove = 0; }
						else if (index === 5) { xMove = spreadRight; yMove = 0; }
						else if (index === 6) { xMove = spreadBottomLeft; yMove = spreadDown; }
						else if (index === 7) { xMove = spreadBottomRight; yMove = spreadDown; }
					}

					return (
						<motion.div
							key={index}
							style={{ 
								scale,
								x: index > 0 ? xMove : 0,
								y: index > 0 ? yMove : 0,
								zIndex: index === 4 ? 10 : index > 0 ? index : 1
							}}
							className={`absolute flex items-center justify-center ${
								index === 0 ? 'inset-0 h-full w-full' :
								index === 1 || index === 4 ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[25vh] w-[25vw]' :
								'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[18vh] w-[18vw]'
							}`}
						>
							<div className={`relative ${index === 0 ? 'h-screen w-screen' : 'h-full w-full'}`}>
								<Image
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									fill
									className={`${index === 0 ? 'object-cover' : 'object-contain'}`}
									sizes={index === 0 ? '100vw' : '25vw'}
									loading='lazy'
									quality={index === 0 ? 85 : 75}
									onError={(e) => {
										console.log('Image failed to load:', src);
										e.currentTarget.src = '/placeholder.svg';
									}}
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
