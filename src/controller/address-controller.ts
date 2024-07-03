import { Request, Response, NextFunction } from "express";
import { CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, UpdateAddressRequest } from "../model/address-model";
import { AddressService } from "../service/address-service";
import { UserRequest } from "../type/user-request";
import { logger } from "../application/logging";


export class AddressController {

    static async createAddress(req: UserRequest, res: Response, next: NextFunction) {

        try {
            const request: CreateAddressRequest = req.body as CreateAddressRequest
            request.contact_id = Number(req.params.contactId)
            const response = await AddressService.create(req.user!, request)
            logger.debug("response :" + JSON.stringify(response))
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAddress(req: UserRequest, res: Response, next: NextFunction) {

        try {
            const request: GetAddressRequest = {
                address_id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            }

            const response = await AddressService.get(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateAddress(req: UserRequest, res: Response, next: NextFunction) {

        try {
            const request: UpdateAddressRequest = req.body as UpdateAddressRequest
            request.contact_id = Number(req.params.contactId)
            request.address_id = Number(req.params.addressId)
            const response = await AddressService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async removeAddress(req: UserRequest, res: Response, next: NextFunction) {

        try {
            const request: RemoveAddressRequest = {
                address_id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId)
            }
            await AddressService.remove(req.user!, request)
            res.status(200).json({
                data: "Remove Address Success!"
            })
        } catch (error) {
            next(error)
        }
    }

    static async listAddress(req: UserRequest, res: Response, next: NextFunction) {

        try {
            const contact_id = Number(req.params.contactId)
            const response = await AddressService.list(req.user!, contact_id)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}