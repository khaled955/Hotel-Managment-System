import { Box, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import photo1 from "../../../../assets/images/livingRooms/1.png"
import photo2 from "../../../../assets/images/livingRooms/2.webp"
import photo3 from "../../../../assets/images/livingRooms/3.png"
import photo4 from "../../../../assets/images/livingRooms/4.webp"
import photo5 from "../../../../assets/images/livingRooms/5.webp"
import photo6 from "../../../../assets/images/livingRooms/6.png"
import photo7 from "../../../../assets/images/livingRooms/7.png"
import photo8 from "../../../../assets/images/livingRooms/8.jpg"
import photo9 from "../../../../assets/images/livingRooms/9.jpg"
import photo10 from "../../../../assets/images/livingRooms/10.jpg"

import { HousePropSlider } from "../HousesBackyardCard/HouseSliderHome.interface";
import { Navigation } from 'swiper/modules';




const housesList:HousePropSlider[] = [{src:photo1 , title:"Tabby Town",text:"Gunung Batu, Indonesia" ,price:"280$"},
  {src:photo2 , title:"Anggana",text:"Bogor, Indonesia" ,price:"350$"},
  {src:photo3 , title:"Seattle Rain",text:"Jakarta, Indonesia" ,price:"400$"},
  {src:photo4 , title:"Wodden Pit",text:"Wonosobo, Indonesia" ,price:"280$"},
{src:photo5 , title:"Tabby Town",text:"Gunung Batu, Indonesia" ,price:"440$"},
  {src:photo6 , title:"Anggana",text:"Bogor, Indonesia" ,price:"320$"},
  {src:photo7 , title:"Seattle Rain",text:"Jakarta, Indonesia" ,price:"300$"},
  {src:photo8 , title:"Wodden Pit",text:"Wonosobo, Indonesia",price:"600$"},
  {src:photo9 , title:"Wodden Pit",text:"Wonosobo, Indonesia",price:"310$"},
  {src:photo10 , title:"Wodden Pit",text:"Wonosobo, Indonesia",price:"410$"},
  
]


export default function HotelLivingRoomCard() {
    
  
    return (
    <Grid container>
           <Grid size={{xs:12}}>
                      <Box  className="swiper-box"  sx={{ overflow: "hidden" }}>
      <Swiper
        
        spaceBetween={20}
        modules={[Autoplay ,Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        loop={true}
        breakpoints={{
          300: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 2 },
          1000: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {housesList.map((house, index) => (
          <SwiperSlide key={index}>
            <Box>
              <Box position="relative" sx={{ width: "100%", height: 200, overflow: "hidden", borderRadius: 2 }}>
                <img
                  src={house.src}
                  alt={house.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "rgba(0, 73, 139, 1)",
                    color: "#fff",
                    px: 2,
                    py: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    borderBottomLeftRadius: "12px",
                  }}
                >
                  {house.price}
                </Box>
              </Box>
            <Box textAlign={"center"}>
                  <Typography variant="h6" fontSize={16} mt={1} fontWeight={500}>
                {house.title}
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                {house.text}
              </Typography>
            </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
           </Grid>
    </Grid>

    )
}
