import prisma from '../db';

export const getJugendberufshilfen = async (req, res) => {
  try {
    // Execute the query with Prisma
    const jugendberufshilfe = await prisma.jugendberufshilfe.findMany();

    // Send the response with the fetched data
    return res
      .status(200)
      .json({ count: jugendberufshilfe.length, data: jugendberufshilfe });
  } catch (error) {
    console.log(error);
    // Handle any errors during execution
    return res
      .status(500)
      .json({ error: 'An error occurred while retrieving the data.' });
  }
};
