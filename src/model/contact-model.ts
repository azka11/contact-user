import { Contact } from "@prisma/client"


export type ContactResponse = {
    contact_id: number
    first_name: string
    last_name?: string | null
    email?: string | null
    phone?: string | null
}

export type CreateContactRequest = {
    first_name: string
    last_name?: string
    email?: string
    phone?: string
}

export type UpdateContactRequest = {
    contact_id: number
    first_name: string
    last_name?: string
    email?: string
    phone?: string
}

export type SearchContactRequest = {
    name?: string
    email?: string
    phone?: string
    page: number
    size: number
}

export function toContactResponse(contact: Contact): ContactResponse {
    return {
        contact_id: contact.contact_id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone
    }
}