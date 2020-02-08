import {Injectable} from '@angular/core';
import {CacheService} from './cache.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Team} from '../classes/team';
import {ViewObject} from '../classes/view-object';
import {TeamMember} from '../classes/team-member';

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {
  public teamsViewObjects$: Observable<ViewObject<Team>[]>;
  public allTeamMembersList: TeamMember[] = [];
  private defaultShouldShow = true;

  constructor(public cacheService: CacheService) {
    this.teamsViewObjects$ = this.cacheService.getAllTeams().pipe(
      map(allTeamsMap => {
        let allTeamsArray: ViewObject<Team>[] = [];

        allTeamsMap.forEach((value, key) => {
          let teamViewObject: ViewObject<Team> = new ViewObject(value, this.defaultShouldShow);
          allTeamsArray.push(teamViewObject);

          teamViewObject.shouldShowStateChanged.subscribe(newShouldShow => {
            if (newShouldShow) {
              this.cacheService.getTeamMembersOfTeamByTeamId(teamViewObject.objectData.id).subscribe(teamMembersToAdd => {
                this.allTeamMembersList = this.allTeamMembersList.concat(teamMembersToAdd);
              });
            } else {
              this.allTeamMembersList =
                this.allTeamMembersList.filter(teamMemberToFilter => teamMemberToFilter.teamId !== teamViewObject.objectData.id);
            }

            this.sortAllTeamMembersList();
          });
        });

        //TODO:add subscription to showchange method.

        allTeamsArray.sort((a, b) => a.objectData.id > b.objectData.id ? 1 : -1);
        return allTeamsArray;
      }));

    if (this.defaultShouldShow) {
      this.cacheService.loadAllTeamMembersToCache().subscribe(allTeamMembers => {
        this.allTeamMembersList = [...allTeamMembers];
      });
    }
  }

  private sortAllTeamMembersList() {
    this.allTeamMembersList.sort((a, b) => a.teamId == b.teamId ? (a.id > b.id ? 1 : -1) : (a.teamId > b.teamId ? 1 : -1));
  }
}
