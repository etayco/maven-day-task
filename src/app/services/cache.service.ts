import {Injectable} from '@angular/core';
import {ServerCommunicationService} from './server-communication.service';
import {Observable, of} from 'rxjs';
import {Team} from '../classes/team';
import {TeamMember} from '../classes/team-member';
import {Task} from '../classes/task';
import {map} from 'rxjs/internal/operators';
import {teamMembersAndTasksResponse} from '../classes/dtoClasses/teamMembersAndTasksResponse';
import {TaskType} from '../enums/task-type.enum';

/**
 * This is the cache service - it gets data from the server if needed and stores it once it's received.
 * All data sits in maps to be easily acquired when needed.
 */
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  public teams: Map<number, Team>;
  private teamIdToMembers: Map<number, TeamMember[]> = new Map<number, TeamMember[]>();
  private tasksMap: Map<number, Task> = new Map<number, Task>();


  constructor(private server: ServerCommunicationService) {
  }

  public getAllTeams(): Observable<Map<number, Team>> {
    if (!this.teams) {
      console.log('Teams are not found in cache, getting from server');
      const allTeamsObservable = this.server.getAllTeams();

      allTeamsObservable.subscribe(receivedTeams => this.teams = receivedTeams);

      return allTeamsObservable;
    } else {
      console.log('Teams are stored in cache, returning stored teams');
      return of(this.teams);
    }
  }

  public getTeamMembersOfTeamByTeamId(teamId: number): Observable<TeamMember[]> {
    if (!this.teamIdToMembers.has(teamId)) {
      console.log('Team members of team ' + teamId + ' are not found in cache, getting from server');

      return this.loadTeamMembersAndTasksByTeamIdIntoCache(teamId).pipe(map(receivedTeamMembersAndTasksResponse =>
        receivedTeamMembersAndTasksResponse.teamMembers));
    } else {
      console.log('Team members of team ' + teamId + ' are stored in cache, returning stored team members');

      return of(this.teamIdToMembers.get(teamId));
    }
  }

  public getTaskByTaskId(taskId: number): Observable<Task> {
    if (!this.tasksMap.has(taskId)) {
      // Something went wrong as when team members are loaded from server their tasks should be loaded as well.
      // If in the future we'll have a view for tasks without anything to do with team members we should implement new server calls.
      console.error('Task with id ' + taskId + ' can\'t be found in cache, something went wrong');

      return of({id: -1, name: 'Error getting current task', color: '#ff1e25', type: TaskType.SINGLE_DAY});
    } else {
      console.log('Task with id ' + taskId + ' is stored in cache, returning stored task');

      return of(this.tasksMap.get(taskId));
    }
  }

  private loadTeamMembersAndTasksByTeamIdIntoCache(teamId: number): Observable<teamMembersAndTasksResponse> {
    const getTeamMembersAndTasksByTeamIdObservable: Observable<teamMembersAndTasksResponse> =
      this.server.getTeamMembersAndTasksByTeamId(teamId);

    console.log('Getting all team members and tasks of team: ' + teamId);

    getTeamMembersAndTasksByTeamIdObservable.subscribe(receivedTeamMembersAndTasksResponse => {
      this.teamIdToMembers.set(teamId, receivedTeamMembersAndTasksResponse.teamMembers);

      receivedTeamMembersAndTasksResponse.tasks.forEach(currentTask => {
        this.tasksMap.set(currentTask.id, currentTask);
      });
      console.log('Received all teams from server and stored in cache');
    });

    return getTeamMembersAndTasksByTeamIdObservable;
  }

  /**
   * This function should be used only if we know we want to load all team members at once.
   * It doesn't check if anything found in cache as it shouldn't be called if we expect it to return what's in the cache.
   * @returns {Observable<TeamMember[]>}
   */
  loadAllTeamMembersToCache(): Observable<TeamMember[]> {
    return this.loadAllTeamMembersAndTasksIntoCache().pipe(map(receivedMapResponse => {
      let teamMembersArrayToReturn: TeamMember[] = [];

      receivedMapResponse.forEach((value, key) => {
        teamMembersArrayToReturn = teamMembersArrayToReturn.concat(value.teamMembers);
      });

      return teamMembersArrayToReturn;
    }));
  }

  private loadAllTeamMembersAndTasksIntoCache(): Observable<Map<number, teamMembersAndTasksResponse>> {
    const teamIdToTeamMembersAndTasksMapObservable: Observable<Map<number, teamMembersAndTasksResponse>> =
      this.server.getAllTeamsMembersAndTasks();

    console.log('Getting all team members and tasks from server');

    teamIdToTeamMembersAndTasksMapObservable.subscribe(receivedMapResponse => {
      receivedMapResponse.forEach((value, key) => {
        this.teamIdToMembers.set(key, value.teamMembers);
        value.tasks.forEach(currentTask => {
          this.tasksMap.set(currentTask.id, currentTask);
        });
      });

      console.log('Received all team members and tasks from server and stored in cache');
    });

    return teamIdToTeamMembersAndTasksMapObservable;
  }

}
