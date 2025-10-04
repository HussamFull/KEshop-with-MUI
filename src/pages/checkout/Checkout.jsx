import React from 'react'
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';


export default function Checkout() {


  const fetchProducts = async () => {
    const response = await AxiosUserInstanse.get('/Carts');
    return response;
  };
  const { data , isError, isLoading, error } = useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  const {register,control, handleSubmit } = useForm({
    defaultValues: {
      paymentMethod: 'Cash on Delivery',
    }
  });
  

    const onSubmit = async (formData) => {
        const response = await AxiosUserInstanse.post('/CheckOut/payment', {
           paymentMethod:formData.paymentMethod
        });
          if(response.status === 200){
        console.log(response);
        location.href = response.data.url;
    }
    }

  


  const cartItemCount = data?.data.items.length;
    const cartItems = data?.data.items ;
console.log(cartItems);

if (isLoading) {
    return <CircularProgress />;
  }
    if (isError) {
    return <div>Error: {error.message}</div>;
    }





  return (
    <Box sx={{ p: 2 }}>
        <Typography variant="h4" >       Checkout Page</Typography>
        {cartItems.map((item) => (
          <Box  sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2 }}>
            <Card key={item.productId} sx={{ mb: 2 }}>
                <CardContent sx={{display: 'flex',justifyContent: 'space-between',  alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6">{item.productName}</Typography>
                    <Typography>Price: ${item.price} * {item.count} = {item.count * item.price } </Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                    <Typography>Total: ${item.price * item.quantity}</Typography>
                </CardContent>
             </Card>   
            
            </Box>
        ))}
        <Typography variant="h6" mt={2}>Total Items: {data.data.cartTotal} $</Typography>

        <Box 
        onSubmit={handleSubmit(onSubmit)}
        component={"form"}
        mt={4} p={2} sx={{ 
            display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 400,
            border: '1px solid #ccc', borderRadius: 2 }}
            >
        <Controller
            name="paymentMethod"   defaultValue={"Cash"}
            control={control}
            render={({ field }) => (
                <FormControl>
                    <FormLabel id="payment-method-label">Select Payment Method</FormLabel>
                    <RadioGroup
                        aria-labelledby="payment-method-label"
                        {...field}
                      
                        name="paymentMethod"
                    >
                        <FormControlLabel value={"Cash"} control={<Radio />} label="Cash" />
                        <FormControlLabel value={"Visa"} control={<Radio />} label="Visa" />
                    </RadioGroup>
                </FormControl>
            )}
        />


        <Button variant='contained' type='submit'>Place Order</Button>

        </Box>
    </Box>
  )
}
