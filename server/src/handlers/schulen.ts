import prisma from '../db';

// export const getOneSchule = async (req, res) => {
//   const update = await prisma.update.findUnique({
//     where: {
//       id: req.params.id,
//     },
//   });

//   res.json({ data: update });
// };

export const getSchulen = async (req, res) => {
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
    const schulen = await prisma.schule.findMany(queryOptions);

    // Send the response with the fetched data
    res.json({ count: schulen.length, data: schulen });
  } catch (error) {
    console.log(error);
    // Handle any errors during execution
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the data.' });
  }
};

// export const createUpdate = async (req, res) => {

//   const product = await prisma.product.findUnique({
//     where: {
//       id: req.body.productId
//     }
//   })

//   if (!product) {
//     // does not belong to user
//     return res.json({message: 'nope'})
//   }

//   const update = await prisma.update.create({
//     data: {
//       title: req.body.title,
//       body: req.body.body,
//       product: {connect: {id: product.id}}
//     }
//   })

//   res.json({data: update})
// }

// export const updateUpdate = async (req, res) => {
//   const products = await prisma.product.findMany({
//     where: {
//       belongsToId: req.user.id,
//     },
//     include: {
//       updates: true
//     }
//   })

//   const updates = products.reduce((allUpdates, product) => {
//     return [...allUpdates, ...product.updates]
//   }, [])

//   const match = updates.find(update => update.id === req.params.id)

//   if (!match) {
//     // handle this
//     return res.json({message: 'nope'})
//   }

//   const updatedUpdate = await prisma.update.update({
//     where: {
//       id: req.params.id
//     },
//     data: req.body
//   })

//   res.json({data: updatedUpdate})
// }

// export const deleteUpdate = async (req, res) => {
//   const products = await prisma.product.findMany({
//     where: {
//       belongsToId: req.user.id,
//     },
//     include: {
//       updates: true
//     }
//   })

//   const updates = products.reduce((allUpdates, product) => {
//     return [...allUpdates, ...product.updates]
//   }, [])

//   const match = updates.find(update => update.id === req.params.id)

//   if (!match) {
//     // handle this
//     return res.json({message: 'nope'})
//   }

//   const deleted = await prisma.update.delete({
//     where: {
//       id: req.params.id
//     }
//   })

//   res.json({data: deleted})
// }
