import {TeamMember} from '../team-member';
import {Task} from '../task';

/**
 * This Object is only meant to be received from the server.
 * Thanks to this class we don't need to emit to separate calls to the server.
 */
export interface teamMembersAndTasksResponse {
  teamMembers: TeamMember[];
  tasks: Task[];
}
