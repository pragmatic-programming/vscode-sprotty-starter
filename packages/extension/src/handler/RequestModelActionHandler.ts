import { RequestModelAction } from "sprotty-protocol";
import { AbstractWebViewActionHandler } from "./AbstractWebViewActionHandler";

export class RequestModelActionHandler extends AbstractWebViewActionHandler<RequestModelAction> {
    readonly kind = RequestModelAction.KIND;
}
