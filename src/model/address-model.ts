import { Address } from "@prisma/client"


export type AddressResponse = {
    address_id: number
    street?: string | null
    city?: string | null
    province?: string | null
    country: string
    postal_code: string
}

export type CreateAddressRequest = {
    contact_id: number
    street?: string
    city?: string
    province?: string
    country: string
    postal_code: string
}

export type GetAddressRequest = {
    contact_id: number
    address_id: number
}

export type UpdateAddressRequest = {
    contact_id: number
    address_id: number
    street?: string
    city?: string
    province?: string
    country: string
    postal_code: string
}

export type RemoveAddressRequest = GetAddressRequest

export function toAddressResponse(address: Address): AddressResponse {
    return {
        address_id: address.address_id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code
    }
}