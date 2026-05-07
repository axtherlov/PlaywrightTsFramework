import { faker } from "@faker-js/faker";
import { BillingInfo } from "../model/billing-info";
import { CountryEnum } from "../enums/country-enum";
import { StateEnum } from "../enums/state-enum";

export class BillingData {
    /**
     * Builds a valid BillingInfo object with randomized values.
     * Pass overrides to replace specific fields.
     * @param {Partial<BillingInfo>} overrides - Fields to override.
     * @returns {BillingInfo}
     */
    static build(overrides?: Partial<BillingInfo>): BillingInfo {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number({ style: "national" }),
            country: CountryEnum.USA,
            state: StateEnum.ALABAMA,
            city: faker.location.city(),
            address: faker.location.streetAddress(),
            zip: faker.location.zipCode("#####"),
            ...overrides,
        };
    }
}
