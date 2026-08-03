'use client';

import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';
import Image from "next/image";

const Component = forwardRef<HTMLElement>((props, ref) => {
  return (
    <ReactLenis root>
      <main className='bg-black' ref={ref}>
        <div className='wrapper'>
          <section className='text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
            <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
              Gym Gallery
              <br />
              A look inside our facility <br />
              Scroll down!
            </h1>
          </section>
        </div>

        <section className='text-white w-full bg-slate-950'>
          <div className='grid grid-cols-12 gap-2'>
            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <Image
                  src='/images/gallery/1.jpg'
                  alt='Gym training area'
                  width={400}
                  height={384}
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  loading="lazy"
                />
              </figure>
              <figure className='w-full'>
                <Image
                  src='/images/gallery/2.jpg'
                  alt='Weight lifting section'
                  width={400}
                  height={384}
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  loading="lazy"
                />
              </figure>
              <figure className='w-full'>
                <Image
                  src='/images/gallery/3.jpg'
                  alt='Cardio equipment area'
                  width={400}
                  height={384}
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  loading="lazy"
                />
              </figure>
              <figure className='w-full'>
                <Image
                  src='/images/gallery/4.jpg'
                  alt='Free weights section'
                  width={400}
                  height={384}
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  loading="lazy"
                />
              </figure>
              <figure className='w-full'>
                <Image
                  src='/images/gallery/5.jpg'
                  alt='Training floor'
                  width={400}
                  height={384}
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  loading="lazy"
                />
              </figure>
            </div>

            <div className='sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3'>
              <figure className='w-full h-full'>
                <Image
                  src='/equipment/main.jpg'
                  alt='Main gym floor'
                  fill
                  className='transition-all duration-300 align-bottom object-cover rounded-md'
                  sizes="33vw"
                  loading="lazy"
                />
              </figure>
              <figure className='w-full h-full relative'>
                <Image
                  src='/equipment/1.webp'
                  alt='Gym equipment setup'
                  fill
                  className='transition-all duration-300 align-bottom object-cover rounded-md'
                  sizes="33vw"
                  loading="lazy"
                />
              </figure>
              <figure className='w-full h-full relative'>
                <Image
                  src='/equipment/2.webp'
                  alt='Training equipment'
                  fill
                  className='transition-all duration-300 align-bottom object-cover rounded-md'
                  sizes="33vw"
                  loading="lazy"
                />
              </figure>
            </div>

            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <Image
                  src='/images/gallery/6.jpg'
                  alt='Gym interior view'
                  width={400}
                  height={384}
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  loading="lazy"
                />
              </figure>
              <figure className='w-full'>
                <Image
                  src='/images/gallery/7.jpg'
                  alt='Workout space'
                  width={400}
                  height={384}
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  loading="lazy"
                />
              </figure>
              <figure className='w-full'>
                <Image
                  src='/images/gallery/8.jpg'
                  alt='Fitness area'
                  width={400}
                  height={384}
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  loading="lazy"
                />
              </figure>
              <figure className='w-full'>
                <Image
                  src='/equipment/6.webp'
                  alt='Equipment closeup'
                  width={400}
                  height={384}
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  loading="lazy"
                />
              </figure>
              <figure className='w-full'>
                <Image
                  src='/equipment/7.webp'
                  alt='Training station'
                  width={400}
                  height={384}
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        <footer className='group bg-slate-950'>
          <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
            DEVI'S GYM
          </h1>
          <div className='bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
        </footer>
      </main>
    </ReactLenis>
  );
});

Component.displayName = 'StickyScrollGallery';

export default Component;