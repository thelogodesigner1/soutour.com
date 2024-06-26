

import React, { useState } from "react";
import { Paper, Typography, Stack, Box } from "@mui/material";
import axios from "axios";
import Card from './Card'

const BookNow = () => {
  const [bookedCarts, setBookedCarts] = useState(0);
  const totalCarts = 5; // Assuming you have 5 golfcarts

  const checkoutHandler = async (amount) => {
    try {
      const {
        data: { key },
      } = await axios.get("http://www.localhost:4000/api/getkey");

      const {
        data: { order },
      } = await axios.post("http://localhost:4000/api/checkout", {
        amount,
      });

      
      setBookedCarts(prevBookedCarts => prevBookedCarts + 1);

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Soutour.com",
        description: "Soutour Payment",
        image: "https://i.postimg.cc/4dPxQ2yK/souTour.png",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
          name: "Soutour.com",
          email: "thelogodesigner1@gmail.com",
          contact: "9713934293",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };

      if (typeof window.Razorpay === "function") {
        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        console.error(
          "Razorpay is not available. Please ensure it is loaded correctly."
        );
      }
    } catch (error) {
      console.error("Error in checkout:", error);
    }
  };

  return (
    <Stack>
      <Paper
        sx={{
          width: "100%",
          maxWidth: "1000px",
          margin: "auto",
          mt: "50px",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          borderRadius: "50px",
          overflowX: "hidden",
          marginBottom: "50px",
          backgroundColor: "#A61892",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textDecoration: "underline",
            backgroundImage:
              "radial-gradient(circle 325px at 19.2% 64.8%, rgba(254,62,101,1) 9.7%, rgba(166,24,146,1) 91.3%)",
          }}
        >
          Book Now
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            gap: "20px",
            padding: "20px",
          }}
        >
         
          <Box className="card-book" sx={{ flex: "1", borderRadius: '30px' }}>
            <img
              src="https://i.postimg.cc/6qH1ZxvZ/img10.jpg"
              alt="cards"
              className="card-image"
            />
            <h2>Rate 5000 For 8 people Only Driver</h2>
            <Card amount={5000} checkoutHandler={checkoutHandler} />
          </Box>

          {/* Second Card */}
          <Box className="card-book" sx={{ flex: "1", borderRadius: '30px' }}>
            <img
              src="https://i.postimg.cc/y80S7Mnx/img16.jpg"
              alt="cards"
              className="card-image"
            />
            <h2>Rate 6000 for 8 People With Tour Guide</h2>
            <Card amount={6000} checkoutHandler={checkoutHandler} />
          </Box>
        </Box>

        
        <Typography variant="h3">
          {totalCarts - bookedCarts > 0
            ? `${totalCarts - bookedCarts} left`
            : "All carts booked!"}
        </Typography>
      </Paper>
    </Stack>
  );
};

export default BookNow;
