import { AuthorInterface } from "src/modules/author/interfaces"

export interface BookInterface {
    id: string
    title: string
    author_id: string
    isbn: string
    price: number
    stock: number
    publish_date?: Date
    created_at: Date
    author: AuthorInterface
}
