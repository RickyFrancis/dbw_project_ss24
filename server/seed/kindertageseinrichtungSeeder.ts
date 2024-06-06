import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { format } from 'date-fns';
import { join } from 'path';

const prisma = new PrismaClient();

async function saveDataToFile(data: any) {
  const currentDate = format(new Date(), 'yyyyMMdd_HHmmss');
  const directory = join(__dirname, '..', 'data');
  const filename = `kindertageseinrichtungen_${currentDate}.json`;
  const fullPath = join(directory, filename); // Construct the full file path

  try {
    await writeFile(fullPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Data successfully saved to file ${fullPath}`);
  } catch (error) {
    console.error(`Failed to write data to file at ${fullPath}:`, error);
  }
}

async function fetchDataAndUpsert() {
  try {
    const response = await axios.get(
      process.env.KINDERTAGESEINRICHTUNG_API_URL
    );
    saveDataToFile(response.data);
    const features = response.data.features;

    await prisma.$transaction(
      features.map((feature) => {
        return prisma.kindertageseinrichtung.upsert({
          where: {
            API_OBJECTID: feature.attributes.OBJECTID,
            API_ID: feature.attributes.ID,
          },
          update: {
            TRAEGER: feature.attributes.TRAEGER,
            BEZEICHNUNG: feature.attributes.BEZEICHNUNG,
            KURZBEZEICHNUNG: feature.attributes.KURZBEZEICHNUNG,
            STRASSE: feature.attributes.STRASSE,
            STRSCHL: feature.attributes.STRSCHL,
            HAUSBEZ: feature.attributes.HAUSBEZ,
            PLZ: feature.attributes.PLZ,
            ORT: feature.attributes.ORT,
            HORT: feature.attributes.HORT,
            KITA: feature.attributes.KITA,
            URL: feature.attributes.URL,
            TELEFON: feature.attributes.TELEFON,
            FAX: feature.attributes.FAX,
            EMAIL: feature.attributes.EMAIL,
            BARRIEREFREI: feature.attributes.BARRIEREFREI,
            INTEGRATIV: feature.attributes.INTEGRATIV,
            x: feature.geometry.x,
            y: feature.geometry.y,
          },
          create: {
            API_OBJECTID: feature.attributes.OBJECTID,
            API_ID: feature.attributes.ID,
            TRAEGER: feature.attributes.TRAEGER,
            BEZEICHNUNG: feature.attributes.BEZEICHNUNG,
            KURZBEZEICHNUNG: feature.attributes.KURZBEZEICHNUNG,
            STRASSE: feature.attributes.STRASSE,
            STRSCHL: feature.attributes.STRSCHL,
            HAUSBEZ: feature.attributes.HAUSBEZ,
            PLZ: feature.attributes.PLZ,
            ORT: feature.attributes.ORT,
            HORT: feature.attributes.HORT,
            KITA: feature.attributes.KITA,
            URL: feature.attributes.URL,
            TELEFON: feature.attributes.TELEFON,
            FAX: feature.attributes.FAX,
            EMAIL: feature.attributes.EMAIL,
            BARRIEREFREI: feature.attributes.BARRIEREFREI,
            INTEGRATIV: feature.attributes.INTEGRATIV,
            x: feature.geometry.x,
            y: feature.geometry.y,
          },
        });
      })
    );

    console.log('Kindertageseinrichtung Data upserted successfully.');
  } catch (error) {
    console.error('Error fetching or upserting data:', error);
  }
}

// Run the function
fetchDataAndUpsert();
