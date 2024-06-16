import prisma from '../db';

export const getSchulsozialarbeit = async (req, res) => {
  try {
    // Retrieve query parameters
    const { BEZEICHNUNG, STRASSE } = req.query;

    const queryOptions = {
      where: {},
    };

    if (BEZEICHNUNG) {
      queryOptions.where = {
        BEZEICHNUNG: {
          contains: BEZEICHNUNG,
        },
      };
    }
    if (STRASSE) {
      queryOptions.where = {
        STRASSE: {
          contains: STRASSE,
        },
      };
    }

    // Execute the query with Prisma
    const schulsozialarbeit = await prisma.schulsozialarbeit.findMany(
      queryOptions
    );

    // Send the response with the fetched data
    res.json({ count: schulsozialarbeit.length, data: schulsozialarbeit });
  } catch (error) {
    console.log(error);
    // Handle any errors during execution
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the data.' });
  }
};
