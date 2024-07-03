import { Address, User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, UpdateAddressRequest, toAddressResponse } from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { prismaClient } from "../application/database";
import { ContactService } from "./contact-service";
import { ResponseError } from "../error/response-error";


export class AddressService {
    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        const createAddressRequest = Validation.validate(AddressValidation.CREATE, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)

        const address = await prismaClient.address.create({
            data: createAddressRequest
        })

        return toAddressResponse(address)
    }

    static async checkAddressMustExist(contact_id: number, address_id: number): Promise<Address> {
        const address = await prismaClient.address.findUnique({
            where: {
                address_id: address_id,
                contact_id: contact_id
            }
        })

        if(!address) {
            throw new ResponseError(404, "address is not found")
        }

        return address
    }

    static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        const getAddressRequest = Validation.validate(AddressValidation.GET, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)

        const address = await this.checkAddressMustExist(getAddressRequest.contact_id, getAddressRequest.address_id)

        return toAddressResponse(address)
    }

    static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        const updateAddressRequest = Validation.validate(AddressValidation.UPDATE, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)
        await this.checkAddressMustExist(updateAddressRequest.contact_id, updateAddressRequest.address_id)

        const address = await prismaClient.address.update({
            where: {
                address_id: updateAddressRequest.address_id,
                contact_id: updateAddressRequest.contact_id
            },
            data: updateAddressRequest
        })

        return toAddressResponse(address)
    }

    static async remove(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
        const removeAddressRequest = Validation.validate(AddressValidation.REMOVE, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)
        await this.checkAddressMustExist(removeAddressRequest.contact_id, removeAddressRequest.address_id)

        const address = await prismaClient.address.delete({
            where: {
                address_id: removeAddressRequest.address_id,
            }
        })

        return toAddressResponse(address)
    }

    static async list(user: User, contact_id: number): Promise <Array<AddressResponse>> {
        await ContactService.checkContactMustExist(user.username, contact_id)

        const address = await prismaClient.address.findMany({
            where: {
                contact_id: contact_id
            }
        })

        return address.map((address) => toAddressResponse(address))
    }
}