import { gme } from "./res/get-endpoints";
export { gme };
/**
 * MagicRq
 * * Also known as the thing that makes this work
 *
 * @type {MagicRq}
 */
declare class MagicRq {
    method: string | undefined;
    resource: string | undefined;
    get: (rsrc: string) => this;
    data: (queryObject: Record<string, unknown>) => Promise<undefined>;
}
/**
 * v0.1.0 Exports
 *
 * @type {any}
 */
export { MagicRq as easyttvRq };
