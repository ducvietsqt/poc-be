const Model = require("app/model").users;
const data = [
  {
    user_name: 'User A',
    address: '0x8B9Df472d81EE6010C9C2d093e2c6b3f7bD6EfEf',
    private_key: '0a94a08c124d40b1eb329f2137f316e3bb6749aa8255391f4df94e2af0eb8007'
  },
  {
    user_name: 'User B',
    address: '0x4D8e6e6E0a02B32555047c91708c179177369b05',
    private_key: 'f833d4de41ea560d3e239e64afa3a4f703aa666d1d75ebbf6080334bc362d5b9'
  },
  {
    user_name: 'User C',
    address: '0x6c01eB96c7bf59eABa757f67C91Ff69837A18258',
    private_key: '7063932caba924ab788973554d74ebe91348c8a8c8d1bd6f5740517cda6c8c8a'
  },
  {
    user_name: 'User D',
    address: '0x7aac55A07792F93205FD14cbaf14407a8f327F96',
    private_key: '66b7590a50dfdd4eaedf5d995510bc8d4edd8ca97dc69a2657ff0d379a9dddd9'
  }
]

module.exports = async () => {
  let count = await Model.count();
  if (count == 0) {
    await Model.bulkCreate(data, {
      returning: true
    });
  }
};