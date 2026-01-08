import { getDBConnection } from "../database/db";
import { USER_QUERIES } from "../database/queries";

export interface User{
    id: number;
    name: string;
    email:string;
    password:string;
    role:'USER'| 'ADMIN';
    isActive: number;
    createdAt: string;
}
export interface CreateUser{
    name: string;
    email:string;
    password:string;
}
export interface Login{
  email: string;
  password: string;
}

//create user
export const createUser = async(data:CreateUser):Promise<boolean> =>{
    try{
      const db = await getDBConnection();//opens SQLite database connection, required before running any SQL
      await db.executeSql(USER_QUERIES.CREATE_USER,[data.name, data.email,data.password, new Date(). toISOString(),]);
      return true;
    }catch(error){
      console.log(`Create user error:`, error);
      return false;
    }
}


/**
 * Login user - login query returns only one user, First matching row = logged-in user
 * result[0] // matched user(returns array of object)
 * rows.item(0) just returns the already-matched row
 */

export const loginUser = async(data: Login):Promise<User| null> =>{
    try{
        const db = await getDBConnection();
        const result = await db.executeSql(USER_QUERIES.LOGIN_USER,[data.email, data.password]);//when run this, internally compares(if wrong email and password,then row.length ===0 returns null)
        if(result[0]?.rows?.length >0){
            return result[0]?.rows.item(0) as User; //comparison happens in queries, not here
        }
        return null;
    }catch(error){
        console.log(`Login error:`, error);
        return null;
    }
}

/**
 * Get user by id
 * ?. → optional chaining(if result[0] exists rows.item(0))
 * ?? - Nullish Coalescing Operator - Evaluate left side: result[0]?.rows.item(0)
 * It returns the value on the left if it is not null or undefined, otherwise it returns the value on the right.
 */
export const getUserById = async(id: number):Promise<User| null> =>{
    try{
        const db = await getDBConnection();
        const result = await db.executeSql(USER_QUERIES.GET_USER_BY_ID,[id])
        return result[0]?.rows.item(0) ?? null;

    }catch(error){
        console.log(`Get user by id error:`, error);
        return null;
    }
}