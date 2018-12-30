import { Skill } from './skill';
import { Slot } from './slot';

export class Event {
    description: String;
    end_time: String;
    event_date: String
    id: number;
    key: String
    location: String
    name: String;
    skills: Array<Skill>;
    slots: Array<Slot>;
}