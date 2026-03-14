import { BookInterface } from "src/modules/book/interfaces"

export interface AuthorInterface {
    id: string
    name: string
    bio?: string
    created_at: Date
    books?: BookInterface[]
}