import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, isNewUser } from "./entities/user.entity";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class UsersService {
  private users: User[] = [];
  private readonly dataPath = path.join(process.cwd(), "data", "users.json");

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    try {
      const data = fs.readFileSync(this.dataPath, "utf-8");
      this.users = JSON.parse(data);
    } catch (error) {
      console.warn("Could not load users from file, starting with empty array");
      this.users = [];
    }
  }

  private saveUsers() {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.users, null, 2));
    } catch (error) {
      console.error("Error saving users to file:", error);
    }
  }

  create(createUserDto: CreateUserDto): User {
    // Check for duplicate email
    const existingUser = this.users.find(
      (user) => user.email === createUserDto.email
    );
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const newUser: User = {
      id: uuidv4(),
      name: createUserDto.name,
      email: createUserDto.email,
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  findAll(
    page: number = 1,
    limit: number = 10
  ): { data: User[]; total: number; page: number; limit: number } {
    // Validate and correct pagination parameters
    const validPage = page > 0 ? page : 1;
    const validLimit = limit > 0 ? limit : 10;

    const offset = (validPage - 1) * validLimit;
    const paginatedUsers = this.users.slice(offset, offset + validLimit);

    return {
      data: paginatedUsers,
      total: this.users.length,
      page: validPage,
      limit: validLimit,
    };
  }

  findActive(): User[] {
    return this.users.filter((user) => isNewUser(user) && user.isActive);
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  remove(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(index, 1);
    this.saveUsers();
  }

  // Method for testing - clear all users
  clearAll(): void {
    this.users = [];
    this.saveUsers();
  }
}
