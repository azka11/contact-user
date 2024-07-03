import supertest from "supertest"
import { AddressTest, ContactTest, UserTest } from "./test-utils"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"

describe("POST /api/contacts/:contactId/address", () => {

    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to create address', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .post(`/api/contacts/${contact.contact_id}/address`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "Jalanin dulu aja",
            city: "Malang Sekali",
            province: "Kenangan",
            country: "Konoha",
            postal_code: "112200"
        })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.address_id).toBeDefined()
        expect(response.body.data.street).toBe("Jalanin dulu aja")
        expect(response.body.data.city).toBe("Malang Sekali")
        expect(response.body.data.province).toBe("Kenangan")
        expect(response.body.data.country).toBe("Konoha")
        expect(response.body.data.postal_code).toBe("112200")

    })

    it('should reject to create address if request is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .post(`/api/contacts/${contact.contact_id}/address`)
        .set("X-API-TOKEN", "test")
        .send({
            street: ".",
            city: "Malang Sekali",
            province: "Kenangan",
            country: "",
            postal_code: ""
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should reject to create address if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .post(`/api/contacts/${contact.contact_id + 1}/address`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "Jalan kaki",
            city: "Malang Sekali",
            province: "Kenangan",
            country: "Konoha",
            postal_code: "112200"
        })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe("GET /api/contacts/:contactId/address/:addressId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it("should be able to get address", async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.contact_id}/address/${address.address_id}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.address_id).toBeDefined()
        expect(response.body.data.street).toBe(address.street)
        expect(response.body.data.city).toBe(address.city)
        expect(response.body.data.province).toBe(address.province)
        expect(response.body.data.country).toBe(address.country)
        expect(response.body.data.postal_code).toBe(address.postal_code)
    })

    it("should reject to get address if address is not found", async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.contact_id}/address/${address.address_id + 1}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    it("should reject to get address if contact is not found", async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.contact_id + 1}/address/${address.address_id}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe("PUT /api/contacts/:contactId/address/:addressId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it("should be able to update address", async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.contact_id}/address/${address.address_id}`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "jalanin dulu aja",
            city: "malang sekali",
            province: "kali ciujung barat",
            country: "konoha",
            postal_code: "112200"
        })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.address_id).toBe(address.address_id)
        expect(response.body.data.street).toBe("jalanin dulu aja")
        expect(response.body.data.city).toBe("malang sekali")
        expect(response.body.data.province).toBe("kali ciujung barat")
        expect(response.body.data.country).toBe("konoha")
        expect(response.body.data.postal_code).toBe("112200")
    })

    it("should reject to update if request invalid", async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.contact_id}/address/${address.address_id}`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "0",
            city: "malang sekali",
            province: "kali ciujung barat",
            country: "",
            postal_code: ""
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it("should reject to update if address is not found", async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.contact_id}/address/${address.address_id + 1}`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "jalanin aja dulu",
            city: "malang sekali",
            province: "kali ciujung barat",
            country: "konoha",
            postal_code: "11220"
        })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    it("should reject to update if contact is not found", async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.contact_id + 1}/address/${address.address_id}`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "jalanin aja dulu",
            city: "malang sekali",
            province: "kali ciujung barat",
            country: "konoha",
            postal_code: "11220"
        })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe("DELETE /api/contacts/:contactId/address/:addressId", () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it("should be able to remove address", async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .delete(`/api/contacts/${contact.contact_id}/address/${address.address_id}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Remove Address Success!")
    })

    it("should reject to remove address if address is not found", async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .delete(`/api/contacts/${contact.contact_id}/address/${address.address_id + 1}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    it("should reject to remove address if contact is not found", async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .delete(`/api/contacts/${contact.contact_id + 1}/address/${address.address_id}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe("GET /api/contacts/:contactId/address", () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it("should be able to list address", async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.contact_id}/address`)
        .set("X-API-TOKEN", "test")
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
    })

    it("should reject to list address if contact is not found", async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.contact_id + 1}/address`)
        .set("X-API-TOKEN", "test")
        
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    it("should reject to list address if unauthorized", async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.contact_id}/address`)
        .set("X-API-TOKEN", "salah")
        
        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
})