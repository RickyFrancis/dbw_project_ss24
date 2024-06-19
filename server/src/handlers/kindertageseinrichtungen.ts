import prisma from '../db';

export const getKindertageseinrichtungen = async (req, res) => {
  try {
    // Execute the query with Prisma
    const kindertageseinrichtungen =
      await prisma.kindertageseinrichtung.findMany();

    // Send the response with the fetched data
    return res.status(200).json({
      count: kindertageseinrichtungen.length,
      data: kindertageseinrichtungen,
    });
  } catch (error) {
    console.log(error);
    // Handle any errors during execution
    return res
      .status(500)
      .json({ error: 'An error occurred while retrieving the data.' });
  }
};
