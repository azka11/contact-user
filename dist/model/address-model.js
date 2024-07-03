"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAddressResponse = void 0;
function toAddressResponse(address) {
    return {
        address_id: address.address_id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code
    };
}
exports.toAddressResponse = toAddressResponse;
