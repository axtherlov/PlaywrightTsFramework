import { RegistrationInfo } from "../model/registration-info";
import { faker } from "@faker-js/faker";

export class RegistrationData {
    /**
     * Builds a valid RegistrationInfo object with randomized values.
     * Pass overrides to replace specific fields for negative or edge-case tests.
     * @param {Partial<RegistrationInfo>} overrides - Fields to override.
     * @returns {RegistrationInfo}
     */
    static build(overrides?: Partial<RegistrationInfo>): RegistrationInfo {
        return {
            gender: faker.helpers.arrayElement(["Male", "Female"]),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12, memorable: false }),
            ...overrides,
        };
    }
}
