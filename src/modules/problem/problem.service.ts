import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Problem } from "../../entities/problem.entity";
import { Topic } from "../../entities/topic.entity";
import { CreateProblemDto } from "./dto/create-problem.dto";

@Injectable()
export class ProblemService
{
  constructor(
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,

    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>
  ) {}

  async getOne(id: number): Promise<Problem> {
    const problem = await this.problemRepository.createQueryBuilder('problem')
      .leftJoinAndSelect('problem.topic', 'topic')
      .select([
        'problem.id',
        'problem.order',
        'problem.title',
        'problem.text',
        'problem.placeholder',
        'topic.id as topicId'
      ])
      .where('problem.id = :id', {id})
      .getRawOne();

    if (!problem) {
      throw new NotFoundException('Problem is not found');
    }

    return problem;
  }

  async create(createDto: CreateProblemDto): Promise<Problem>
  {
    const topic = await this.topicRepository.findOne({ where: {id: createDto.topicId}})
    if(!topic) {
      throw new Error('Topic is not found')
    }

    const arrayPlaceholders = createDto.placeholders.map(({index, answer}) => ({
      index,
      answer: String(answer)
    }));

    const problem = this.problemRepository.create({
      order: createDto.order,
      title: createDto.title,
      text: createDto.text,
      placeholder: arrayPlaceholders
    });

    return this.problemRepository.save(problem);

  }

}