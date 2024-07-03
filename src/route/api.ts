import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { UserController } from '../controller/user-controller'
import { ContactController } from '../controller/contact-controller'
import { AddressController } from '../controller/address-controller'

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)

// User API
apiRouter.get("/api/users/current", UserController.getUser)
apiRouter.patch("/api/users/current", UserController.updateUser)
apiRouter.delete("/api/users/current", UserController.logout)

//Contact API
apiRouter.post("/api/contacts", ContactController.createContact)
apiRouter.get("/api/contacts/:contactId(\\d+)", ContactController.getContact)
apiRouter.put("/api/contacts/:contactId(\\d+)", ContactController.updateContact)
apiRouter.delete("/api/contacts/:contactId(\\d+)", ContactController.removeContact)
apiRouter.get("/api/contacts", ContactController.searchContact)

//Address API
apiRouter.post("/api/contacts/:contactId(\\d+)/address", AddressController.createAddress)
apiRouter.get("/api/contacts/:contactId(\\d+)/address/:addressId(\\d+)", AddressController.getAddress)
apiRouter.put("/api/contacts/:contactId(\\d+)/address/:addressId(\\d+)", AddressController.updateAddress)
apiRouter.delete("/api/contacts/:contactId(\\d+)/address/:addressId(\\d+)", AddressController.removeAddress)
apiRouter.get("/api/contacts/:contactId(\\d+)/address", AddressController.listAddress)