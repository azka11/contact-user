"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toContactResponse = void 0;
function toContactResponse(contact) {
    return {
        contact_id: contact.contact_id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone
    };
}
exports.toContactResponse = toContactResponse;
