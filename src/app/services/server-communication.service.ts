import {Injectable} from '@angular/core';
import {Team} from '../classes/team';
import {TeamMember} from '../classes/team-member';
import {Task} from '../classes/task';
import {TaskType} from '../enums/task-type.enum';
import {teamMembersAndTasksResponse} from '../classes/dtoClasses/teamMembersAndTasksResponse';
import {forkJoin, Observable, of} from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {
  todayDate: Date = new Date();
  tomorrowDate: Date;
  yesterdayDate: Date;

  constructor() {
    this.tomorrowDate = new Date();
    this.tomorrowDate.setDate(this.todayDate.getDate() + 1);

    this.yesterdayDate = new Date();
    this.yesterdayDate.setDate(this.todayDate.getDate() - 1);
  }

  getAllTeams(): Observable<Map<number, Team>> {
    let mapToReturn: Map<number, Team> = new Map<number, Team>();
    mapToReturn.set(1, {id: 1, name: 'First Team'});
    mapToReturn.set(2, {id: 2, name: 'Second Team'});
    mapToReturn.set(3, {id: 3, name: 'Third Team'});
    mapToReturn.set(4, {id: 4, name: 'Fourth Team'});

    return of(mapToReturn);
  }

  getTeamMembersAndTasksByTeamId(teamId: number): Observable<teamMembersAndTasksResponse> {
    let teamMembersArrayToReturn: TeamMember[] = [];
    let tasksArrayToReturn: Task[] = [];

    switch (teamId) {
      case 1:
        teamMembersArrayToReturn.push({id: 1, name: 'First Team Leader', currentTaskId: 1, teamId: 1});
        teamMembersArrayToReturn.push({id: 2, name: 'First Team QA', currentTaskId: 2, teamId: 1});
        teamMembersArrayToReturn.push({id: 3, name: 'First Team Senior Dev', currentTaskId: 2, teamId: 1});

        tasksArrayToReturn.push({id: 1, name: 'Lead And Stuff', color: '#1b4ede', type: TaskType.SINGLE_DAY});
        tasksArrayToReturn.push({id: 2, name: 'Mid Work And Test', color: '#23de2d', type: TaskType.SINGLE_DAY});

        break;
      case 2:
        teamMembersArrayToReturn.push({id: 5, name: 'Second Team Leader', currentTaskId: 4, teamId: 2});
        teamMembersArrayToReturn.push({id: 6, name: 'Second Team QA', currentTaskId: 5, teamId: 2});
        teamMembersArrayToReturn.push({id: 7, name: 'Second Team Senior Dev', currentTaskId: 6, teamId: 2});

        tasksArrayToReturn.push({
          id: 4,
          name: 'Lead And Stuff Of Other Team',
          color: '#fffc0b',
          type: TaskType.CONTINUOUS,
          startDate: this.todayDate,
          endDate: this.tomorrowDate
        });
        tasksArrayToReturn.push({
          id: 5,
          name: 'Need To Check',
          color: '#b824de',
          type: TaskType.CONTINUOUS,
          startDate: this.yesterdayDate,
          endDate: this.tomorrowDate
        });
        tasksArrayToReturn.push({
          id: 6, name: 'Working Hard', color: '#de9d14', type: TaskType.CONTINUOUS, startDate: this.yesterdayDate, endDate: this.todayDate
        });
        break;
      case 3:
        teamMembersArrayToReturn.push({id: 9, name: 'Third Team Leader', currentTaskId: 7, teamId: 3});
        teamMembersArrayToReturn.push({id: 10, name: 'Third Team New Guy', currentTaskId: 3, teamId: 3});

        tasksArrayToReturn.push({id: 7, name: 'Take Care Of New Guy', color: '#5f0bde', type: TaskType.SINGLE_DAY});
        tasksArrayToReturn.push({id: 3, name: 'Learning Stuff', color: '#20bede', type: TaskType.SINGLE_DAY});

        break;

      case 4:
        teamMembersArrayToReturn.push({id: 4, name: 'Fourth Team Leader', teamId: 4});
        teamMembersArrayToReturn.push({id: 8, name: 'Fourth Team New Guy', currentTaskId: 3, teamId: 4});

        tasksArrayToReturn.push({id: 3, name: 'Learning Stuff', color: '#20bede', type: TaskType.SINGLE_DAY});

        break;
    }


    return of({teamMembers: teamMembersArrayToReturn, tasks: tasksArrayToReturn});
  }

  getAllTeamsMembersAndTasks(): Observable<Map<number, teamMembersAndTasksResponse>> {
    let mapOfObservables = [];
    let teamIdsArray = [1, 2, 3, 4];

    teamIdsArray.forEach(value => {
      mapOfObservables.push(this.getTeamMembersAndTasksByTeamId(value));
    });

    return forkJoin(mapOfObservables).pipe(map(results => {
      let mapToReturn: Map<number, teamMembersAndTasksResponse> = new Map<number, teamMembersAndTasksResponse>();
      teamIdsArray.forEach((value, index) => {
        mapToReturn.set(value, results[index]);
      });

      return mapToReturn;
    }));
  }
}
