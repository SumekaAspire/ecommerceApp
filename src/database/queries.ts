export const USER_QUERIES ={
    //INSERT - create(signup - user clicks signup, creates a new row into users) ?- placeholders
    CREATE_USER:`INSERT INTO users(name, email, password, createdAt) VALUES(?,?,?,?):`,
    //SELECT - login
    LOGIN_USER:`SELECT * FROM users WHERE email = ? AND password = ? AND isActive = 1; `,
    //Fetch user 
    GET_USER_BY_ID:`SELECT * FROM users WHERE id =?;`,
    //update - soft delete/ deactivate
    // DEACTIVATE_USER:`UPDATE users SET isActive = 0 WHERE id = ?;`,
}