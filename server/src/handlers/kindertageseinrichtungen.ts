import prisma from '../db';

export const getKindertageseinrichtungen = async (req, res) => {
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
    const kindertageseinrichtungen =
      await prisma.kindertageseinrichtung.findMany(queryOptions);

    // Send the response with the fetched data
    res.json({ data: kindertageseinrichtungen });
  } catch (error) {
    console.log(error);
    // Handle any errors during execution
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the data.' });
  }
};
