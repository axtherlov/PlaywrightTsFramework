import { ShoeInfo } from "../model/shoe-info";
import { ShoeSizeEnum } from "../enums/shoe-size-enum";
import { ColorOptionsEnum } from "../enums/color-options-enum";
import { ShoePrintEnum } from "../enums/shoe-print-enum";

export class ShoeData {
    /**
     * Builds a ShoeInfo object with a default size.
     * Pass overrides to specify a different size.
     * @param {Partial<ShoeInfo>} overrides - Fields to override.
     * @returns {ShoeInfo}
     */
    static build(overrides?: Partial<ShoeInfo>): ShoeInfo {
        return {
            size: ShoeSizeEnum.SIZE_9,
            color: ColorOptionsEnum.WHITE_BLUE,
            print: ShoePrintEnum.NATURAL,
            ...overrides,
        };
    }
}
