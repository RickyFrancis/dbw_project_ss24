import AddRoadIcon from '@mui/icons-material/AddRoad';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FaxIcon from '@mui/icons-material/Fax';
import PhoneIcon from '@mui/icons-material/LocalPhone';
import PostalCodeIcon from '@mui/icons-material/MarkunreadMailbox';
import WWWIcon from '@mui/icons-material/Language';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Schule } from '../types';
import getIcon from '../utils/getIcon';
import linkifyStr from 'linkify-string';

interface SchuleMarkerProps {
  schule: Schule;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SchuleMapMarker = ({ schule }: SchuleMarkerProps) => {
  const excludeProperties = [
    'id',
    'API_ID',
    'API_OBJECTID',
    'BEZEICHNUNG',
    'STRASSE',
    'PLZ',
    'ORT',
    'TELEFON',
    'FAX',
    'EMAIL',
    'WWW',
    'KURZBEZEICHNUNG',
    'ART',
  ];
  const schuleProperties = Object.entries(schule)
    .filter(
      ([key, value]) => value !== null && !excludeProperties.includes(key)
    )
    .map(([key, value]) => ({
      name: key,
      value: value,
    }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const getNominatimData = async () => {
  //   const response = await fetch(
  //     `https://nominatim.openstreetmap.org/search?street=${schule.STRASSE}&format=json&addressdetails=1&limit=1&polygon_svg=1&postalcode=${schule.PLZ}&city=${schule.ORT}`,
  //     { mode: 'no-cors' }
  //   );
  //   const data = await response.json();
  //   return data;
  // };

  // useEffect(() => {
  //   getNominatimData();
  // }, []);

  return (
    <Marker
      position={[schule.y, schule.x]}
      icon={getIcon('schule_2_64', [30, 30])}
    >
      <Popup>
        <Card elevation={0} sx={{ minWidth: '100%' }}>
          <CardHeader
            title={schule.KURZBEZEICHNUNG}
            subheader={schule.ART}
            sx={{
              p: 0,
            }}
          />

          <CardContent
            sx={{
              p: 0,
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <List
                  sx={{
                    flexWrap: 'wrap',
                  }}
                >
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <AddRoadIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="BEZEICHNUNG"
                      secondary={schule.BEZEICHNUNG}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <AddRoadIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="STRASSE"
                      secondary={schule.STRASSE}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <AddRoadIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="PLZ"
                      secondary={schule.PLZ}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <AddRoadIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="ORT"
                      secondary={schule.ORT}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>

                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <PhoneIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Phone"
                      secondary={
                        <a href={`tel:${schule.TELEFON}`}>{schule.TELEFON}</a>
                      }
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <FaxIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="FAX"
                      secondary={schule.FAX}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <EmailIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email"
                      secondary={
                        <a href={`mailto:${schule.EMAIL}`}>{schule.EMAIL}</a>
                      }
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: '-1rem' }}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <WWWIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Website"
                      secondary={
                        <a
                          href={`http://${schule.WWW}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {schule.WWW}
                        </a>
                      }
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }}
                      secondaryTypographyProps={{
                        sx: { fontSize: '0.8rem', textWrap: 'wrap' },
                      }}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{
              p: 0,
            }}
          >
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className="more-info-card">
              <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={0}
              >
                {schuleProperties.map((property) => (
                  <div>
                    <Typography variant="overline" color="text.secondary">
                      {property.name}
                    </Typography>{' '}
                    &nbsp;
                    <Typography variant="caption">{property.value}</Typography>
                  </div>
                ))}
              </Stack>
            </CardContent>
          </Collapse>
        </Card>
      </Popup>
    </Marker>
  );
};

export default SchuleMapMarker;
