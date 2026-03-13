export const userQueries = {
  create: `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING id, name, email, created_at
  `,
  
  findAll: `
    SELECT id, name, email, created_at
    FROM users
    ORDER BY id DESC
  `,
};

