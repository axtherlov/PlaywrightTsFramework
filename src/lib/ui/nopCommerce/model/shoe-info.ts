import { ColorOptionsEnum } from "../enums/color-options-enum";
import { ShoeSizeEnum } from "../enums/shoe-size-enum";
import { ShoePrintEnum } from "../enums/shoe-print-enum";

export interface ShoeInfo {
    size: ShoeSizeEnum;
    color: ColorOptionsEnum;
    print: ShoePrintEnum;
}
