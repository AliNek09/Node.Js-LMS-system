import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Problem } from "../../entities/problem.entity";
import { Topic } from "../../entities/topic.entity";
import { CreateProblemDto } from "./dto/create-problem.dto";
import { UpdateProblemDto } from "./dto/update-problem.dto";

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
      select: [ 'id', 'order', 'answer', 'topicId' ]
    })

    if (!problem) {
      throw new NotFoundException('Problem is not found');
    }

    return problem;
  }

  async create(createDto: CreateProblemDto): Promise<Problem>
  {
    const topic = await this.topicRepository.findOne({ where: {id: createDto.topicId}});

    if(!topic) {
      throw new NotFoundException('Topic is not found');
    }

    const problem = this.problemRepository.create(createDto);
    problem.topic = topic;

    return this.problemRepository.save(problem);

  }

  async update(id: number, updateDto: UpdateProblemDto): Promise<Problem>
  {

    const problem = await this.problemRepository.findOne({where: { id }});
    if(!problem) {
      throw new NotFoundException(`Problem with ID ${id} is not found`);
    }

    if(updateDto.topicId) {
      const topic = await this.topicRepository.findOne({where: {id: updateDto.topicId}});

      if(!topic) {
        throw new NotFoundException('Topic is not found');
      }
      problem.topic = topic;

    }

    Object.assign(problem, updateDto);

    return this.problemRepository.save(problem);
  }

  async delete(id: number): Promise<void>
  {
    const problem = await this.problemRepository.findOne({where: { id }});
    if(!problem) {
      throw new NotFoundException(`Problem with ID ${id} is not found`);
    }

    await this.problemRepository.delete(id)
  }

}