import SQLite from 'react-native-sqlite-storage'

SQLite.DEBUG(true);//library logs all sql queries and database operations to the console(for development)
SQLite.enablePromise(true);//Enables promise-based APIs for SQLite operations.Allows us to use async/await instead of callbacks


/**
 * getDBConnection file
 * @returns OpenDatabase
 */
export const getDBConnection= async() =>{
    try{
     const db = await SQLite.openDatabase({
        name:'ecommerceApp.db', //database file name
        location:'default', // stored in app's default storage
     })
     console.log('Database opened sucessfully');
     return db;
    }catch(error){
        console.error('Error opening database:', error);
        throw error;
    }
}

