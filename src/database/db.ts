import SQLite from 'react-native-sqlite-storage'

SQLite.DEBUG(true);//library logs all sql queries and database operations to the console(for development)
SQLite.enablePromise(true);//Enables promise-based APIs for SQLite operations.Allows us to use async/await instead of callbacks

//for optimization not to open db multiple times
let dbInstance: SQLite.SQLiteDatabase | null = null;

/**
 * getDBConnection file
 * @returns OpenDatabase
 */
export const getDBConnection= async() =>{
    try{
     // If DB is already open, return the same instance
     if (dbInstance) return dbInstance;   
        dbInstance = await SQLite.openDatabase({
        name:'ecommerceApp.db', //database file name
        location:'default', // stored in app's default storage
     })
     console.log('Database opened sucessfully');
     return dbInstance;
    }catch(error){
        console.error('Error opening database:', error);
        throw error;
    }
}

