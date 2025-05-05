import { Box, Container, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useRef, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AirIcon from '@mui/icons-material/Air';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import MKB2207 from '../assets/video/MKB2207.MP4';
import MKB2411 from '../assets/video/MKB2411.MP4';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '& video': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
}));

const TextSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light} 100%)`,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Dancing Script", cursive',
  color: theme.palette.primary.main,
  textAlign: 'center',
  lineHeight: 1.8,
  marginBottom: theme.spacing(4),
}));

const MusicButton = styled(motion(IconButton))(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  width: '50px',
  height: '50px',
  boxShadow: '0 4px 8px rgba(200, 195, 195, 0)',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    boxShadow: '0 6px 12px rgba(202, 202, 202, 0)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.8rem',
  },
}));

const FloatingHeart = styled(motion(FavoriteIcon))(({ theme }) => ({
  position: 'absolute',
  color: theme.palette.primary.main,
  fontSize: '1.5rem',
  opacity: 0.6,
  pointerEvents: 'none',
}));

const ImageSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  minHeight: '200px',
}));

const FloatingImage = styled(motion.img)(({ theme }) => ({
  width: '280px',
  height: '380px',
  objectFit: 'cover',
  borderRadius: '20px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  position: 'absolute',
}));

const FloatingBalloon = styled(motion(AirIcon))(({ theme }) => ({
  position: 'absolute',
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '2.5rem',
  pointerEvents: 'none',
}));

const VideoSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.light} 100%)`,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  margin: '0 auto',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  position: 'relative',
  width: '100%',
  '& video': {
    width: '100%',
    height: 'auto',
    maxHeight: '500px',
    objectFit: 'contain',
    display: 'block',
  },
}));

const GallerySection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.secondary.light} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 40%)',
    pointerEvents: 'none',
  },
}));

const GalleryGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  padding: '0 20px',
  maxWidth: '1400px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

const GalleryItem = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: '15px',
  overflow: 'hidden',
  aspectRatio: '1',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  '&:hover': {
    '& .gallery-overlay': {
      opacity: 1,
    },
    '& .gallery-image': {
      transform: 'scale(1.1)',
    },
  },
}));

const GalleryImage = styled(motion.img)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
});

const GalleryOverlay = styled(motion.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
});

const GalleryIcon = styled(Box)({
  color: 'white',
  fontSize: '2rem',
  transform: 'scale(0.8)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1)',
  },
})

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(new Audio('/src/assets/music/mkb.mp3'));
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted) {
        videoRef.current.loop = true;
        videoRef.current.play();
      } else {
        videoRef.current.loop = false;
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <HeroSection>
        <video
          autoPlay
          loop
          muted
          ref={videoRef}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={MKB2207} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box sx={{ position: 'absolute', bottom: 20, right: 20, zIndex: 3 }}>
          <MusicButton
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </MusicButton>
        </Box>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '4rem' },
                fontWeight: 600,
                mb: 2,
                fontFamily: 'Monoton, cursive',
                color: '#FFB6C1', 
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.64)' 
              }}
            >
              Mummu ka Budhuu
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                mb: 4,
                fontFamily: 'Dancing Script, cursive',
              }}
            >
              कहाँ से Dosthi कहानी शुरू
            </Typography>
            <MusicButton
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </MusicButton>
          </Box>
        </Container>
      </HeroSection>

      <TextSection>
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <FloatingHeart
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-15, 15, -15],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: '5%',
              top: '10%'
            }}
          />
          <FloatingHeart
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [15, -15, 15],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            style={{
              right: '5%',
              top: '20%'
            }}
          />
          <FloatingHeart
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{
              left: '15%',
              bottom: '15%'
            }}
          />
          <FloatingHeart
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-12, 12, -12],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
            style={{
              right: '20%',
              top: '40%'
            }}
          />
          <FloatingHeart
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [12, -12, 12],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7
            }}
            style={{
              left: '25%',
              top: '60%'
            }}
          />
          <FloatingHeart
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-8, 8, -8],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
            style={{
              right: '30%',
              bottom: '30%'
            }}
          />
          <FloatingHeart
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [8, -8, 8],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4
            }}
            style={{
              left: '35%',
              top: '80%'
            }}
          />
          <FloatingHeart
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
            style={{
              right: '25%',
              bottom: '45%'
            }}
          />
          <StyledTypography variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 6 }}>
            24 November 2024
          </StyledTypography>
          
          <StyledTypography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 4 }}>
            You are not just my Best Friend.
          </StyledTypography>
          
          <StyledTypography variant="body1" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
            • You're my crazy best half. <br />
            • My secret supporter. <br />
            • My daily chart buster in each sec's. <br />
            • My personal adviser. <br />
            • My Everything has a mirror to me.
          </StyledTypography>

          <StyledTypography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mt: 8, mb: 4 }}>
            In short and sweet 💕 U r "mine" everything. <br />
            I love Best Friend U
          </StyledTypography>

          <StyledTypography variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 6 }}>
            Mumuu ka Budhuu
          </StyledTypography>
        </Container>
      </TextSection>

      <ImageSection>
        <Container maxWidth="lg" sx={{ position: 'relative', height: '400px' }}>
          {/* Background Balloons */}
          <FloatingBalloon
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-25, 25, -25],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: '5%',
              top: '5%'
            }}
          />
          <FloatingBalloon
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [25, -25, 25],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            style={{
              right: '8%',
              top: '8%'
            }}
          />
          <FloatingBalloon
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{
              left: '15%',
              bottom: '10%'
            }}
          />
          <FloatingBalloon
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [20, -20, 20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7
            }}
            style={{
              right: '12%',
              bottom: '15%'
            }}
          />
          <FloatingBalloon
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-15, 15, -15],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
            style={{
              left: '8%',
              top: '40%'
            }}
          />
          <FloatingBalloon
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [15, -15, 15],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
            style={{
              right: '5%',
              top: '60%'
            }}
          />

          {/* Images */}
          <Box sx={{ 
            position: 'relative', 
            height: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '2rem'
          }}>
            <FloatingImage
              src="/src/assets/images/image1.JPG"
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: [-15, 15, -15],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'relative',
                left: 'auto',
                top: 'auto',
                transform: 'none'
              }}
            />
            <FloatingImage
              src="/src/assets/images/image2.JPG"
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: [15, -15, 15],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              style={{
                position: 'relative',
                left: 'auto',
                top: 'auto',
                transform: 'none'
              }}
            />
            <FloatingImage
              src="/src/assets/images/image3.JPG"
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: [-12, 12, -12],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              style={{
                position: 'relative',
                left: 'auto',
                top: 'auto',
                transform: 'none'
              }}
            />
          </Box>
        </Container>
      </ImageSection>

      <VideoSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 4, 
              color: 'black', 
              fontWeight: 600,
              fontFamily: '"Dancing Script", cursive',
              fontSize: { xs: '4rem', md: '4rem' }
            }}
          >
            "un momento especial"
          </Typography>
          <VideoContainer>
            <Box sx={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}>
