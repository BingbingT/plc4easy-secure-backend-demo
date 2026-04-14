import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device, DevicesService } from './devices.service';

@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  getDevices(): Device[] {
    return this.devicesService.findAll();
  }

  @Post()
  createDevice(@Body() dto: CreateDeviceDto): Device {
    return this.devicesService.create(dto);
  }
}
