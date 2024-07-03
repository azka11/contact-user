import { ContactTest, UserTest } from "./test-utils"
import { web } from "../src/application/web"
import supertest from "supertest"
import { logger } from "../src/application/logging"

describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should create new contact', async () => {
        const response = await supertest(web)
        .post('/api/contacts')
        .set('X-API-TOKEN', 'test')
        .send({
            first_name: "azka",
            last_name: "ramadhan",
            email: 'azka@example.com',
            phone: '0899887766'
        })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.contact_id).toBeDefined()
        expect(response.body.data.first_name).toBe("azka")
        expect(response.body.data.last_name).toBe("ramadhan")
        expect(response.body.data.email).toBe("azka@example.com")
        expect(response.body.data.phone).toBe("0899887766")
    })

    it('should reject create new contact if data is invalid', async () => {
        const response = await supertest(web)
        .post('/api/contacts')
        .set('X-API-TOKEN', 'test')
        .send({
            first_name: "",
            last_name: "ramadhan",
            email: 'azka',
            phone: '089988776608998877660899887766'
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})

describe("GET /api/contacts/:contactId", () => {
    
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })


    it('should able to get contact ', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.contact_id}`)
        .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.contact_id).toBeDefined()
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.email).toBe(contact.email)
        expect(response.body.data.phone).toBe(contact.phone)
    })

    it('should reject to get contact if contact is not found ', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.contact_id + 1}`)
        .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe("PUT /api/contacts/:contactId", () => {
    
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to update contact', async () => {

        const contact = await ContactTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.contact_id}`)
        .set('X-API-TOKEN', 'test')
        .send({
            first_name: "azka",
            last_name: "ramadhan",
            email: "azka@example.com",
            phone: "087777770"
        })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.contact_id).toBe(contact.contact_id)
        expect(response.body.data.first_name).toBe("azka")
        expect(response.body.data.last_name).toBe("ramadhan")
        expect(response.body.data.email).toBe("azka@example.com")
        expect(response.body.data.phone).toBe("087777770")
    })

    it('should reject to update contact if contact not found', async () => {

        const contact = await ContactTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.contact_id + 1}`)
        .set('X-API-TOKEN', 'test')
        .send({
            first_name: "azka",
            last_name: "ramadhan",
            email: "test@example.com",
            phone: "0888888880"
        })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    it('should reject to update contact if request is invalid', async () => {

        const contact = await ContactTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.contact_id}`)
        .set('X-API-TOKEN', 'test')
        .send({
            first_name: "",
            last_name: "",
            email: "test",
            phone: ""
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})

describe("DELETE /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to remove contact ', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .delete(`/api/contacts/${contact.contact_id}`)
        .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Remove Contact Success!")
    })

    it('should reject to remove contact if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .delete(`/api/contacts/${contact.contact_id + 1}`)
        .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe("GET /api/contacts", () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to search contact ', async () => {
        const response = await supertest(web)
        .get('/api/contacts')
        .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it('should be able to search contact using name', async () => {
        const response = await supertest(web)
        .get('/api/contacts')
        .query({
            name: "es"
        })
        .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it('should be able to search contact email', async () => {
        const response = await supertest(web)
        .get('/api/contacts')
        .query({
            email: ".com"
        })
        .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it('should be able to search contact phone', async () => {
        const response = await supertest(web)
        .get('/api/contacts')
        .query({
            phone: "8880"
        })
        .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it('should be able to search contact no result', async () => {
        const response = await supertest(web)
        .get('/api/contacts')
        .query({
            phone: "salah"
        })
        .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(0)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(0)
        expect(response.body.paging.size).toBe(10)
    })

    it('should be able to search contact with paging', async () => {
        const response = await supertest(web)
        .get('/api/contacts')
        .query({
            page: 2,
            size: 1
        })
        .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(0)
        expect(response.body.paging.current_page).toBe(2)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(1)
    })
})