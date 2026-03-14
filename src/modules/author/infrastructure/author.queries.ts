export const authorQueries = {
  create: `
    INSERT INTO authors (name, bio)
    VALUES ($1, $2)
    RETURNING id, name, bio, created_at
  `,
  findById: `
SELECT
a.id,
a.name,
a.bio,
a.created_at, 
b.id as book_id,
b.title AS book_title,
b.isbn AS book_isbn,
b.price AS book_price,
b.stock AS book_stock,
b.published_date AS book_published_date

FROM authors a
LEFT JOIN books b ON b.author_id = a.id 
WHERE a.id = $1
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
