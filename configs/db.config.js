module.exports = {
    mssql: {
      HOST: "192.168.1.139",
      PORT: "1433",
      USER: "sa",
      PASSWORD: "123",
      DB: "noteXcode",
      dialect: "mssql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      dialectOptions: {
        instanceName: 'sepid',
      }
  
    },
    //  mssql87: {
    //   HOST: "87.248.153.90",
    //   PORT: "1433",
    //   USER: "sa",
    //   PASSWORD: "ZwkhA6kkpBY9eASSd0",
    //   DB: "sale30ty",
    //   dialect: "mssql",
    //   pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    //   },
    //   dialectOptions: {
    //     instanceName: '',
    //   }
    // }
  }