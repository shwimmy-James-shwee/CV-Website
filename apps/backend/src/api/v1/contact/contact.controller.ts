import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { Request } from 'express';
import { PREFIX, ROUTE } from '@core/routes';
import { ContactUsNotification } from '@core/db';
import { ContactService } from './contact.service';

@ApiTags('contact')
@Controller(PREFIX.contact)
export class ContactMeController {
  constructor(private readonly contactService: ContactService) {}

  // TODO AUTH PROTECT ENDPOINT
  @Get(ROUTE.contact.getAll)
  @ApiOperation({ summary: 'Get all queries, protected endpoint for admin only' })
  @ApiResponse({
    status: 200,
    description: 'Queries retrieved',
  })
  async getAllContactQueries(): Promise<ContactUsNotification[]> {
    const queries = await this.contactService.findAll();
    if (!queries) {
      throw new BadRequestException('No queries found');
    } else {
      return queries;
    }
  }
}
