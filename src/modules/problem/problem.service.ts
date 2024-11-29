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
    const problem = await this.problemRepository.findOne({
      where: { id },
      relations: [ 'topics' ]
    })

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

    const problem = this.problemRepository.create(createDto)

    return this.problemRepository.save(problem);

  }

}