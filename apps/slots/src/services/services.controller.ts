import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.createService(createServiceDto.doctorId, createServiceDto);
  }

  @Public()
  @Get(':doctorId')
  findAll(@Param('doctorId') doctorId: string) {
    return this.servicesService.findAllServices(doctorId);
  }

  @Get(':doctorId/:serviceId')
  findOne(@Param('doctorId') doctorId: string, @Param('serviceId') serviceId: string) {
    return this.servicesService.findServiceById(doctorId, serviceId);
  }

  @Patch(':doctorId/:serviceId')
  update(
    @Param('doctorId') doctorId: string,
    @Param('serviceId') serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.updateService(doctorId, serviceId, updateServiceDto);
  }

  @Delete(':doctorId/:serviceId')
  remove(@Param('doctorId') doctorId: string, @Param('serviceId') serviceId: string) {
    return this.servicesService.removeService(doctorId, serviceId);
  }

}
