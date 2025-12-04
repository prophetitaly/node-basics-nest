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
    const taskId = uuidv4();
    const task: HeavyTaskResponse = {
      taskId,
      status: "processing",
      iterations: createTaskDto.iterations,
    };

    this.tasks.set(taskId, task);

    // Start worker thread - try both .ts (for Jest) and .js (for production)
    const isTest =
      process.env.NODE_ENV === "test" ||
      process.env.JEST_WORKER_ID !== undefined;
    const workerExt = isTest ? ".ts" : ".js";
    const workerPath = path.join(
      __dirname,
      "workers",
      `heavy-task.worker${workerExt}`
    );

    const startTime = Date.now();

    try {
      const worker = new Worker(workerPath, {
        workerData: { iterations: createTaskDto.iterations },
        eval: false,
      });

      worker.on("message", (result: number) => {
        const duration = Date.now() - startTime;
        task.status = "completed";
        task.result = result;
        task.duration = duration;
        this.tasks.set(taskId, task);
      });

      worker.on("error", (error) => {
        task.status = "error";
        this.tasks.set(taskId, task);
        // Only log if not in test to avoid console pollution
        if (!isTest) {
          console.error("Worker error:", error);
        }
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          task.status = "error";
          this.tasks.set(taskId, task);
        }
      });
    } catch (error) {
      task.status = "error";
      this.tasks.set(taskId, task);
    }

    return task;
  }

  getTaskStatus(taskId: string): HeavyTaskResponse {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }
}
