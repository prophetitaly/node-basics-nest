import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("heavy")
  @HttpCode(HttpStatus.ACCEPTED)
  createHeavyTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createHeavyTask(createTaskDto);
  }

  @Get(":taskId")
  getTaskStatus(@Param("taskId") taskId: string) {
    return this.tasksService.getTaskStatus(taskId);
  }
}
