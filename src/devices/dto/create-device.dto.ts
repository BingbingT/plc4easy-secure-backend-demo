import { IsIP, IsIn, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsIP()
  ipAddress: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

  @IsIn(['online', 'offline'])
  status: 'online' | 'offline';
}
