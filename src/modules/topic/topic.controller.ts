import { Controller, Get, HttpCode, Post, Param, Query, Body } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";
import { Topic } from "../../entities/topic.entity";

@Controller('topics')
export class TopicController
{
  constructor(private readonly topicService: TopicService) {}

  @Get('getOne/:id')
  @HttpCode(200)
  async getOne(@Param('id') id: number): Promise<Topic>
  {
    return await this.topicService.getOne(id);
  }

  @Get('getAll')
  @HttpCode(200)
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    ): Promise<{ topics: Topic[] }>
  {
    return await this.topicService.getAll(page, limit);
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body() createTopic: CreateTopicDto): Promise<Topic>
  {
    return await this.topicService.create(createTopic);
  }

  @Post('update/:id')
  @HttpCode(202)
  async update(
    @Param('id') id: number,
    @Body() updateTopic: UpdateTopicDto,
    ): Promise<Topic>
  {
    return await this.topicService.update(id, updateTopic);
  }

  @Post('delete/:id')
  @HttpCode(202)
  async delete(
    @Param('id') id: number,
    ): Promise<void>
  {
    return await this.topicService.delete(id);
  }
}