import { Box, Grid, Typography } from "@mui/material";
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
    <Grid container>
           <Grid size={{xs:12}}>
                      <Box  className="swiper-box backyard"  sx={{ overflow: "hidden" }}>
      <Swiper
        
        spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          300: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 4 },
          1000: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
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
                    bgcolor: "rgba(255, 73, 139, 1)",
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
              <Typography variant="h6" fontSize={16} mt={1} fontWeight={500}>
                {house.title}
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                {house.text}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
           </Grid>
    </Grid>

    )
}
