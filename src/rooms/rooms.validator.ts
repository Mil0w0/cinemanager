export class RoomValidator {
  static validateCreateRoomDto(createRoomDto) {
    if (!createRoomDto.name) {
      throw new Error('Name is required');
    }
    if (!createRoomDto.maxCapacity) {
      throw new Error('maxCapacity date is required');
    }
    if (createRoomDto.maxCapacity <= 0) {
      throw new Error('maxCapacity must be greater than 0');
    }
    if (!createRoomDto.description) {
      throw new Error('Description is required');
    }
    if (!createRoomDto.isAvailable) {
      throw new Error('isAvailable is required');
    }
    if (!createRoomDto.hasDisabledAccess) {
      throw new Error('hasDisabledAccess is required');
    }
  }
}
