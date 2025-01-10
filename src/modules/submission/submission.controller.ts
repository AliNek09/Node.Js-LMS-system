import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubmissionService } from "./submission.service";
import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";

@Controller('submissions')
export class SubmissionController
{
  constructor(private readonly submissionService: SubmissionService) {}

  @Post(':studentsId/submit-assignment/:assignmentId')
  create(
    @Param('studentsId') studentsId: string, // No colon here
    @Param('assignmentId') assignmentId: string, // No colon here
    @Body() createDto: CreateSubmissionDto
  ) {
    return this.submissionService.create({
      ...createDto,
      studentsId: +studentsId, // Convert to number
      assignmentId: +assignmentId, // Convert to number
    });
  }

  @Post(':studentsId/update-assignment/:assignmentId/submission-id/:submissionId')
  update(
    @Param('studentsId') studentsId: string,
    @Param('assignmentId') assignmentId: string,
    @Param('submissionId') submissionId: string,
    @Body() updateDto: UpdateSubmissionDto
  ) {
    return this.submissionService.update(+submissionId, {
      ...updateDto,
      studentsId: +studentsId,
      assignmentId: +assignmentId,
    });
  }
}