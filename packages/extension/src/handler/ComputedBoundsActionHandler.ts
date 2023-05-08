import { ComputedBoundsAction } from "sprotty-protocol";
import { AbstractWebViewActionHandler } from "./AbstractWebViewActionHandler";

export class ComputedBoundsActionHandler extends AbstractWebViewActionHandler<ComputedBoundsAction> {
    readonly kind = ComputedBoundsAction.KIND;
}
