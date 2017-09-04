export class SideBarData {
    week: WeekData[];
    dates: Dates [];
}
export class Dates {
    date: string;
    start_time: string;
    end_time: string;
    hours_completed: string;
    status_flag: string;
    start_edit_flag: boolean;
    end_edit_flag: boolean;
    week_no: number;
    error : string;
}

export class WeekData {
    week_name: string;
    is_current: boolean;
    is_previous: boolean;
    week_no: number;
    week_range: WeekRange;
    total_hours: number;

}

export class WeekRange {
    start_date: string;
    end_date: string;
}

