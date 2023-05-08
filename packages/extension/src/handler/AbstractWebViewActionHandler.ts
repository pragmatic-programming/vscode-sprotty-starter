import { ActionHandler } from "sprotty-vscode/lib/action-handler";
import { Action, DiagramServer } from "sprotty-protocol";

export abstract class AbstractWebViewActionHandler<T extends Action> implements ActionHandler {
    abstract readonly kind: string;

    constructor(readonly diagramServer: DiagramServer) {
    }

    async handleAction(action: T): Promise<boolean> {
        await this.diagramServer.accept(action);
        return Promise.resolve(true);
    }

}
