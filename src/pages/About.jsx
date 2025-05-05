import { Box, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const AboutSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(8, 0),
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light} 100%)`,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
}));

const About = () => {
  return (
    <AboutSection>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontFamily: 'Dancing Script, cursive',
            color: 'primary.main',
          }}
        >
          Our Story
        </Typography>
        
        <StyledPaper elevation={3}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontFamily: 'Dancing Script, cursive',
              color: 'primary.main',
            }}
          >
            The Beginning
          </Typography>
          <Typography variant="body1" paragraph>
            Every love story is beautiful, but ours is my favorite. It all started with a simple hello,
            a smile that lit up the room, and a connection that felt like coming home.
          </Typography>
        </StyledPaper>

        <StyledPaper elevation={3}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontFamily: 'Dancing Script, cursive',
              color: 'primary.main',
            }}
          >
            Our Journey
          </Typography>
          <Typography variant="body1" paragraph>
            Through every laugh, every tear, and every moment in between, we've grown together.
            Our love has been the constant in a world of change, the anchor in life's storms,
            and the light that guides us home.
          </Typography>
        </StyledPaper>

        <StyledPaper elevation={3}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontFamily: 'Dancing Script, cursive',
              color: 'primary.main',
            }}
          >
            Forever & Always
          </Typography>
          <Typography variant="body1" paragraph>
            This is not just a story of love, but a promise of forever. A promise to stand by each other,
            to grow together, and to love unconditionally through all of life's adventures.
          </Typography>
        </StyledPaper>
      </Container>
    </AboutSection>
  );
};

export default About; 