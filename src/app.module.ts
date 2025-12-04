import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TasksModule } from "./tasks/tasks.module";
import { HealthController } from "./health/health.controller";

@Module({
  imports: [UsersModule, TasksModule],
  controllers: [HealthController],
})
export class AppModule {}
