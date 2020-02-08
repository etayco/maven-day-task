/**
 * This interface represents a team member.
 */
export interface TeamMember {
  id: number;
  name: string;
  teamId: number;
  currentTaskId?: number;
}