<video 
                ref={videoRef}
                autoPlay 
                loop={false}
                playsInline
                muted={isMuted}
                style={{ width: '100%' }}
              >
                <source src={MKB2411} type="video/mp4" />
              </video>
              <IconButton
                onClick={toggleMute}
                sx={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.13)',
                  },
                }}
              >
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
            </Box>
          </VideoContainer>
        </Container>
      </VideoSection>

      <GallerySection>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 6, 
              color: 'black', 
              fontWeight: 600,
              fontFamily: '"Great Vibes", cursive',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textAlign: 'center'
            }}
          >
            === Our Reise  ===
          </Typography>
          <GalleryGrid>
            {[1, 2, 3, 4].map((item) => (
              <GalleryItem
                key={item}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)'
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
              >
                <GalleryImage 
                  className="gallery-image"
                  src={`/src/assets/images/gallery${item}.jpg`} 
                  alt={`Gallery ${item}`}
                  loading="lazy"
                />
                <GalleryOverlay className="gallery-overlay">
                  <GalleryIcon>
                    <FavoriteIcon fontSize="inherit" />
                  </GalleryIcon>
                </GalleryOverlay>
              </GalleryItem>
            ))}
          </GalleryGrid>
        </Container>
      </GallerySection>
      <Footer />
    </>
  );
};

const AnimatedFooter = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '200px',
  overflow: 'hidden',
  background: `linear-gradient(45deg,rgb(181, 144, 156) 0%, rgb(181, 144, 156) 50%,rgba(255, 240, 245, 0.61) 100%)`,
  padding: theme.spacing(4, 0),
  textAlign: 'center',
}));

const AnimatedItem = styled(motion.div)({
  position: 'absolute',
  pointerEvents: 'none',
});

const Footer = () => {
  const items = [];
  
  // Create random animated items
  for (let i = 0; i < 20; i++) {
    const type = Math.random() > 0.8 ? '❤️' : Math.random() > 0.2 ? '🎀' : '🎈';
    const size = Math.random() * 25 + 20;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * -20;
    
    items.push({
      id: i,
      type,
      size,
      left: `${left}%`,
      animation: {
        y: [0, -200, 0],
        rotate: [0, Math.random() > 0.5 ? 180 : -180],
        scale: [1, 1.2, 1],
        opacity: [0, 1, 0]
      },
      transition: {
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        delay,
        ease: 'easeInOut'
      }
    });
  }


  return (
    <AnimatedFooter>
      {items.map((item) => (
        <AnimatedItem
          key={item.id}
          animate={item.animation}
          transition={item.transition}
          style={{
            left: item.left,
            fontSize: `${item.size}px`,
            bottom: 0,
          }}
        >
          {item.type}
        </AnimatedItem>
      ))}
    </AnimatedFooter>
  );
};

export default Home;