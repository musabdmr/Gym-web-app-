import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Snackbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UyeKayit = ({ onUyeEkle }) => {
  const [uyeAdi, setUyeAdi] = useState('');
  const [uyeSoyadi, setUyeSoyadi] = useState('');
  const [telefon, setTelefon] = useState('');
  const [dogumTarihi, setDogumTarihi] = useState('');
  const [vucutOlculeri, setVucutOlculeri] = useState({ waist: 0, chest: 0, weight: 0 });
  const [saglikDurumu, setSaglikDurumu] = useState({ healthSituation: '', healthProblem: '' });
  const [odemeBilgileri, setOdemeBilgileri] = useState({ paymentDate: '', paymentAmount: 0 });
  const [yakini, setYakini] = useState({ name: '', phoneNumber: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [mevcutUyeler, setMevcutUyeler] = useState([]);

  useEffect(() => {
    async function fetchMevcutUyeler() {
      try {
        const response = await axios.get('http://localhost:3001/api/uyeler');
        setMevcutUyeler(response.data);
      } catch (error) {
        console.error('Mevcut üyeleri çekerken bir hata oluştu:', error.message);
      }
    }

    fetchMevcutUyeler();
  }, []); 

  const handleKayit = async () => {
  
    const errors = {};

    if (!uyeAdi) {
      errors.uyeAdi = 'Üye Adı boş bırakılamaz.';
    }
    if (!uyeSoyadi) {
      errors.uyeSoyadi = 'Üye Soyadı boş bırakılamaz.';
    }
    if (!telefon) {
      errors.telefon = 'Telefon boş bırakılamaz.';
    }
    if (!dogumTarihi) {
      errors.dogumTarihi = 'Doğum Tarihi boş bırakılamaz.';
    }
    if (!odemeBilgileri.paymentDate) {
      errors.paymentDate = 'Ödeme Tarihi boş bırakılamaz.';
    }
    if (isNaN(odemeBilgileri.paymentAmount)) {
      errors.paymentAmount = 'Miktar alanına sadece sayısal değer girilebilir.';
    }
    if (!yakini.name) {
      errors.yakiniName = 'Yakını Adı boş bırakılamaz.';
    }
    if (!yakini.phoneNumber) {
      errors.yakiniPhoneNumber = 'Yakını Telefon boş bırakılamaz.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    const yeniUye = {
      firstName: uyeAdi,
      lastName: uyeSoyadi,
      phoneNumber: telefon,
      birthDate: dogumTarihi,
      guests: [{ howManyDay: 0, startDate: '', endDate: '' }],
      dimensions: [vucutOlculeri],
      health: [saglikDurumu],
      payments: [odemeBilgileri],
      relatives: [yakini],
    };

    try {
      await axios.post('http://localhost:3001/api/uyeler', yeniUye);
      onUyeEkle(yeniUye);
      setSnackbarOpen(true);
      setValidationError({});

      
      fetchMevcutUyeler();
    } catch (error) {
      console.error('İstekte bir hata oluştu:', error.message);
    }
  };
  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px'}}>
      <Typography variant="h2" color="primary" gutterBottom>
        Üye Kayıt Sayfası
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Üye Adı"
            fullWidth
            value={uyeAdi}
            onChange={(e) => setUyeAdi(e.target.value)}
            error={!!validationError.uyeAdi}
            helperText={validationError.uyeAdi}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Üye Soyadı"
            fullWidth
            value={uyeSoyadi}
            onChange={(e) => setUyeSoyadi(e.target.value)}
            error={!!validationError.uyeSoyadi}
            helperText={validationError.uyeSoyadi}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Telefon"
            fullWidth
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            error={!!validationError.telefon}
            helperText={validationError.telefon}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Doğum Tarihi"
            fullWidth
            value={dogumTarihi}
            onChange={(e) => setDogumTarihi(e.target.value)}
            error={!!validationError.dogumTarihi}
            helperText={validationError.dogumTarihi}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" color="primary" gutterBottom>
            Vücut Ölçüleri
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            label="Bel"
            fullWidth
            value={vucutOlculeri.waist}
            onChange={(e) => setVucutOlculeri({ ...vucutOlculeri, waist: e.target.value })}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            label="Göğüs"
            fullWidth
            value={vucutOlculeri.chest}
            onChange={(e) => setVucutOlculeri({ ...vucutOlculeri, chest: e.target.value })}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            label="Kilo"
            fullWidth
            value={vucutOlculeri.weight}
            onChange={(e) => setVucutOlculeri({ ...vucutOlculeri, weight: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" color="primary" gutterBottom>
            Sağlık Durumu
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Durum"
            fullWidth
            value={saglikDurumu.healthSituation}
            onChange={(e) => setSaglikDurumu({ ...saglikDurumu, healthSituation: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Problem"
            fullWidth
            value={saglikDurumu.healthProblem}
            onChange={(e) => setSaglikDurumu({ ...saglikDurumu, healthProblem: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" color="primary" gutterBottom>
            Ödeme Bilgileri
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tarih"
            fullWidth
            value={odemeBilgileri.paymentDate}
            onChange={(e) => setOdemeBilgileri({ ...odemeBilgileri, paymentDate: e.target.value })}
            error={!!validationError.paymentDate}
            helperText={validationError.paymentDate}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            label="Miktar"
            fullWidth
            value={odemeBilgileri.paymentAmount}
            onChange={(e) => setOdemeBilgileri({ ...odemeBilgileri, paymentAmount: e.target.value })}
            error={!!validationError.paymentAmount}
            helperText={validationError.paymentAmount}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" color="primary" gutterBottom>
            Yakını
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Adı"
            fullWidth
            value={yakini.name}
            onChange={(e) => setYakini({ ...yakini, name: e.target.value })}
            error={!!validationError.yakiniName}
            helperText={validationError.yakiniName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Telefon"
            fullWidth
            value={yakini.phoneNumber}
            onChange={(e) => setYakini({ ...yakini, phoneNumber: e.target.value })}
            error={!!validationError.yakiniPhoneNumber}
            helperText={validationError.yakiniPhoneNumber}
          />
        </Grid>

        {}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleKayit}
            style={{ marginTop: '10px' }}
          >
            Kaydet
          </Button>
        </Grid>
      </Grid>

      {}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Üye başarıyla kaydedildi!"
      />
    </div>
  );
};

export default UyeKayit;
