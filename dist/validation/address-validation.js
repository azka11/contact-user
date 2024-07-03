"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidation = void 0;
const zod_1 = require("zod");
class AddressValidation {
}
exports.AddressValidation = AddressValidation;
_a = AddressValidation;
AddressValidation.CREATE = zod_1.z.object({
    contact_id: zod_1.z.number().positive(),
    street: zod_1.z.string().min(1).max(255).optional(),
    city: zod_1.z.string().min(1).max(100).optional(),
    province: zod_1.z.string().min(1).max(100).optional(),
    country: zod_1.z.string().min(1).max(100),
    postal_code: zod_1.z.string().min(1).max(10)
});
AddressValidation.GET = zod_1.z.object({
    contact_id: zod_1.z.number().positive(),
    address_id: zod_1.z.number().positive()
});
AddressValidation.UPDATE = zod_1.z.object({
    contact_id: zod_1.z.number().positive(),
    address_id: zod_1.z.number().positive(),
    street: zod_1.z.string().min(1).max(255).optional(),
    city: zod_1.z.string().min(1).max(100).optional(),
    province: zod_1.z.string().min(1).max(100).optional(),
    country: zod_1.z.string().min(1).max(100),
    postal_code: zod_1.z.string().min(1).max(10)
});
AddressValidation.REMOVE = _a.GET;
