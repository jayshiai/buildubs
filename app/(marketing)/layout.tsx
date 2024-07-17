import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { MainNav } from "@/components/main-nav"
import PreviewCarousel from "@/components/preview-dubs"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full  backdrop-blur">
        <div className="flex container max-w-[1600px] h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <a
                  href="https://www.3dubs.in/"
                  className={cn(
                    buttonVariants({ variant: "default", size: "sm" }),
                    "ave px-4 hover:border hover:border-primary hover:bg-background hover:text-primary"
                  )}
                >
                  3DUBS
                </a>
              </HoverCardTrigger>
              <HoverCardContent className="mt-4  border-white/50 p-1">
                <PreviewCarousel />
              </HoverCardContent>
            </HoverCard>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
