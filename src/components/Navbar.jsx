import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.primary.light}`,
}));

const AnimatedTypography = styled(motion(Typography))(({ theme }) => ({
  fontFamily: '"Pacifico", cursive',
  fontSize: '2.5rem',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  display: 'inline-block',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
}));

const HeartIcon = styled(motion(FavoriteIcon))(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '2rem',
  margin: '0 0.5rem',
  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
}));

const Navbar = () => {
  const firstPart = "Mummu";
  const secondPart = "ka Budhuu";
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 400, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const heartVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'center', minHeight: '80px' }}>
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.2rem',
          }}
        >
          {firstPart.split('').map((letter, index) => (
            <AnimatedTypography
              key={index}
              component={RouterLink}
              to="/"
              variants={letterVariants}
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              {letter}
            </AnimatedTypography>
          ))}
          
          <HeartIcon
            variants={heartVariants}
            animate={["visible", "pulse"]}
            sx={{
              verticalAlign: 'middle',
            }}
          />

          {secondPart.split('').map((letter, index) => (
            <AnimatedTypography
              key={index + firstPart.length}
              component={RouterLink}
              to="/"
              variants={letterVariants}
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              {letter}
            </AnimatedTypography>
          ))}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 