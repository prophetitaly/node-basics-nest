import { Injectable, NotFoundException } from "@nestjs/common";
import { Worker } from "worker_threads";
import { v4 as uuidv4 } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { HeavyTaskResponse } from "./entities/task.entity";
import * as path from "path";

@Injectable()
export class TasksService {
  private tasks = new Map<string, HeavyTaskResponse>();

  createHeavyTask(createTaskDto: CreateTaskDto): HeavyTaskResponse {
    // TODO: Implement heavy task creation with worker threads
    // - Generate UUID for taskId
    // - Create task with 'processing' status
    // - Store in tasks Map
    // - Create Worker thread from workers/heavy-task.worker.ts (or .js in production)
    // - Handle worker messages to update task status to 'completed' with result and duration
    // - Handle worker errors to update task status to 'error'
    // - Return initial task object with 'processing' status
    throw new Error("Not implemented");
  }

  getTaskStatus(taskId: string): HeavyTaskResponse {
    // TODO: Implement task status retrieval
    // - Get task from tasks Map
    // - Throw NotFoundException if not found
    throw new Error("Not implemented");
  }
}
