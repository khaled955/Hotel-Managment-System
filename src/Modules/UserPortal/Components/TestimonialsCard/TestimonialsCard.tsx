import { Box, Grid, Paper, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import photo1 from "../../../../assets/images/testimonials/1.png"
import photo2 from "../../../../assets/images/testimonials/2.jpeg"
import photo3 from "../../../../assets/images/testimonials/3.png"
import photo4 from "../../../../assets/images/testimonials/4.png"
import photo5 from "../../../../assets/images/testimonials/5.jpeg"
import photo6 from "../../../../assets/images/testimonials/6png.png"
import photo7 from "../../../../assets/images/testimonials/7.png"
import photo8 from "../../../../assets/images/testimonials/8.png"
import { Navigation } from 'swiper/modules';
import { TestimonialProps } from "../../../../Interfaces/Testimonials.interfaces";
import StarIcon from '@mui/icons-material/Star';








const testimonials:TestimonialProps[] = [
  {
    familyName: "The Johnsons",
    overview: "We had the best vacation ever! The backyard and amenities were perfect for our kids.",
    rate: 5,
    img: photo1
  },
  {
    familyName: "The Smiths",
    overview: "Everything was clean and beautifully decorated. Highly recommend this place!",
    rate: 4.5,
    img:photo2
  },
  {
    familyName: "The Chens",
    overview: "Great service and quiet location. Loved the nearby nature trails.",
    rate: 4,
    img: photo3
  },
  {
    familyName: "The Garcias",
    overview: "Perfect for a family reunion! Spacious and very comfortable.",
    rate: 5,
    img: photo4
  },
  {
    familyName: "The Alis",
    overview: "The hosts were super friendly and helped us with local recommendations.",
    rate: 4.8,
    img: photo5
  },
  {
    familyName: "The Yamamotos",
    overview: "Loved the private garden and the peaceful environment. We’ll come again!",
    rate: 4.7,
    img: photo6
  },
  {
    familyName: "The Haddads",
    overview: "Everything was as described and more. A wonderful escape from the city.",
    rate: 4.9,
    img: photo7
  },
  {
    familyName: "The Müllers",
    overview: "Such a cozy and warm home. The kids didn’t want to leave!",
    rate: 5,
    img: photo8
  }
];










export default function TestimonialsCard() {
    
  
    return (
    <Grid container>
           <Grid size={{xs:12}}>
                      <Box  className="swiper-box testimonial-box"  sx={{ overflow: "hidden" }}>
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
          600: { slidesPerView: 1},
          900: { slidesPerView: 1 },
          1000: { slidesPerView: 1 },
          1200: { slidesPerView: 1 },
        }}
      >
        {testimonials.map((test, index) => (
          <SwiperSlide key={index}>
            <Paper>
                <Box sx={{display:"flex" , justifyContent:"center" , gap:"5px" , flexWrap:"wrap"}}>
              <Box position="relative" sx={{ width: "100%", height: 300, overflow: "hidden", borderRadius: 2 }}>
                <img
                  src={test.img}
                  alt={test.familyName}
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
               
              </Box>
            <Box textAlign={"center"}>
                  <Typography variant="h6" fontSize={16} mt={1} fontWeight={500}>
                {test.familyName}
              </Typography>

              <Box sx={{display:"flex" , alignItems:"center" , justifyContent:"center"}}>
                <Box sx={{display:"flex" , gap:"2px" , color:"yellow" , alignItems:"center"}}><StarIcon/>  <StarIcon/><StarIcon/><StarIcon/>   
                </Box>
                <Box>{test.rate}</Box>
              </Box>
              <Typography fontSize={12} color="text.secondary">
                {test.overview}
              </Typography>
            </Box>
            </Box>
            </Paper>



          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
           </Grid>
    </Grid>

    )
}
