import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';

export interface Device {
  id: string;
  name: string;
  ipAddress: string;
  location?: string;
  status: 'online' | 'offline';
}

@Injectable()
export class DevicesService {
  private readonly devices: Device[] = [
    {
      id: 'dev-001',
      name: 'Main PLC Controller',
      ipAddress: '192.168.10.10',
      location: 'Plant A - Control Room',
      status: 'online',
    },
    {
      id: 'dev-002',
      name: 'Conveyor Sensor Hub',
      ipAddress: '192.168.10.22',
      location: 'Plant A - Line 2',
      status: 'offline',
    },
    {
      id: 'dev-003',
      name: 'Cooling Pump Monitor',
      ipAddress: '192.168.10.35',
      location: 'Plant B - Utilities',
      status: 'online',
    },
    {
      id: 'dev-004',
      name: 'Quality Gate Scanner',
      ipAddress: '10.10.1.45',
      location: 'Plant B - QA',
      status: 'online',
    },
  ];

  findAll(): Device[] {
    return this.devices;
  }

  create(dto: CreateDeviceDto): Device {
    const nextId = `dev-${String(this.devices.length + 1).padStart(3, '0')}`;

    const device: Device = {
      id: nextId,
      name: dto.name,
      ipAddress: dto.ipAddress,
      location: dto.location,
      status: dto.status,
    };

    this.devices.push(device);
    return device;
  }
}
