import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    text: "Working with SunLink was a positive experience. They're very knowledgeable about residential solar and helped us design a system that is large enough to handle our current electric needs and ready for our future plans. Our solar system went live in January '23 and we have not had to pay anything on our electric bills. In fact, we've consistently built credits on each bill, that roll over to the next month.",
    author: "Chuck M.",
    role: "Verified Customer"
  },
  {
    id: 2,
    text: "SunLink called on us about 3 years ago, designed a system that fit our needs extremely well. After an unexpected heart attack, we decided it was time to downsize & was pleasantly surprised house sold to the 2nd family that the looked at it particularly because it had solar. Once in our new house we called SunLink a 2nd time for their expertise to design a system for us.",
    author: "Tom P.",
    role: "Verified Customer"
  },
  {
    id: 3,
    text: "SunLink took care of us every step of the way getting solar. We paid $0 down to get our system. Our electric bill is -$24 our first month having solar. We experienced our first power outage and our battery kept our home running the entire time. If you care about your family and home you need to get solar from SunLink.",
    author: "John T.",
    role: "Verified Customer"
  },
  {
    id: 4,
    text: "I was skeptical at first - how could buying solar online actually work? But within 20 minutes, I had designed my own system, seen the real wholesale pricing (no markup!), and secured financing. The whole process was transparent from start to finish.",
    author: "James D.",
    role: "Verified Customer"
  }
];

const TestimonialsCarousel: React.FC = () => {
  const StarRating = () => (
    <div className="flex items-center mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="w-5 h-5 text-orange-400 fill-current" />
      ))}
    </div>
  );

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 }
        }}
        className="testimonials-swiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="rounded-xl bg-gray-50 px-8 pt-8 pb-8 sm:px-6 sm:pt-10 h-[500px]">
              <StarRating />
              <p className="mt-2 max-w-lg text-lg font-inherit max-lg:text-center">
                "{testimonial.text}"
              </p>
              <h4 className="mt-8 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                {testimonial.author}, <span className="text-gray-400">{testimonial.role}</span>
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsCarousel;