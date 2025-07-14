import { Box, Typography } from "@mui/material";
import { HousePropSlider } from "./HouseSliderHome.interface";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import photo1 from "../../../../assets/images/HousesBg/backyard1.png"
import photo2 from "../../../../assets/images/HousesBg/backyard2.png"
import photo3 from "../../../../assets/images/HousesBg/backyard3.png"
import photo4 from "../../../../assets/images/HousesBg/backyard4.png"
import photo5 from "../../../../assets/images/HousesBg/photo5.jpeg"
import photo6 from "../../../../assets/images/HousesBg/photo6.webp"
import photo7 from "../../../../assets/images/HousesBg/photo7.jpg"
import photo8 from "../../../../assets/images/HousesBg/photo8.jpg"
 





const housesList:HousePropSlider[] = [{src:photo1 , title:"Tabby Town",text:"Gunung Batu, Indonesia" ,price:"280$"},
  {src:photo2 , title:"Anggana",text:"Bogor, Indonesia" ,price:"240$"},
  {src:photo3 , title:"Seattle Rain",text:"Jakarta, Indonesia" ,price:"260$"},
  {src:photo4 , title:"Wodden Pit",text:"Wonosobo, Indonesia" ,price:"290$"},
{src:photo5 , title:"Tabby Town",text:"Gunung Batu, Indonesia" ,price:"200$"},
  {src:photo6 , title:"Anggana",text:"Bogor, Indonesia" ,price:"140$"},
  {src:photo7 , title:"Seattle Rain",text:"Jakarta, Indonesia" ,price:"180$"},
  {src:photo8 , title:"Wodden Pit",text:"Wonosobo, Indonesia",price:"210$"},
  
]


export default function HousesBackyardCard() {
    
  
    return (
        <Box  sx={{ mb: {xs:2,md:6},paddingX: { xs: "20px", md: "50px" } }}>
            <Box sx={{ display:'flex' }}>
            <Swiper
                modules={[ Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                    320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    922: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
        
                }}
            >
                {housesList.map((house:HousePropSlider, slideIndex) => (
                
                    <SwiperSlide key={slideIndex} >
                        <Box sx={{ width: '100%',
                            height: "200px" }}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    backgroundColor: "rgba(255, 73, 139, 1)",
                                    color: "white",
                                    padding: {
                                      xs: "4px 10px",
                                      sm: "6px 10px",
                                      md: "6px 40px",
                                    },
                                    textAlign: "center",
                                    borderRadius: "0 4px 0 30px",
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    zIndex: 100,
                                    width: "30%",
                                    whiteSpace: "nowrap",
                                  }}
                            >
                                {house.price}
                            </Box>
                            <img 
                                src={house.src} 
                                alt= {house.title}
                                width="100%"
                                height="200px"
                            />
                        </Box>
                        <Typography sx={{mt:1}}>
                            <Typography component="span" sx={{fontWeight:400,fontSize:{xs:14,sm:20}}}>
                                {house.title}
                            </Typography>
                            <br/>
                            <Typography component="span"sx={{fontWeight:400,fontSize:{xs:10,sm:14}}}>
                                {house.text}
                            </Typography >
                        </Typography>
                    </SwiperSlide>
                

                ))}
            </Swiper>
            </Box>  
        </Box>
    )
}
