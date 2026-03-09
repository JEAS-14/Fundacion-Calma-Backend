import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { CreateConvenioUseCase } from '../../application/use-cases/create-convenio.usecase';
import { GetConveniosUseCase } from '../../application/use-cases/get-convenios.usecase';
import { GetConvenioUseCase } from '../../application/use-cases/get-convenio.usecase';
import { UpdateConvenioUseCase } from '../../application/use-cases/update-convenio.usecase';
import { DeleteConvenioUseCase } from '../../application/use-cases/delete-convenio.usecase';

import { CreateConvenioDto } from '../../application/dto/create-convenio.dto';
import { UpdateConvenioDto } from '../../application/dto/update-convenio.dto';

@Controller('convenios')
export class ConveniosController {
  constructor(
    private readonly createConvenio: CreateConvenioUseCase,
    private readonly getConvenios: GetConveniosUseCase,
    private readonly getConvenio: GetConvenioUseCase,
    private readonly updateConvenio: UpdateConvenioUseCase,
    private readonly deleteConvenio: DeleteConvenioUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateConvenioDto) {
    return this.createConvenio.execute(dto);
  }

  @Get()
  async findAll() {
    return this.getConvenios.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.getConvenio.execute(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateConvenioDto) {
    return this.updateConvenio.execute(Number(id), dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteConvenio.execute(Number(id));
  }
}
