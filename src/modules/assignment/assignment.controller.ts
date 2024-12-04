import { Controller, HttpCode, Get, Post, Body, Param} from "@nestjs/common";
import { AssignmentService } from "./assignment.service";
import { Assignment } from "../../entities/assignment.entity";
import { CreateAssignmentDto } from "./dto/create-assignment.dto";
import { UpdateAssignmentDto } from "./dto/update-assignment.dto";
import { GetOneAssignmentDto } from "./dto/get-one-assignment.dto";


@Controller('assignments')
export class AssignmentController
{
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get('getOne/:id')
  @HttpCode(200)
  async getOne(@Param('id') id: number): Promise<GetOneAssignmentDto>
  {
    return await this.assignmentService.getOne(id);
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body() createAssignment: CreateAssignmentDto): Promise<Assignment>
  {
    return await this.assignmentService.create(createAssignment);
  }

  @Post('update/:id')
  @HttpCode(202)
  async update(
    @Param('id') id: number,
    @Body() updateAssignment: UpdateAssignmentDto,
  ): Promise<ShortResponse>
  {
    return await this.assignmentService.update(id, updateAssignment);
  }

  @Post('delete/:id')
  @HttpCode(202)
  async delete(@Param('id') id: number): Promise<ShortResponse>
  {
    return this.assignmentService.delete(id);
  }

}