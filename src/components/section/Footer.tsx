import { CircleUserRound } from "lucide-react"

import { Separator } from "@/components/ui/separator"

function Footer() {
  return (
    <>
      <footer className="footer bg-secondary py-10">
        <div className="container mx-auto px-10">
          <div className="flex w-full flex-row items-start gap-30">
            <div className="basis-[20%]">
              <h2 className="mb-5 text-2xl">WELLCOMMERCE</h2>
              <p className="mb-5 text-sm">
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </p>
              <div className="flex justify-start">
                <div className="grid grid-cols-5 gap-1">
                  <CircleUserRound></CircleUserRound>
                  <CircleUserRound></CircleUserRound>
                  <CircleUserRound></CircleUserRound>
                  <CircleUserRound></CircleUserRound>
                </div>
              </div>
            </div>
            <div className="basis-[20%]">
              <p className="mb-5 text-lg font-bold">COMPANY</p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/">About</a>
                </li>
                <li>
                  <a href="/">Features</a>
                </li>
                <li>
                  <a href="/">Works</a>
                </li>
                <li>
                  <a href="/">Careers</a>
                </li>
              </ul>
            </div>
            <div className="basis-[20%]">
              <p className="mb-5 text-lg font-bold">HELP</p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/">About</a>
                </li>
                <li>
                  <a href="/">Features</a>
                </li>
                <li>
                  <a href="/">Works</a>
                </li>
                <li>
                  <a href="/">Careers</a>
                </li>
              </ul>
            </div>
            <div className="basis-[20%]">
              <p className="mb-5 text-lg font-bold">FAQ</p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/">About</a>
                </li>
                <li>
                  <a href="/">Features</a>
                </li>
                <li>
                  <a href="/">Works</a>
                </li>
                <li>
                  <a href="/">Careers</a>
                </li>
              </ul>
            </div>
            <div className="basis-[20%]">
              <p className="mb-5 text-lg font-bold">RESOURCES</p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/">About</a>
                </li>
                <li>
                  <a href="/">Features</a>
                </li>
                <li>
                  <a href="/">Works</a>
                </li>
                <li>
                  <a href="/">Careers</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Because the parent is not flex we use w-full */}
          <div className="mb-5 flex w-full flex-col">
            <Separator className="my-5" />
            {/* Because the parent is flex we use basis-full */}
            <div className="flex basis-full">
              <div className="basis-8/12">
                <p>WellCommerce 2026, All Rights Reserved</p>
              </div>
              <div className="flex basis-6/12 justify-end">
                <div className="grid grid-cols-5 gap-1">
                  <CircleUserRound></CircleUserRound>
                  <CircleUserRound></CircleUserRound>
                  <CircleUserRound></CircleUserRound>
                  <CircleUserRound></CircleUserRound>
                  <CircleUserRound></CircleUserRound>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
