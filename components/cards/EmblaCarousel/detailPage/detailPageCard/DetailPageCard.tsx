import DetailProdSliderContent from '../detailPageCard/DetailProdSliderContent'

const DetailPageCard = ({ featured }: any) => {
  /*  const detailCards = [
    {
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
      ],
      address: 'Marcy Ave,Brooklyn, 12456',
      property: 'Awesome Family Home',
      price: '$10.00/mo',
      district: 'D8-BISHAN',
      type: ' Whole Unit',
      furnished: 'Partially Furnished',
      amenities: ['6', '3'],
      squareFeet: '1250Sq Ft',
      distance: '8 mins(480m) to',
      mrtStation: '8 Farrer Park MRT',
      label: 'condo',
    },
    {
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
      ],
      address: 'Marcy Ave,Brooklyn, 12456',
      property: 'Awesome Family Home',
      price: '$10.00/mo',
      district: 'D8-BISHAN',
      type: ' Whole Unit',
      furnished: 'Partially Furnished',
      amenities: ['6', '3'],
      squareFeet: '1250Sq Ft',
      distance: '8 mins(480m) to',
      mrtStation: '8 Farrer Park MRT',
      label: 'condo',
    },
    {
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
      ],
      address: 'Marcy Ave,Brooklyn, 12456',
      property: 'Awesome Family Home',
      price: '$10.00/mo',
      district: 'D8-BISHAN',
      type: ' Whole Unit',
      furnished: 'Partially Furnished',
      amenities: ['6', '3'],
      squareFeet: '1250Sq Ft',
      distance: '8 mins(480m) to',
      mrtStation: '8 Farrer Park MRT',
      label: 'condo',
    },
    {
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYPAb1_I81stYelEBp4Cxh4fHIHAKplsGfg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hHfczN757jNrDv9lW46e7fQ-9ZqNW4NlIw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_RHZNZZqSfbOrdT7VaPG2But90mgMTbywg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33xCrCf6qGT4aCV2QdkZ8njMvM7-ZXnOE9g&usqp=CAU',
      ],
      address: 'Marcy Ave,Brooklyn, 12456',
      property: 'Awesome Family Home',
      price: '$10.00/mo',
      district: 'D8-BISHAN',
      type: ' Whole Unit',
      furnished: 'Partially Furnished',
      amenities: ['6', '3'],
      squareFeet: '1250Sq Ft',
      distance: '8 mins(480m) to',
      mrtStation: '8 Farrer Park MRT',
      label: 'condo',
    },
  ] */
  return (
    <>
      <div className=" w-full pb-[15px] sm:pb-[25px]  md:pb-[40px] lg:pb-[55px] xl:pb-[78px] 2xl:pb-[90px] ">
        <DetailProdSliderContent detailCards={featured} />
      </div>

      {/**product slider without tab**/}
    </>
  )
}

export default DetailPageCard
