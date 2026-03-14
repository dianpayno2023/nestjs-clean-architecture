export const userQueries = {
  create: `
    INSERT INTO users (email, password, full_name, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, full_name, role, created_at
  `,
  findByEmail: `
    SELECT id, email, password, full_name, role, created_at
    FROM users
    WHERE email = $1
    LIMIT 1
  `,
};
