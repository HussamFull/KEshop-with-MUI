import React from 'react'
import AxiosProfileInstanse from '../../api/AxiosProfileInstanse';
 // import { useQuery } from "react-query";
  import { Box, CircularProgress, Typography } from "@mui/material";
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';


export default function Info() {
  // **1. استيراد useQuery من react-query**

  const queryClient = useQueryClient();

  const fetchProfile = async () => {
    const response = await AxiosProfileInstanse.get("/Users/Profile");
    return response;
  };
  const {
    data: user, // **تغيير الاسم من data إلى productsData لتجنب التعارض**
    error,
    isError,
    isLoading: loading,
  } = useQuery({
    queryKey: ["User"],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });


    if (loading) {
      return (
        <CircularProgress sx={{ display: "block", margin: "auto", mt: 10 }} />
      );
    }
  
    if (isError) {
      return (
        <Typography color="error" align="center" sx={{ mt: 10 }}>
          Error loading products: {error.message}
        </Typography>
      );
    }



  return (
    <>
    
    <Typography variant="h4" gutterBottom>
      User Profile
    </Typography>
    <Typography variant="body1"><strong>Name:</strong> {user?.data.fullName}</Typography>
    <Typography variant="body1"><strong>Email:</strong> {user?.data.email}</Typography>
    <Typography variant="body1"><strong>Phone:</strong> {user?.data.phone}</Typography>
  
   
    </>
  )
}
