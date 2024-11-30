import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Topic } from "../../entities/topic.entity";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";

@Injectable()
export class TopicService
{
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>
  ) {}

  async getOne(id: number): Promise<Topic>
  {
    const topic = await  this.topicRepository.findOne({
      where: { id },
      select: ['id', 'topic_number', 'title', 'description']
    });

    if(!topic) {
      throw new NotFoundException('Topic does not exist');
    }

    return topic;
  }

  async getAll(page: number, limit: number): Promise<{topics: Topic[], totalCount: number}>
  {
    const [topics, totalCount] = await this.topicRepository.findAndCount({
      select: ['id', 'topic_number'],
      order: {topic_number: 'ASC'},
      skip: (page - 1) * limit,
      take: limit
    });

    return { topics, totalCount }
  }

  async create(createTopic: CreateTopicDto):Promise <Topic>
  {
    const topic = this.topicRepository.create(createTopic);
    return this.topicRepository.save(topic);
  }

  async update(id: number, updateTopic: UpdateTopicDto): Promise<Topic>
  {
    const topic = await this.topicRepository.findOne({where: {id}});
    Object.assign(topic, updateTopic);

    return await this.topicRepository.save(topic);
  }

  async delete(id: number): Promise<void>
  {
    const topic = await this.topicRepository.findOne({where: {id}});
    if(!topic) {
      throw new NotFoundException('Topic is not found');
    }

    await this.topicRepository.delete(topic);
  }

}