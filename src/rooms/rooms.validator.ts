export class RoomValidator {
  static validateCreateRoomDto(createRoomDto) {
    if (!createRoomDto.name) {
      throw new Error('Name is required');
    }
    if (!createRoomDto.maxCapacity) {
      throw new Error('maxCapacity date is required');
    }
    if (createRoomDto.maxCapacity < 15 || createRoomDto.maxCapacity > 30) {
      throw new Error('maxCapacity must be greater than 15 and less than 30');
    }
    if (!createRoomDto.description) {
      throw new Error('Description is required');
    }
  }

  static validateUpdateRoomDto(updateRoomDto) {
    if (
      updateRoomDto.maxCapacity &&
      (updateRoomDto.maxCapacity < 15 || updateRoomDto.maxCapacity > 30)
    ) {
      throw new Error('maxCapacity must be greater than 15 and less than 30');
    }
  }
}
