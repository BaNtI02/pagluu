import { Box, Container, Typography, Grid, Card, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

const GallerySection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.default,
}));

const Gallery = () => {
  const images = [
    { src: '/src/assets/images/image1.JPG', title: 'Beautiful Moment 1' },
    { src: '/src/assets/images/image2.JPG', title: 'Beautiful Moment 2' },
    { src: '/src/assets/images/image3.JPG', title: 'Beautiful Moment 3' },
  ];

  return (
    <GallerySection>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontFamily: 'Dancing Script, cursive',
            color: 'primary.main',
          }}
        >
          Our Gallery
        </Typography>
        <Grid container spacing={4}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={image.src}
                  alt={image.title}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </GallerySection>
  );
};

export default Gallery; 