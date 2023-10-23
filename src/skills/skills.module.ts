import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports:[MongodbModule],
  providers: [SkillsService],
  exports:[SkillsService]
})
export class SkillsModule {}
