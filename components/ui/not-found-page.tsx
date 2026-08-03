"use client"

import Link from "next/link"
import { Home, Dumbbell, Mail, MapPin } from "lucide-react"
import { ShadcnButton } from "@/components/ui/shadcn-button"
import { Empty, EmptyContent, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import Footer from "@/components/layout/Footer"

export function NotFoundPage() {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Error */}
          <div className="mb-8">
            <div className="text-[12rem] font-oswald font-bold leading-none text-accent/20">
              404
            </div>
            <div className="relative -mt-8">
              <Dumbbell className="h-16 w-16 mx-auto text-accent mb-6" />
            </div>
          </div>

          <Empty className="border-0 p-0">
            <EmptyHeader>
              <EmptyTitle className="text-3xl md:text-4xl font-oswald font-bold uppercase mb-4">
                Workout Not Found
              </EmptyTitle>
              <EmptyDescription className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
                Looks like you've wandered off the gym floor! This page has been moved or doesn't exist. 
                Let's get you back to your fitness journey.
              </EmptyDescription>
            </EmptyHeader>
            
            <EmptyContent className="max-w-md">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <ShadcnButton asChild size="lg" className="flex-1 bg-accent text-black hover:bg-accent/90 font-semibold">
                  <Link href="/">
                    <Home className="h-5 w-5 mr-2" />
                    Back to Home
                  </Link>
                </ShadcnButton>
                <ShadcnButton variant="outline" asChild size="lg" className="flex-1 border-accent text-accent hover:bg-accent/10">
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