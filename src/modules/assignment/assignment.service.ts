import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Assignment } from "../../entities/assignment.entity";
import { Problem } from "../../entities/problem.entity";
import { Class } from "../../entities/class.entity";
import { Topic } from "../../entities/topic.entity";

import { CreateAssignmentDto } from "./dto/create-assignment.dto";
import { UpdateAssignmentDto } from "./dto/update-assignment.dto";
import { GetOneAssignmentDto } from "./dto/get-one-assignment.dto";
import { RepositoryUtils } from "../../utilities/repository-utils/findOrFail";


@Injectable()
export class AssignmentService
{
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,

    @InjectRepository(Class)
    private classRepository: Repository<Class>,

    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,

    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>
  ) {}

  async getOne(id: number): Promise<GetOneAssignmentDto> {
    const assignment = await RepositoryUtils.findOrFail(
      this.assignmentRepository,
      id,
      'Assignment Not Found',
      ['problems']  // Ensure problems are loaded
    );

    return new GetOneAssignmentDto(assignment);
  }

  async create(createDto: CreateAssignmentDto): Promise<Assignment>
  {

    await RepositoryUtils.findOrFail(
      this.classRepository,
      createDto.classId,
      'Class does not exist'
    );

    await RepositoryUtils.findOrFail(
      this.topicRepository,
      createDto.topicId,
      'Topic does not exist'
    );

    // ASSIGNMENT HAS SEVERAL PROBLEMS, SO I USED PROBLEMS VARIABLE
    const problems = await this.problemRepository.find({
      where: {
        id: In(createDto.problemIds),
        topicId: createDto.topicId
      }

    });

    const foundProblems = problems.map((problem) => problem.id);
    const missingProblemIds = createDto.problemIds.filter(
      (id) => !foundProblems.includes(id)
    );

    if(missingProblemIds.length > 0) {
      throw new NotFoundException(
        `The following Problem IDs are missing or do not belong to the selected Topic: ${missingProblemIds.join(', ')}`,
      )
    }

    const assignment = this.assignmentRepository.create({
      description: createDto.description,
      deadline: createDto.deadline,
      classId: createDto.classId,
      topicId: createDto.topicId, // Ensure this line is included
      problems: problems.map((problem) => ({ id: problem.id }))
    });

    return this.assignmentRepository.save(assignment);
  }

  async update(id: number, updateDto: UpdateAssignmentDto): Promise<ShortResponse> {

    const assignment = await RepositoryUtils.findOrFail(
      this.assignmentRepository,
      id,
      'Assignment Not Found',
      ['problems']
    );

    await RepositoryUtils.findOrFail(
      this.classRepository,
      updateDto.classId,
      'Class does not exist'
    );

    await RepositoryUtils.findOrFail(
      this.topicRepository,
      updateDto.topicId,
      'Topic does not exist'
    );

    if (updateDto.problemIds) {

      const problems = await this.problemRepository.find({
        where: {
          id: In(updateDto.problemIds),
          topicId: updateDto.topicId
        }
      });

      const foundProblemIds = problems.map(p => p.id);
      const missingProblemIds = updateDto.problemIds.filter(id => !foundProblemIds.includes(id));

      if (missingProblemIds.length > 0) {
        throw new NotFoundException(
          `The following Problem IDs are missing or do not belong to the selected Topic: ${missingProblemIds.join(', ')}`
        );
      }

      assignment.problems = problems;
    }

    Object.assign(assignment, updateDto);

    await this.assignmentRepository.save(assignment);

    return {
      status: 'success',
      message: 'Assignment updated successfully',
    };
  }

  async delete(id: number): Promise<ShortResponse>
  {

   await RepositoryUtils.findOrFail(
      this.assignmentRepository,
      id,
      'Assignment Not Found'
    );

    await this.assignmentRepository.delete(id);

    return {
      status: 'success',
      message: 'Assignment has been deleted successfully',
    };
  }

}