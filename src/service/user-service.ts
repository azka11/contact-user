import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"


export class UserService {
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username : registerRequest.username
            }
        })

        if(totalUserWithSameUsername != 0) {
            throw new ResponseError(400, "User already exists")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return toUserResponse(user)
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request)

        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        })

        if(!user) {
            throw new ResponseError(401, "username or password wrong!")
        }

        const passwordValidate = await bcrypt.compare(loginRequest.password, user.password)
        if(!passwordValidate) {
            throw new ResponseError(401, "username or password wrong!")
        }

        user = await prismaClient.user.update({
            where: {
                username: loginRequest.username
            },
            data :{
                token: uuid()
            }
        })

        const response = toUserResponse(user)
        response.token = user.token!;
        return response;
    }

    static async getUser(user: User): Promise<UserResponse> {
        return toUserResponse(user)
    }

    static async updateUser(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateUserRequest = Validation.validate(UserValidation.UPDATE, request)

        if(updateUserRequest.name) {
            user.name = updateUserRequest.name
        }

        if(updateUserRequest.password) {
            user.password = await bcrypt.hash(updateUserRequest.password, 10)
        }

        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data : user
        })

        return toUserResponse(result)
    }

    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: {
                token: null
            }
        })

        return toUserResponse(result)
    }
}