import {Injectable} from '@angular/core';
import {CacheService} from './cache.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Team} from '../classes/team';
import {FilterableObject} from '../classes/view-object';
import {TeamMember} from '../classes/team-member';

/**
 * This service holds all relevant data for and from filtering while not touching the main cached data.
 * It is separated from the cache service as there might be more than one view in the future and each should have his own filter logic.
 */
@Injectable({
  providedIn: 'root'
})
export class FilterStateService {
  public teamsFilterableObjects$: Observable<FilterableObject<Team>[]>;
  public allShownTeamMembersList: TeamMember[] = [];
  private defaultShouldShow = true;

  constructor(public cacheService: CacheService) {
    this.teamsFilterableObjects$ = this.cacheService.getAllTeams().pipe(
      map(allTeamsMap => {
        let allTeamsArray: FilterableObject<Team>[] = [];

        allTeamsMap.forEach((value, key) => {
          let filterableTeamObject: FilterableObject<Team> = new FilterableObject(value, this.defaultShouldShow);
          allTeamsArray.push(filterableTeamObject);

          filterableTeamObject.shouldShowStateChanged.subscribe(newShouldShow =>
            this.teamShownStateChangeHandler(newShouldShow, filterableTeamObject.objectData.id));
        });

        this.sortTeamsArray(allTeamsArray);
        return allTeamsArray;
      }));

    if (this.defaultShouldShow) {
      this.cacheService.loadAllTeamMembersToCache().subscribe(allTeamMembers => {
        this.allShownTeamMembersList = [...allTeamMembers];
      });
    }
  }

  private teamShownStateChangeHandler(newShouldShowState: boolean, changedTeamId: number) {
    if (newShouldShowState) {
      this.cacheService.getTeamMembersOfTeamByTeamId(changedTeamId).subscribe(teamMembersToAdd => {
        this.allShownTeamMembersList = this.allShownTeamMembersList.concat(teamMembersToAdd);
      });
    } else {
      this.allShownTeamMembersList =
        this.allShownTeamMembersList.filter(teamMemberToFilter => teamMemberToFilter.teamId !== changedTeamId);
    }

    this.sortAllShownTeamMembersList();
  }

  private sortAllShownTeamMembersList() {
    this.allShownTeamMembersList.sort((a, b) => a.teamId == b.teamId ? (a.id > b.id ? 1 : -1) : (a.teamId > b.teamId ? 1 : -1));
  }

  private sortTeamsArray(teamsArrayToSort: FilterableObject<Team>[]) {
    teamsArrayToSort.sort((a, b) => a.objectData.id > b.objectData.id ? 1 : -1);
  }
}
