import { useState, useRef } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { CircleUserRound, LogIn, UserPlus, LogOut } from "lucide-react"

import { PageRoutes } from "@/config/routes"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  authMenuItems,
  type NavbarUserIconProps,
} from "@/constants/navbarConst"

export const NavbarUserIcon = ({ className }: NavbarUserIconProps) => {
  const isAuthenticated = localStorage.getItem("authenticated")
  const authUser = localStorage.getItem("authUser") ?? ""

  const [userOpen, setUserOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openPanel = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setUserOpen(true)
  }

  const closePanelDelayed = () => {
    closeTimer.current = setTimeout(() => setUserOpen(false), 150)
  }

  const handleSignOut = () => {
    localStorage.removeItem("authenticated")
    localStorage.removeItem("authUser")
    setUserOpen(false)
    // page reload keeps auth state in sync without a global store
    window.location.reload()
  }

  return (
    <div className={cn("relative", className)}>
      <Popover open={userOpen} onOpenChange={setUserOpen}>
        <div
          onMouseEnter={openPanel}
          onMouseLeave={closePanelDelayed}
          className="relative"
        >
          <PopoverTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label={isAuthenticated ? "My account" : "Sign in"}
                className="relative cursor-pointer transition-colors duration-200"
              />
            }
          >
            <CircleUserRound strokeWidth={2} className="size-5" />

            {!isAuthenticated && (
              <Badge
                className="absolute -top-1.5 -right-1.5 size-4.5 rounded-full p-0 text-[10px] leading-none"
                aria-label="Sign in required"
              >
                !
              </Badge>
            )}

            {isAuthenticated && (
              <span
                className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-primary ring-2 ring-background"
                aria-hidden="true"
              />
            )}
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            align="end"
            sideOffset={10}
            className={cn(
              "w-52 overflow-hidden p-0",
              "rounded-[20px]",
              "border border-border/60",
              "bg-background/95 backdrop-blur-md",
              "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)]"
            )}
            onMouseEnter={openPanel}
            onMouseLeave={closePanelDelayed}
          >
            {isAuthenticated ? (
              <>
                <div className="flex flex-col gap-0.5 px-4 pt-4 pb-3">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Welcome back
                  </span>
                  <span className="font-heading text-sm leading-tight font-bold tracking-tight text-foreground">
                    {authUser}
                  </span>
                </div>

                <Separator />

                <div className="flex flex-col py-1">
                  {authMenuItems.map(({ id, label, icon: Icon, to }) => (
                    <Link
                      key={id}
                      to={to}
                      onClick={() => setUserOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2",
                        "text-sm font-medium text-foreground",
                        "transition-colors duration-150",
                        "hover:bg-secondary focus-visible:bg-secondary",
                        "cursor-pointer outline-none"
                      )}
                    >
                      <Icon
                        strokeWidth={1.75}
                        className="size-4 shrink-0 text-muted-foreground"
                      />
                      {label}
                    </Link>
                  ))}
                </div>

                <Separator />

                <div className="px-4 py-2">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className={cn(
                      "flex w-full items-center gap-3 px-1 py-1.5",
                      "text-sm font-medium text-destructive",
                      "transition-colors duration-150",
                      "cursor-pointer hover:text-destructive/80",
                      "outline-none focus-visible:underline"
                    )}
                  >
                    <LogOut strokeWidth={1.75} className="size-4 shrink-0" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-0.5 px-4 pt-5 pb-3 text-center">
                  <span className="font-heading text-base font-bold tracking-tight text-foreground">
                    WELLCOMMERCE
                  </span>
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    Sign in to access your account
                    <br />
                    and continue shopping.
                  </span>
                </div>

                <Separator />

                <div className="flex flex-col gap-2.5 px-4 py-3">
                  <Button
                    render={<Link to={PageRoutes.LOGIN} />}
                    nativeButton={false}
                    variant="default"
                    className={cn(
                      "h-10 w-full rounded-full",
                      "bg-primary text-primary-foreground",
                      "text-sm font-medium tracking-wide",
                      "transition-opacity duration-150 hover:opacity-80",
                      "cursor-pointer"
                    )}
                    onClick={() => setUserOpen(false)}
                  >
                    <LogIn
                      strokeWidth={2}
                      className="size-4"
                      data-icon="inline-start"
                    />
                    Sign In
                  </Button>

                  <Button
                    render={<Link to={PageRoutes.REGISTER} />}
                    nativeButton={false}
                    variant="outline"
                    className={cn(
                      "h-10 w-full rounded-full",
                      "border-border/80 bg-background text-foreground",
                      "text-sm font-medium",
                      "transition-colors duration-150 hover:bg-secondary",
                      "cursor-pointer"
                    )}
                    onClick={() => setUserOpen(false)}
                  >
                    <UserPlus
                      strokeWidth={2}
                      className="size-4"
                      data-icon="inline-start"
                    />
                    Create Account
                  </Button>
                </div>

                <div className="relative flex items-center px-4 pb-3">
                  <Separator className="flex-1" />
                  <span className="mx-3 shrink-0 text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
                    or
                  </span>
                  <Separator className="flex-1" />
                </div>

                <div className="flex justify-center px-4 pb-4">
                  <p className="text-center text-xs text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      to={PageRoutes.REGISTER}
                      onClick={() => setUserOpen(false)}
                      className={cn(
                        "font-semibold text-foreground",
                        "underline-offset-2 hover:underline",
                        "cursor-pointer transition-colors duration-150"
                      )}
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </>
            )}
          </PopoverContent>
        </div>
      </Popover>
    </div>
  )
}

export default NavbarUserIcon
