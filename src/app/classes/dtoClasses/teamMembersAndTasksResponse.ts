import {TeamMember} from '../team-member';
import {Task} from '../task';

export interface teamTeamMembersAndTasksResponse {
  teamMembers: TeamMember[];
  tasks: Task[];
}
