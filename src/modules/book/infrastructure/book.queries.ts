export const booksQueries = {
  create: `
    INSERT INTO books (title, author_id, isbn, price, stock, publish_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING 
    id, 
    title, 
    author_id, 
    isbn, 
    price, 
    stock, 
    publish_date, 
    created_at
  `,
  findById: `
    SELECT 
    b.id, 
    b.title, 
    b.isbn, 
    b.price, 
    b.stock, 
    b.publish_date, 
    b.created_at
    a.id AS author_id,
    a.name AS author_name
    a.bio AS author_bio
    FROM books b
    JOIN authors a ON a.id = b.author_id
    WHERE b.id = $1
    LIMIT 1
  `,

  baseSelect: `
    SELECT b.id, b.title, b.isbn, b.price, b.stock, b.publish_date, b.created_at,
    a.id AS author_id
    a.name AS author_name
    a.bio AS author_bio
    FROM books b
    JOIN authors a ON a.id = b.author_id
  `,
  update: `
    UPDATE books
    SET title = $1, author_id = $2, isbn = $3, price = $4, stock = $5, publish_date = $6
    WHERE id = $7
    RETURNING id, title, author_id, isbn, price, stock, publish_date, created_at
  `,
  delete: `
  DELETE FROM books
  WHERE id = $1
  RETURNING 
    id,
    title,
    author_id,
    isbn,
    price,
    stock,
    publish_date,
    created_at
`,


  baseCount: `
    SELECT COUNT(*)::text AS total
    FROM books
  `,
  searchByTitle: `
    title ILIKE $1
  `,
  orderByNewest: `
    ORDER BY created_at DESC
  `,



};
