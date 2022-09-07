var express = require('express');
var router = express.Router();
const { getModelByTenant } = require('multi-tenant');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', async function (req, res, next) {
  const User = await getModelByTenant({ name: 'User' });
  await User.update(
    {
      username: 'tungduy',
    },
    { username: 'tungduy' },
    { upsert: true }
  );

  res.send('Tao user thanh cong');
});

module.exports = router;
