import {Component, Input, OnInit} from '@angular/core';
import {TeamMember} from '../../classes/team-member';
import {CacheService} from '../../services/cache.service';

@Component({
  selector: 'app-team-member-row',
  templateUrl: './team-member-row.component.html',
  styleUrls: ['./team-member-row.component.css']
})
export class TeamMemberRowComponent implements OnInit {
  @Input() teamMember: TeamMember;

  constructor(public cacheService: CacheService) {
  }

  ngOnInit() {
  }

}
