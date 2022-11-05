const mongo = {
    db: {
        database: 'ecommerce',
        uri: process.env.MONGO_DB_URI
    }
};

const files = {
    route: 'db/files',
};
  
export { mongo, files };