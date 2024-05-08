import { ApiProperty } from '@nestjs/swagger';

export class GetAttendancesDto {
    @ApiProperty({
        example: '2021-05-01',
        required: false,
    })
    startDate: Date;

    @ApiProperty({
        example: '2021-05-01',
        required: false,
    })
    endDate: Date;
}
