var express = require('express');
var router = express.Router();
const { getModelByTenant } = require('multi-tenant');
const { startSession } = require('mongoose');

const userId = '63035611244b7903c27ff581';
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ping', function (req, res, next) {
  res.json({ message: 'Server is running on router ping 1...' });
});

router.get('/checkout', async (req, res, next) => {
  console.log('-------------------');
  const dbConnection = await global.clientConnection;

  const session = await dbConnection.startSession();

  try {
    session.startTransaction();
    const Order = await getModelByTenant({ name: 'Order' });
    const Wallet = await getModelByTenant({ name: 'Wallet' });

    const myWallet = await Wallet.findOne({
      userId,
    });
    console.log(
      '🚀 ~ file: index.js ~ line 26 ~ router.get ~ myWallet',
      myWallet
    );
    await Wallet.update(
      { userId },
      { amount: myWallet.amount - 10 },
      { session }
    );
    // if (userId) {
    //   console.log(
    //     '🚀 ~ file: index.js ~ line 36 ~ router.get ~ userId',
    //     userId
    //   );

    //   throw new Error("I'm a bad programmer");
    // }
    await Order.update({ userId }, { status: 'da-thanh-toan' }, { session });
    await session.commitTransaction();
    res.send('Da thanh toan thanh cong gio hang');
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 13 ~ router.get ~ error', error);
    await session.abortTransaction();
    next(error);
  }
  session.endSession();
});

router.get('/order/create', async function (req, res, next) {
  const Order = await getModelByTenant({ name: 'Order' });
  await Order.update(
    { userId },
    {
      name: 'Order 1',
      userId,
      status: 'chua-thanh-toan',
    },
    { upsert: true }
  );
  res.send('Order created');
});

router.get('/wallet/create', async function (req, res, next) {
  const Wallet = await getModelByTenant({ name: 'Wallet' });
  await Wallet.update(
    {
      userId,
    },
    {
      amount: 100,
    },
    { upsert: true }
  );
  res.send('Wallet created');
});

module.exports = router;
