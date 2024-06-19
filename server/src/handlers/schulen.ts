import prisma from '../db';

export const getSchulen = async (req, res) => {
  try {
    // Execute the query with Prisma
    const schulen = await prisma.schule.findMany();

    // Send the response with the fetched data
    return res.status(200).json({ count: schulen.length, data: schulen });
  } catch (error) {
    console.log(error);
    // Handle any errors during execution
    return res
      .status(500)
      .json({ error: 'An error occurred while retrieving the data.' });
  }
};
