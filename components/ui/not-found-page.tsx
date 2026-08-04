"use client"

import Link from "next/link"
import { Home, Dumbbell, Mail } from "lucide-react"
import { ShadcnButton } from "@/components/ui/shadcn-button"
import { Empty, EmptyContent, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/unused-components/ui/empty"
import Footer from "@/components/layout/Footer"

export function NotFoundPage() {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-screen">
        <div className="max-w-2xl mx-auto text-center w-full">
          {/* 404 Error */}
          <div className="mb-6 sm:mb-8">
            <div className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-oswald font-bold leading-none text-accent/20">
              404
            </div>
            <div className="relative -mt-6 sm:-mt-8">
              <Dumbbell className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 mx-auto text-accent mb-4 sm:mb-6" />
            </div>
          </div>

          <Empty className="border-0 p-0">
            <EmptyHeader>
              <EmptyTitle className="text-2xl sm:text-3xl md:text-4xl font-oswald font-bold uppercase mb-3 sm:mb-4 px-4">
                Workout Not Found
              </EmptyTitle>
              <EmptyDescription className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto mb-6 sm:mb-8 px-4">
                Looks like you've wandered off the gym floor! This page has been moved or doesn't exist. 
                Let's get you back to your fitness journey.
              </EmptyDescription>
            </EmptyHeader>
            
            <EmptyContent className="max-w-md mx-auto px-4 w-full">
              <div className="flex flex-col gap-3 w-full">
                <ShadcnButton asChild size="lg" className="w-full bg-accent text-black hover:bg-accent/90 font-semibold text-base sm:text-lg py-6">
                  <Link href="/">
                    <Home className="h-5 w-5 mr-2" />
                    Back to Home
                  </Link>
                </ShadcnButton>
                <ShadcnButton variant="outline" asChild size="lg" className="w-full border-accent text-accent hover:bg-accent/10 text-base sm:text-lg py-6">
                  <Link href="/contact">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Us
                  </Link>
                </ShadcnButton>
              </div>
            </EmptyContent>
          </Empty>
        </div>
      </main>

      {/* Use the existing Footer component */}
      <Footer />
    </>
  )
}