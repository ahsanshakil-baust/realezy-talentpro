import ImageSliderContent from '../home/HomePage/imageSliderContent/ImageSliderContent'

const HmSlider1 = ({ _ }: any) => {
  // const imgCards = [
  //   {
  //     images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXOYr6Q2BkU4ud4RJISeZmf4y8HDlaZgYNv8CXai3T3Cs0O5MM',

  //     label: 'condo',
  //     desc: 'ABCD',
  //   },
  //   {
  //     images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXOYr6Q2BkU4ud4RJISeZmf4y8HDlaZgYNv8CXai3T3Cs0O5MM',

  //     label: 'condo',
  //     desc: 'ABCD',
  //   },
  //   {
  //     images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',

  //     label: 'condo',
  //     desc: 'ABCD',
  //   },
  //   {
  //     images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',

  //     label: 'condo',
  //     desc: 'ABCD',
  //   },
  // ]
  const imgCards: any = [
    {
      images:
        'https://media.istockphoto.com/id/1225226886/photo/modern-residential-buildings.jpg?b=1&s=612x612&w=0&k=20&c=0zTWbqxBBG8ClD4QZORDzYB9uWztU-k7konRbCXB9aM=',

      label: 'Condos',
      desc: "Discover Singapore's private condominiums",
    },
    {
      images:
        'https://media.istockphoto.com/id/1155583138/photo/singapore-hdb-residential-building-in-green-forest-skyline.jpg?b=1&s=612x612&w=0&k=20&c=q0mpkuWW7k1XOibvK5w3kLp1peSxK1fgo6QeKVWJqMQ=',

      label: 'HDB',
      desc: "Explore Singapore's public housing estates",
    },
    {
      images:
        'https://media.istockphoto.com/id/1225226886/photo/modern-residential-buildings.jpg?b=1&s=612x612&w=0&k=20&c=0zTWbqxBBG8ClD4QZORDzYB9uWztU-k7konRbCXB9aM=',

      label: 'Condos',
      desc: "Discover Singapore's private condominiums",
    },
    {
      images:
        'https://media.istockphoto.com/id/1155583138/photo/singapore-hdb-residential-building-in-green-forest-skyline.jpg?b=1&s=612x612&w=0&k=20&c=q0mpkuWW7k1XOibvK5w3kLp1peSxK1fgo6QeKVWJqMQ=',

      label: 'HDB',
      desc: "Explore Singapore's public housing estates",
    }
  ]
  // data?.map((ent: any)=>{
  //   imgCards.push({
  //     images: ent?.image,

  //     label: ent?.title,
  //     desc: ent?.subtitle,
  //   },)
  // })
  return (
    <>
      <div className=" py-[15px] sm:py-[25px] md:py-[25px] lg:py-[25px] xl:py-[25px] 2xl:py-[25px] w-full">
        <ImageSliderContent imgCards={imgCards} />
      </div>

      {/**product slider without tab**/}
    </>
  )
}

export default HmSlider1
