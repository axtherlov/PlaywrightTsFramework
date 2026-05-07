import { Computer } from "../model/computer";
import { ProcessorEnum } from "../enums/processor-enum";
import { RamEnum } from "../enums/ram-enum";
import { HddEnum } from "../enums/hdd-enum";
import { OSEnum } from "../enums/os-enum";
import { softwareEnum } from "../enums/software-enum";

export class ComputerData {
    /**
     * Builds a valid Computer configuration with default values.
     * Pass overrides to replace specific fields for variant tests.
     * @param {Partial<Computer>} overrides - Fields to override.
     * @returns {Computer}
     */
    static build(overrides?: Partial<Computer>): Computer {
        return {
            processor: ProcessorEnum.PENTIUM_OP1,
            ram: RamEnum.EIGHT,
            hdd: HddEnum.ADVANCED,
            os: OSEnum.VISTA_PREMIUM,
            software: softwareEnum.OFFICE,
            ...overrides,
        };
    }
}
