//Database configuration
module.exports = {
  HOST: "rmit.australiaeast.cloudapp.azure.com",
  USER: "s3873756_fwp_a2",
  PASSWORD: "abc123",
  DB: "s3873756_fwp_a2",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
