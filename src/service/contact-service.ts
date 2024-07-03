import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, SearchContactRequest, UpdateContactRequest, toContactResponse } from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";


export class ContactService {
    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        const createContactRequest = Validation.validate(ContactValidation.CREATE, request)

        const record = {
            ...createContactRequest,
            ...{username: user.username}
        }

        const contact = await prismaClient.contact.create({
            data: record
        })

        // logger.debug("record :" + JSON.stringify(contact))
        return toContactResponse(contact)
    }

    static async checkContactMustExist(username: string, contact_id: number): Promise<Contact> {
        const contact = await prismaClient.contact.findUnique({
            where: {
                contact_id: contact_id,
                username: username
            }
        })

        if(!contact) {
            throw new ResponseError(404, "Contact has not found")
        }

        return contact;
    }

    static async get(user: User, contact_id: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustExist(user.username, contact_id)

        return toContactResponse(contact)
    }

    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
        const updateContactRequest = Validation.validate(ContactValidation.UPDATE, request)
        await this.checkContactMustExist(user.username, updateContactRequest.contact_id)

        const contact = await prismaClient.contact.update({
            where: {
                contact_id: updateContactRequest.contact_id,
                username: user.username
            }, 
            data : updateContactRequest
        })

        return toContactResponse(contact)
    }

    static async remove(user: User, contact_id: number): Promise<ContactResponse> {
        await this.checkContactMustExist(user.username, contact_id)

        const contact = await prismaClient.contact.delete({
            where: {
                contact_id: contact_id,
                username: user.username
            }
        })

        return toContactResponse(contact)
    }

    static async search(user: User, request: SearchContactRequest): Promise<Pageable<ContactResponse>> {
        const searchRequest = Validation.validate(ContactValidation.SEARCH, request)
        const skip = (searchRequest.page - 1) * searchRequest.size
        
        const filters = []
        //check if name exists
        if(searchRequest.name) {
            filters.push({
                OR: [
                    {
                        first_name:{ 
                            contains: searchRequest.name
                        }
                    },
                    {
                        last_name: {
                            contains: searchRequest.name
                        }
                    }
                ]
            })
        }
        //check if email exists
        if(searchRequest.email) {
            filters.push({
                email: {
                    contains: searchRequest.email
                }
            })
        }
        //check if phone exists
        if(searchRequest.phone) {
            filters.push({
                phone: {
                    contains: searchRequest.phone
                }
            })
        }

        const contact = await prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        })

        const total = await prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters
            }
        })

        return {
            data: contact.map(contact => toContactResponse(contact)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }
}