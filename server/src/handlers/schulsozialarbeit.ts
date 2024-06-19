import prisma from '../db';

export const getSchulsozialarbeit = async (req, res) => {
  try {
    // Execute the query with Prisma
    const schulsozialarbeit = await prisma.schulsozialarbeit.findMany();

    // Send the response with the fetched data
    return res
      .status(200)
      .json({ count: schulsozialarbeit.length, data: schulsozialarbeit });
  } catch (error) {
    console.log(error);
    // Handle any errors during execution
    return res
      .status(500)
      .json({ error: 'An error occurred while retrieving the data.' });
  }
};
