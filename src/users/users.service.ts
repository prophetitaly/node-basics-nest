import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

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
    // TODO: Implement user creation
    // - Check for duplicate email
    // - Generate UUID for id
    // - Create user with createdAt timestamp
    // - Return created user
    throw new Error("Not implemented");
  }

  findAll(
    page: number = 1,
    limit: number = 10
  ): { data: User[]; total: number; page: number; limit: number } {
    // TODO: Implement pagination
    // - Validate page and limit (must be > 0)
    // - Return paginated data with metadata
    throw new Error("Not implemented");
  }

  findActive(): User[] {
    // TODO: Implement active users filter
    // - Filter users with isActive === true
    throw new Error("Not implemented");
  }

  findOne(id: string): User {
    // TODO: Implement find user by id
    // - Find user by id
    throw new Error("Not implemented");
  }

  remove(id: string): void {
    // TODO: Implement user deletion
    // - Find user by id
    // - Throw NotFoundException if not found
    // - Remove from array and save to file
    throw new Error("Not implemented");
  }

  // Method for testing - clear all users
  clearAll(): void {
    this.users = [];
    this.saveUsers();
  }
}
