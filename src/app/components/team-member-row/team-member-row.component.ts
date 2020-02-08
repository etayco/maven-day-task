import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TeamMember} from '../../classes/team-member';

@Component({
  selector: 'app-team-member-row',
  templateUrl: './team-member-row.component.html',
  styleUrls: ['./team-member-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamMemberRowComponent implements OnInit {
  @Input() teamMember: TeamMember;

  constructor() {
  }

  ngOnInit() {
  }
}
