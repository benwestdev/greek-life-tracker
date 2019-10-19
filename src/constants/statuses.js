import moment from "moment";

export const PENDING = "Pending Approval";
export const APPROVED = "Approved";
export const DENIED = "Denied";

export const ALPHA_TYPE = "Alpha Gam";
export const COM_SERVICE_TYPE = "Community Service";
export const SISTERHOOD_TYPE = "Sisterhood";

export const EVENT_TYPES_MAP = {};
EVENT_TYPES_MAP[ALPHA_TYPE] = 0;
EVENT_TYPES_MAP[COM_SERVICE_TYPE] = 0;
EVENT_TYPES_MAP[SISTERHOOD_TYPE] = 0;

export const TODAY = moment(new Date()).format("MM-DD-YYYY");
