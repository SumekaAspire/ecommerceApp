import { getDBConnection } from "./db";

export const createTables = async() =>{
    const db = await getDBConnection();

    //USERS TABLE
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS users(
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         email TEXT UNIQUE NOT NULL,
         password TEXT NOT NULL,
         role TEXT DEFAULT 'USER',
         isActive INTEGER DEFAULT 1,
         createdAt TEXT DEFAULT (datetime('now'))
      );  
   `)
     console.log('User Tables created successfully');

    //ADDRESS TABLE
    await db.executeSql(`
     CREATE TABLE IF NOT EXISTS addresses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        addressLine1 TEXT NOT NULL,
        addressLine2 TEXT,
        houseNo TEXT,
        phone TEXT NOT NULL,
        pincode TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        country TEXT NOT NULL,
        landMark TEXT ,
        isDefault INTEGER DEFAULT 0
     )
    `);
     console.log('Address Tables created successfully');

   
}