import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { format } from 'date-fns';
import { join } from 'path';
import { JsonArray } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function saveDataToFile(data: any) {
  const currentDate = format(new Date(), 'yyyyMMdd_HHmmss');
  const directory = join(__dirname, '..', 'data');
  const filename = `schulen_${currentDate}.json`;
  const fullPath = join(directory, filename);

  try {
    await writeFile(fullPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Data successfully saved to file ${fullPath}`);
  } catch (error) {
    console.error(`Failed to write data to file at ${fullPath}:`, error);
  }
}

async function fetchNominatimData(schule: any) {
  //   const url = `https://nominatim.openstreetmap.org/search?street=${schule.STRASSE}&format=json&addressdetails=1&limit=1&polygon_svg=1&postalcode=${schule.PLZ}&city=${schule.ORT}`;
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${schule.geometry.y}&lon=${schule.geometry.x}&format=json&polygon_svg=1`;

  console.log('Fetching', url);
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching Nominatim data for ${schule.attributes.BEZEICHNUNG}:`
      //   error
    );
    return null; // Return null to handle errors gracefully
  }
}

async function fetchDataAndUpsert() {
  try {
    const response = await axios.get(process.env.SCHULE_API_URL);
    await saveDataToFile(response.data);
    const features = response.data.features;

    // First fetch all the necessary data
    const nominatimPromises = features.map((feature) =>
      fetchNominatimData(feature)
    );
    const nominatimResults = await Promise.all(nominatimPromises);

    // Now build the upsert operations
    const upsertOperations = features.map((feature, index) => {
      return prisma.schule.upsert({
        where: {
          API_OBJECTID: feature.attributes.OBJECTID,
          API_ID: feature.attributes.ID,
        },
        update: {
          TYP: feature.attributes.TYP,
          ART: feature.attributes.ART,
          STANDORTTYP: feature.attributes.STANDORTTYP,
          BEZEICHNUNG: feature.attributes.BEZEICHNUNG,
          BEZEICHNUNGZUSATZ: feature.attributes.BEZEICHNUNGZUSATZ,
          KURZBEZEICHNUNG: feature.attributes.KURZBEZEICHNUNG,
          STRASSE: feature.attributes.STRASSE,
          PLZ: feature.attributes.PLZ,
          ORT: feature.attributes.ORT,
          TELEFON: feature.attributes.TELEFON,
          FAX: feature.attributes.FAX,
          EMAIL: feature.attributes.EMAIL,
          PROFILE: feature.attributes.PROFILE,
          SPRACHEN: feature.attributes.SPRACHEN,
          WWW: feature.attributes.WWW,
          TRAEGER: feature.attributes.TRAEGER,
          TRAEGERTYP: feature.attributes.TRAEGERTYP,
          BEZUGNR: feature.attributes.BEZUGNR,
          GEBIETSARTNUMMER: feature.attributes.GEBIETSARTNUMMER,
          SNUMMER: feature.attributes.SNUMMER,
          NUMMER: feature.attributes.NUMMER,
          GlobalID: feature.attributes.GlobalID,
          CreationDate: new Date(feature.attributes.CreationDate),
          Creator: feature.attributes.Creator,
          EditDate: new Date(feature.attributes.EditDate),
          Editor: feature.attributes.Editor,
          x: feature.geometry.x,
          y: feature.geometry.y,
          nominatim: nominatimResults[index], // Store the Nominatim JSON response
        },
        create: {
          API_OBJECTID: feature.attributes.OBJECTID,
          API_ID: feature.attributes.ID,
          TYP: feature.attributes.TYP,
          ART: feature.attributes.ART,
          STANDORTTYP: feature.attributes.STANDORTTYP,
          BEZEICHNUNG: feature.attributes.BEZEICHNUNG,
          BEZEICHNUNGZUSATZ: feature.attributes.BEZEICHNUNGZUSATZ,
          KURZBEZEICHNUNG: feature.attributes.KURZBEZEICHNUNG,
          STRASSE: feature.attributes.STRASSE,
          PLZ: feature.attributes.PLZ,
          ORT: feature.attributes.ORT,
          TELEFON: feature.attributes.TELEFON,
          FAX: feature.attributes.FAX,
          EMAIL: feature.attributes.EMAIL,
          PROFILE: feature.attributes.PROFILE,
          SPRACHEN: feature.attributes.SPRACHEN,
          WWW: feature.attributes.WWW,
          TRAEGER: feature.attributes.TRAEGER,
          TRAEGERTYP: feature.attributes.TRAEGERTYP,
          BEZUGNR: feature.attributes.BEZUGNR,
          GEBIETSARTNUMMER: feature.attributes.GEBIETSARTNUMMER,
          SNUMMER: feature.attributes.SNUMMER,
          NUMMER: feature.attributes.NUMMER,
          GlobalID: feature.attributes.GlobalID,
          CreationDate: new Date(feature.attributes.CreationDate),
          Creator: feature.attributes.Creator,
          EditDate: new Date(feature.attributes.EditDate),
          Editor: feature.attributes.Editor,
          x: feature.geometry.x,
          y: feature.geometry.y,
          nominatim: nominatimResults[index], // Store the Nominatim JSON response
        },
      });
    });

    // Execute all upserts within a transaction
    await prisma.$transaction(upsertOperations);
    console.log('Schule data upserted successfully.');
  } catch (error) {
    console.error('Error fetching or upserting data:', error);
  }
}

// Run the function
fetchDataAndUpsert();
