import image1 from '../detailPageCarousel/images/Slide1.jpg'
import image2 from '../detailPageCarousel/images/Slide2.jpg'
import image3 from '../detailPageCarousel/images/Slide3.jpg'
import image4 from '../detailPageCarousel/images/Slide4.jpg'
import image5 from '../detailPageCarousel/images/Slide5.jpg'

export const images: any[] = [image1, image2, image3, image4, image5]

const ImageByIndex = (index: number): any => images[index % images.length]

export default ImageByIndex
