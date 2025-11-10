import emailjs from 'emailjs-com';

const sendBooking = (bookingData) => {
  emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    bookingData,
    'YOUR_PUBLIC_KEY'
  ).then(() => {
    alert('Booking confirmed! Check your email.');
  }).catch((err) => console.error(err));
};
