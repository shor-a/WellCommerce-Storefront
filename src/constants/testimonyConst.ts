export interface Testimony {
  name: string
  review: string
  starValue: number
  verified: boolean
}

export const reviews: Testimony[] = [
  {
    name: "Jonathan",
    review:
      '"I really loved the vibes and overall services provided, top quality brands. Many hugs and love from me for this web service."',
    starValue: 5,
    verified: true,
  },
  {
    name: "Priscillia",
    review:
      '"Never before I have seen brands this good and have worldwide collections, really liked and really loved the overall elegantness of the website."',
    starValue: 5,
    verified: true,
  },
  {
    name: "Sarah M.",
    review:
      "\"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.\"",
    starValue: 5,
    verified: true,
  },
  {
    name: "Alex K.",
    review:
      '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
    starValue: 5,
    verified: true,
  },
  {
    name: "James L.",
    review:
      "\"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.\"",
    starValue: 5,
    verified: true,
  },
  {
    name: "Mooen",
    review:
      "\"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.\"",
    starValue: 5,
    verified: true,
  },
]

export default reviews
