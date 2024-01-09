// MevcutUyeler.jsx

import React, { useState } from 'react';
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Grid,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MevcutUyeler = ({ uyeler }) => {
  const [expanded, setExpanded] = useState(null);

  const handleDetailsClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div>
      <h2>Salonunuzdaki katılı müşterilerilere, kişisel bilgilerine ve vücut ölçülerine aşağıdan ulaşabilirsiniz sağlıklı günler dileriz</h2>
      <Grid container spacing={2}>
        {uyeler.map((uye, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper>
              <Button onClick={() => handleDetailsClick(index)} endIcon={<ExpandMoreIcon />}>
                {`${uye.firstName} ${uye.lastName}`}
              </Button>
              <Collapse in={expanded === index}>
                <List style={{ backgroundColor: 'white' }}>
                  <ListItem>
                    <ListItemText primary={`Telefon: ${uye.phoneNumber}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Doğum Tarihi: ${uye.birthDate}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Bel: ${uye.dimensions[0].waist}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Göğüs: ${uye.dimensions[0].chest}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Kilo: ${uye.dimensions[0].weight}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Sağlık Durumu: ${uye.health[0].healthSituation}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Sağlık Problemi: ${uye.health[0].healthProblem}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Ödeme Tarihi: ${uye.payments[0].paymentDate}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Ödeme Miktarı: ${uye.payments[0].paymentAmount}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Yakını Adı: ${uye.relatives[0].name}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Yakını Telefon: ${uye.relatives[0].phoneNumber}`} />
                  </ListItem>
                  {/* Diğer detayları da ekleyin */}
                </List>
              </Collapse>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MevcutUyeler;
