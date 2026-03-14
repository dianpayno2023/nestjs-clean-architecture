export const booksQueries = {
  create: `
    INSERT INTO books (title, author_id, isbn, price, stock, published_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING 
    id, 
    title, 
    author_id, 
    isbn, 
    price, 
    stock, 
    published_date, 
    created_at
  `,
  findById: `
    SELECT 
    b.id, 
    b.title, 
    b.isbn, 
    b.price, 
    b.stock, 
    b.published_date, 
    b.created_at,
    a.id AS author_id,
    a.name AS author_name,
    a.bio AS author_bio
    FROM books b
    JOIN authors a ON a.id = b.author_id
    WHERE b.id = $1
    LIMIT 1
  `,
  update: `
    UPDATE books
    SET title = $1, author_id = $2, isbn = $3, price = $4, stock = $5, published_date = $6
    WHERE id = $7
    RETURNING id, title, author_id, isbn, price, stock, published_date, created_at
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
    published_date,
    created_at
`,
  baseSelect: `
    SELECT 
    b.id, 
    b.title, 
    b.isbn, 
    b.price, 
    b.stock, 
    b.published_date, 
    b.created_at,
    a.id AS author_id,
    a.name AS author_name,
    a.bio AS author_bio
    FROM books b 
    JOIN authors a ON a.id = b.author_id
  `,
  baseCount: `
    SELECT COUNT(*)::text AS total
    FROM books b
  `,
  searchByTitle: `
    title ILIKE $1
  `,
  filterByAuthor: `author_id = $1`,
  filterbyMinPrice: `b.price >= $1`,
  filterByMaxPrice: `b.price <= $1`,

  orderByNewest: `
    ORDER BY b.created_at DESC
  `,



};
