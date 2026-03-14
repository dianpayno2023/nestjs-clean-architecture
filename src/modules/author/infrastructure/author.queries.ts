export const authorQueries = {
    create: `
    INSERT INTO authors (name, bio)
    VALUES ($1, $2)
    RETURNING id, name, bio, created_at
  `,
    findById: `
    SELECT id, name, bio, created_at
    FROM authors
    WHERE id = $1
    LIMIT 1
  `,
    update: `
    UPDATE authors
    SET name = $1, bio = $2
    WHERE id = $3
    RETURNING id, name, bio, created_at
  `,
    delete: `
    DELETE FROM authors
    WHERE id = $1
    RETURNING id, name, bio, created_at
  `,

    baseSelect: `
    SELECT id, name, bio, created_at
    FROM authors
  `,
    baseCount: `
    SELECT COUNT(*)::text AS total
    FROM authors
  `,
    searchByName: `
    name ILIKE $1
  `,
    orderByNewest: `
    ORDER BY created_at DESC
  `,

};
