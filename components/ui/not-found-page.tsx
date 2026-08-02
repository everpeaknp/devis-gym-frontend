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
              <div className="flex flex-col sm:flex-row gap-4 w-full mb-8">
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
              
              {/* Quick Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <Link href="/gym" className="p-4 rounded-lg bg-background-elevated hover:bg-accent/5 transition-colors group">
                  <Dumbbell className="h-6 w-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-medium text-foreground">Gym Info</div>
                  <div className="text-xs text-muted-foreground">Learn about our facilities</div>
                </Link>
                
                <Link href="/membership" className="p-4 rounded-lg bg-background-elevated hover:bg-accent/5 transition-colors group">
                  <Home className="h-6 w-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-medium text-foreground">Membership</div>
                  <div className="text-xs text-muted-foreground">Join Devi's Gym</div>
                </Link>
                
                <Link href="/contact" className="p-4 rounded-lg bg-background-elevated hover:bg-accent/5 transition-colors group">
                  <MapPin className="h-6 w-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-medium text-foreground">Location</div>
                  <div className="text-xs text-muted-foreground">Find us in Pokhara</div>
                </Link>
              </div>

              <div className="text-center mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Error 404 - Page not found
                </p>
                <p className="text-xs text-muted-foreground">
                  Still lost? <Link href="/contact" className="text-accent hover:underline">Get in touch with us</Link>
                </p>
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