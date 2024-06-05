import { TProcessCode } from 'types/navigation';

//6000 - 6499
const USER_ROLES_PROCESS_CODES = {
  USER_ROLE_EXIST: 6000,
  USER_ROLE_NOT_FOUND: 6001,
  USER_ROLE_EDITED: 6002,
  USER_ROLE_CREATED: 6003,
  USER_ROLES_DELETED: 6004,
} satisfies TProcessCode;

export default USER_ROLES_PROCESS_CODES;
