import React from 'react'
import Img9 from "../../assets/Casual.png"
import Img10 from "../../assets/formal.png"
import Img11 from "../../assets/party.png"
import Img12 from "../../assets/gym.png"

const DressStyle = [
{
    id: 9,
    title: "Casual",
    img: Img9,
    flex: 2
},
{
    id: 10,
    title: "Formal",
    img: Img10,
    flex: 3
},
{
    id: 11,
    title: "Party",
    img: Img11,
    flex: 3
},
{
    id: 12,
    title: "Gym",
    img: Img12,
    flex: 2
}
]
const BrowseStylePanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 mx-10 py-15">
      {DressStyle.map((style) => (
        <div key={style.id} className={`style_card ${style.flex === 3 ? "style_card-lg" : "style_card-md"}`}>
          <img src={style.img} className="w-full h-[290px] object-cover" />
          <p className="absolute top-4 left-4 text-[24px] font-bold text-black">
            {style.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BrowseStylePanel