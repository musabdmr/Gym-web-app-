import React, { useState, useEffect } from 'react';
import UyeKayit from "./components/UyeKayit";
import MevcutUyeler from './components/MevcutUyeler';
import { 
  AppBar, 
  Box, 
  CssBaseline, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Toolbar, 
  Typography, 
  createTheme, 
  ThemeProvider 
} from '@mui/material';

import dumble1 from './images/dumble1.jpg';
import hoca from './images/hoca.jpg';
import salon1 from './images/salon1.jpg';
import './App.css';

const salonBackground = "public/images/salon1.jpg";
const kayitBackground = "public/images/kayit.jpg";

const theme = createTheme({
  palette: {
    primary: {
      main: '#40434E',
    },
    secondary: {
      main: '#702632',
    },
    text: {
      primary: '#080705',
    },
  },
});

const App = () => {
  const [uyeler, setUyeler] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Ana Sayfa');

  const handleUyeEkle = (uye) => {
    setUyeler([...uyeler, uye]);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'Üye Kayıt':
        return <UyeKayit onUyeEkle={handleUyeEkle} />;
      case 'Mevcut Üyeler':
        return <MevcutUyeler uyeler={uyeler} />;
      default:
        return (
          <div style={{ position: 'relative', opacity: 1 }}>
            {selectedMenuItem === 'Üye Kayıt' ? (
              
              <img
                src={kayitBackground}
                alt="Kayıt Filigran"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.2,
                  pointerEvents: 'none',
                }}
              />
            ) : (
              
              <img
                src={salonBackground}
                alt="Filigran"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  objectFit: 'cover',
                  opacity: 0.2,
                  pointerEvents: 'none',
                }}
              />
            )}
            {}
            <Typography variant="h3" color="#FFFFFA" gutterBottom align='center' >
            GYMNATİON İLE FORMUNU BUL, HAYATINI ŞEKİLLENDİR

            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={hoca} alt="Hoca" style={{ width: '50%', borderRadius: '8px', marginBottom: '10px' }} />
              <Typography variant="body1" style={{ textAlign: 'justify', width: '50%', marginBottom: '20px',color:"#FFFFFA" }}>
                Spor salonumuz, alanında uzman ve deneyimli bir kadro ile hizmet vermektedir. Uzman hocalarımız, spor ve fitness konularında kapsamlı bilgiye sahip olmanın yanı sıra, öğrencilere etkili ve güvenli bir antrenman deneyimi sunma konusunda da yeterliliğe sahiptir. Her bir hoca, bireysel ihtiyaçları anlama, kişisel hedefleri belirleme ve bu hedeflere ulaşmak için özelleştirilmiş antrenman programları oluşturma konusunda uzmanlaşmıştır. Spor salonumuz, motivasyonu yüksek, öğrencilere destek veren ve pozitif bir ortam yaratan bu uzman kadro ile birlikte, her seviyedeki sporculara etkili bir eğitim deneyimi sunmaktadır. Siz de spor hedeflerinize ulaşmak için uzman kadromuzla birlikte sağlıklı bir yaşamın kapılarını aralayabilirsiniz.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={salon1} alt="Salon" style={{ width: '50%', borderRadius: '8px', marginBottom: '10px' }} />
              <Typography variant="body1" style={{ textAlign: 'justify', width: '50%', marginBottom: '20px',color:"#FFFFFA" }}>
                Spor salonumuz, çeşitli ve modern ekipmanlarla donatılmıştır, böylece üyelerimize geniş bir antrenman yelpazesi sunmaktayız. Kardiyo ekipmanları arasında son teknoloji koşu bantları, eliptik bisikletler ve koşu makineleri bulunmaktadır. Bu sayede üyelerimiz, kardiyovasküler dayanıklılıklarını artırmak ve kalp sağlıklarını desteklemek için çeşitli seçeneklere sahiptir.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={dumble1} alt="Dumble" style={{ width: '50%', borderRadius: '8px', marginBottom: '10px' }} />
              <Typography variant="body1" style={{ textAlign: 'justify', width: '50%', marginBottom: '20px',color:"#FFFFFA"}}>
                Ağırlık antrenmanları için geniş bir serbest ağırlık alanımız vardır, bu alanda halter setleri, dambıllar ve barbell'lar gibi ekipmanlar bulunmaktadır. Ayrıca, makinelerle desteklenmiş direnç antrenmanlarını kolaylaştıran özel bir direnç ekipmanları bölümümüz de mevcuttur. Bu alan, vücut geliştirme, kas tonusu artırma ve kuvvet geliştirme gibi hedeflere yönelik olarak kullanıcıların ihtiyaçlarını karşılamak üzere tasarlanmıştır.
              </Typography>
            </Box>
          </div>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.primary.main, minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar position="static" style={{ backgroundColor: theme.palette.secondary.main }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, }} style={{color:"#FFFFFA"}} align='center' >
            GYMNATİON
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex' }}>
          <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0,paddi: 0}}>
            <List>
            {['Ana Sayfa', 'Üye Kayıt', 'Mevcut Üyeler'].map((text, index) => (
  <ListItem 
    button 
    key={text} 
    onClick={() => setSelectedMenuItem(text)} 
    style={{backgroundColor: theme.palette.secondary.main,color:theme.palette.secondary.main }}
  >
    <ListItemText 
      primary={text} 
      style={{ padding:'0px',color: "#FFFFFA",backgroundColor: theme.palette.secondary.main}}
    />
  </ListItem>
))}

            </List>
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {renderContent()}
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};



export default App;