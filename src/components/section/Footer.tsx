import NewsLetter from "./NewsLetter"

import { Separator } from "@/components/ui/separator"

import visa from "@/assets/images/general/visa.png"
import mastercard from "@/assets/images/general/mastercard.png"
import paypal from "@/assets/images/general/paypal.png"
import applePay from "@/assets/images/general/applepay.png"
import googlePay from "@/assets/images/general/googlepay.png"

import {
  SiFacebook,
  SiX,
  SiGithub,
  SiInstagram,
} from "@icons-pack/react-simple-icons"

function Footer() {
  return (
    <>
      <div className="-mt-10 flex justify-center">
        <NewsLetter className="relative top-23" />
      </div>
      <footer className="footer bg-secondary pt-30 pb-10">
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl border bg-background">
                    <SiX className="size-4" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl border bg-background">
                    <SiFacebook className="size-4" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl border bg-background">
                    <SiInstagram className="size-4" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl border bg-background">
                    <SiGithub className="size-4" />
                  </div>
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
                <p className="text-sm">
                  WellCommerce 2026, All Rights Reserved
                </p>
              </div>
              <div className="flex basis-6/12 justify-end">
                <div className="grid grid-cols-5 gap-1">
                  <div className="flex items-center justify-center rounded border bg-background p-2">
                    <img className="h-3 w-6" src={visa} alt="" />
                  </div>
                  <div className="flex h-8 w-12 items-center justify-center rounded border bg-background">
                    <img className="h-3 w-6" src={mastercard} alt="" />
                  </div>
                  <div className="flex h-8 w-12 items-center justify-center rounded border bg-background">
                    <img className="h-3 w-6" src={paypal} alt="" />
                  </div>
                  <div className="flex h-8 w-12 items-center justify-center rounded border bg-background">
                    <img className="h-3 w-6" src={applePay} alt="" />
                  </div>
                  <div className="flex h-8 w-12 items-center justify-center rounded border bg-background">
                    <img className="h-3 w-6" src={googlePay} alt="" />
                  </div>
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
