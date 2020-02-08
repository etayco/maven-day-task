import {TeamMember} from '../team-member';
import {Task} from '../task';

export interface teamMembersAndTasksResponse {
  teamMembers: TeamMember[];
  tasks: Task[];
}
