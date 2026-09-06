import { Card, CardContent } from "@/components/ui/card"

import image15 from "@/assets/images/general/image15.webp"
import image16 from "@/assets/images/general/image16.webp"
import image17 from "@/assets/images/general/image17.webp"
import image18 from "@/assets/images/general/image18.webp"
import { Link } from "react-router-dom"
import { PageRoutes } from "@/config/routes"

const DressStyle = () => {
  const dressStyles = [
    {
      title: "Casual",
      image: image15,
      imageClassName: "left-0 w-full",
      cardClassName: "aspect-[407/289]",
    },
    {
      title: "Formal",
      image: image16,
      imageClassName: "left-0 w-full",
      cardClassName: "aspect-[684/289]",
    },
    {
      title: "Party",
      image: image17,
      imageClassName: "left-[6.14%] w-[93.86%]",
      cardClassName: "aspect-[684/289]",
    },
    {
      title: "Gym",
      image: image18,
      imageClassName: "left-[13.02%] w-[86.98%]",
      cardClassName: "aspect-[407/289]",
    },
  ]

  const renderDressCard = (dressStyle: (typeof dressStyles)[number]) => (
    <Link key={dressStyle.title} to={PageRoutes.BROWSE}>
      <Card
        className={`h-full w-full overflow-hidden rounded-[20px] border-0 bg-white p-0 shadow-none ${dressStyle.cardClassName}`}
      >
        <CardContent className="relative h-full p-0">
          <img
            className={`absolute top-0 h-full object-cover ${dressStyle.imageClassName}`}
            alt="Image"
            src={dressStyle.image}
          />
          <span className="relative z-10 flex pt-[8.65%] pl-[8.85%] text-[clamp(1.25rem,2.91vw,2.25rem)] leading-[normal] font-bold tracking-[0] text-black">
            {dressStyle.title}
          </span>
        </CardContent>
      </Card>
    </Link>
  )

  return (
    <section className="dresss bg-background pt-5">
      <div className="container mx-auto flex justify-center gap-10 px-10">
        <div
          className="w-full max-w-[1100px] overflow-hidden rounded-[40px] bg-[#efefef] pt-[5.68%] pb-[6.14%]"
          aria-labelledby="browse-by-dress-title"
        >
          <h2
            id="browse-by-dress-title"
            className="px-4 text-center leading-[normal] tracking-[0]"
          >
            BROWSE BY DRESS STYLE
          </h2>
          <div className="mt-[5.16%] px-[5.16%]">
            <div className="grid grid-cols-[minmax(0,407fr)_minmax(0,684fr)] gap-3">
              {dressStyles.slice(0, 2).map(renderDressCard)}
            </div>
            <div className="mt-[1.61%] grid grid-cols-[minmax(0,684fr)_minmax(0,407fr)] gap-3">
              {dressStyles.slice(2).map(renderDressCard)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressStyle
