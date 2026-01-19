import bcrypt from 'bcryptjs';
import { getDBConnection } from '../database/db';
import { USER_QUERIES } from '../database/queries';
import users from '../assets/data/users.json';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
  isActive: number;
  createdAt: string;
}
export interface CreateUser {
  name: string;
  email: string;
  password: string;
}
export interface Login {
  email: string;
  password: string;
}

//create user
export const createUser = async (data: CreateUser): Promise<boolean> => {
  try {
    const db = await getDBConnection(); //opens SQLite database connection, required before running any SQL

    const salt = await bcrypt.genSalt(8); //salt is a random string added to the password before hashing.number 10(recommended for mobile) is the salt rounds (cost factor), balanced speed & security
    const hashedPassword = await bcrypt.hash(data.password, salt);

    await db.executeSql(USER_QUERIES.CREATE_USER, [
      data.name,
      data.email,
      hashedPassword,
    ]);
    return true;
  } catch (error) {
    console.log(`Create user error:`, error);
    return false;
  }
};

// CHECK EMAIL EXISTS
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const db = await getDBConnection();
  const result = await db.executeSql(USER_QUERIES.CHECK_EMAIL_EXISTS, [email]);
  return result[0].rows.length > 0;
};

/**
 * Login user - login query returns only one user, First matching row = logged-in user
 * result[0] // matched user(returns array of object)
 * rows.item(0) just returns the already-matched row
 */

export const loginUser = async (data: Login): Promise<User | null> => {
  try {
    const db = await getDBConnection();
    const result = await db.executeSql(USER_QUERIES.LOGIN_USER, [data.email]); //when run this, internally compares(if wrong email only and not password -it is hashed not checks,then row.length ===0 returns null)
    if (result[0]?.rows?.length > 0) {
      const user = result[0]?.rows.item(0) as User; //comparison happens in queries, not here

      // Compare bcrypt hash
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (isMatch) {
        return user; // login success
      }
    }
    return null;
  } catch (error) {
    console.log(`Login error:`, error);
    return null;
  }
};

/**
 * Get user by id
 * ?. → optional chaining(if result[0] exists rows.item(0))
 * ?? - Nullish Coalescing Operator - Evaluate left side: result[0]?.rows.item(0)
 * It returns the value on the left if it is not null or undefined, otherwise it returns the value on the right.
 */
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const db = await getDBConnection();
    const result = await db.executeSql(USER_QUERIES.GET_USER_BY_ID, [id]);
    return result[0]?.rows.item(0) ?? null;
  } catch (error) {
    console.log(`Get user by id error:`, error);
    return null;
  }
};

/**
 * Inser Default users
 * Transcation - speed and safety, without transaction slow on mobil storage
 */

export const insertDefaultUsers = async (): Promise<boolean> => {
  try {
    const db = await getDBConnection();
    const countResult = await db.executeSql(USER_QUERIES.GET_USERS_COUNT);
    const count = countResult[0].rows.item(0).count;
    if (count > 0) {
      console.log('Users already exist ', count);
      return count;
    }
    console.log('count', count);
    //use transcation for efficiency
    await db.transaction(async tx => {
      for (const user of users) {
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        tx.executeSql(USER_QUERIES.INSERT_DEFAULT_USERS, [
          user.name,
          user.email,
          hashedPassword,
          user.role,
        ]);
      }
    });
    console.log('default users added successfully');
    return true;
  } catch (error) {
    console.log('default users error', error);
    return false;
  }
};
