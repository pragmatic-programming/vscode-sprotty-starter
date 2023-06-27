import { WebviewEndpoint, WebviewPanelManager, WebviewPanelManagerOptions } from "sprotty-vscode";
import { SprottyDiagramIdentifier } from "sprotty-vscode-protocol";
import {
    Action,
    ComputedBoundsAction,
    DiagramServer,
    DiagramServices,
    IModelLayoutEngine,
    RequestModelAction
} from "sprotty-protocol";
import * as vscode from "vscode";
import { Disposable } from "vscode";
import { DiagramGenerator } from "./DiagramGenerator";

export class WebView extends WebviewPanelManager {

    protected readonly disposables: Disposable[] = [];

    constructor(
        readonly options: WebviewPanelManagerOptions,
        readonly context: vscode.ExtensionContext,
        protected layoutEngineFactory: () => IModelLayoutEngine,
    ) {
        super(options);
    }

    protected createEndpoint(identifier: SprottyDiagramIdentifier): WebviewEndpoint {
        const webviewContainer = this.createWebview(identifier);
        const participant = this.messenger.registerWebviewPanel(webviewContainer);
        const endpoint: WebviewEndpoint = new WebviewEndpoint({
            webviewContainer,
            messenger: this.messenger,
            messageParticipant: participant,
            identifier,
            diagramServerFactory: (dispatch: <A extends Action>(action: A) => Promise<void>): DiagramServer => {
                return new DiagramServer(
                    dispatch,
                    this.diagramServices()
                );
            }
        });
        this.connectEndpointWithDiagramServer(endpoint);
        return endpoint;
    }

    protected diagramServices(): DiagramServices {
        return {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            DiagramGenerator: new DiagramGenerator(),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ModelLayoutEngine: this.layoutEngineFactory(),
        };
    }

    protected didCloseWebview(endpoint: WebviewEndpoint): void {
        this.disposables.forEach(disposable => {
            disposable.dispose();
        });
        super.didCloseWebview(endpoint);
    }

    private connectEndpointWithDiagramServer(endpoint: WebviewEndpoint): void {
        const handler = async (action: Action): Promise<void> => {
            if (!endpoint.diagramServer) {
                throw Error("DiagramServer not set");
            }
            return endpoint.diagramServer.accept(action);
        };
        endpoint.addActionHandler(ComputedBoundsAction.KIND, handler);
        endpoint.addActionHandler(RequestModelAction.KIND, handler);
    }

}
