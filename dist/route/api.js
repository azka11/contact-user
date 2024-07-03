"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const contact_controller_1 = require("../controller/contact-controller");
const address_controller_1 = require("../controller/address-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// User API
exports.apiRouter.get("/api/users/current", user_controller_1.UserController.getUser);
exports.apiRouter.patch("/api/users/current", user_controller_1.UserController.updateUser);
exports.apiRouter.delete("/api/users/current", user_controller_1.UserController.logout);
//Contact API
exports.apiRouter.post("/api/contacts", contact_controller_1.ContactController.createContact);
exports.apiRouter.get("/api/contacts/:contactId(\\d+)", contact_controller_1.ContactController.getContact);
exports.apiRouter.put("/api/contacts/:contactId(\\d+)", contact_controller_1.ContactController.updateContact);
exports.apiRouter.delete("/api/contacts/:contactId(\\d+)", contact_controller_1.ContactController.removeContact);
exports.apiRouter.get("/api/contacts", contact_controller_1.ContactController.searchContact);
//Address API
exports.apiRouter.post("/api/contacts/:contactId(\\d+)/address", address_controller_1.AddressController.createAddress);
exports.apiRouter.get("/api/contacts/:contactId(\\d+)/address/:addressId(\\d+)", address_controller_1.AddressController.getAddress);
exports.apiRouter.put("/api/contacts/:contactId(\\d+)/address/:addressId(\\d+)", address_controller_1.AddressController.updateAddress);
exports.apiRouter.delete("/api/contacts/:contactId(\\d+)/address/:addressId(\\d+)", address_controller_1.AddressController.removeAddress);
exports.apiRouter.get("/api/contacts/:contactId(\\d+)/address", address_controller_1.AddressController.listAddress);
