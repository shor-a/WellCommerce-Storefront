function Footer() {
  return (
    <>
      <footer className="border-t bg-background px-5 py-16">
        <div className="container mx-auto flex flex-col gap-10 px-2">
          {/* Top: brand + link columns */}
          <div className="flex w-full gap-10">
            {/* Brand col */}
            <div className="flex basis-1/4 flex-col gap-4">
              <span className="text-xl font-bold">WELLCOMMERCE</span>
              <p className="text-sm text-muted-foreground">
                We have clothes that suit your style and which you're proud to
                wear.
              </p>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full border" />
                {/* Twitter */}
                <div className="h-8 w-8 rounded-full border" />
                {/* Facebook */}
                <div className="h-8 w-8 rounded-full border" />
                {/* Instagram */}
              </div>
            </div>

            {/* Link cols */}
            <div className="flex basis-3/4 justify-between">
              <div className="flex flex-col gap-3">
                <p className="font-bold tracking-widest">COMPANY</p>
                <a href="#" className="text-sm text-muted-foreground">
                  About
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Features
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Works
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Career
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-bold tracking-widest">HELP</p>
                <a href="#" className="text-sm text-muted-foreground">
                  Customer Support
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Delivery Details
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Terms & Conditions
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Privacy Policy
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-bold tracking-widest">FAQ</p>
                <a href="#" className="text-sm text-muted-foreground">
                  Account
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Manage Deliveries
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Orders
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Payments
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-bold tracking-widest">RESOURCES</p>
                <a href="#" className="text-sm text-muted-foreground">
                  Free eBooks
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Development Tutorial
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  Blog
                </a>
                <a href="#" className="text-sm text-muted-foreground">
                  YouTube Playlist
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex w-full items-center justify-between border-t pt-6">
            <p className="text-sm text-muted-foreground">
              WellCommerce © 2025. All rights reserved.
            </p>
            <div className="flex gap-3">
              <div className="h-8 w-12 rounded border" />
              {/* Visa */}
              <div className="h-8 w-12 rounded border" />
              {/* Mastercard */}
              <div className="h-8 w-12 rounded border" />
              {/* PayPal */}
              <div className="h-8 w-12 rounded border" />
              {/* GPay */}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
