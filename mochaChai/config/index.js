module.exports = {
  dbConfig : {
      uri : 'mongodb://localhost/mochaChai',
      options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          autoIndex: false, // Don't build indexes

      }
  }
};