import { CountryEnum } from "../enums/country-enum";
import { StateEnum } from "../enums/state-enum";

export interface BillingInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: CountryEnum;
    state: StateEnum;
    city: string;
    address: string;
    zip: string;
}
