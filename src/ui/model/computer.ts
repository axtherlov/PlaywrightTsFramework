import { ProcessorEnum } from "../enums/processor-enum";
import { RamEnum } from "../enums/ram-enum";
import { HddEnum } from '../enums/hdd-enum';
import { OSEnum } from '../enums/os-enum';
import { softwareEnum } from '../enums/software-enum';

export interface Computer {
    processor: ProcessorEnum,
    ram: RamEnum,
    hdd: HddEnum,
    os: OSEnum,
    software: softwareEnum
}