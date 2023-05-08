import * as vscode from "vscode";
import { SprottyVscodeExtension, SprottyWebview } from "sprotty-vscode";
import { SprottyDiagramIdentifier } from "sprotty-vscode-protocol";
import { Action, ComputedBoundsAction, DiagramServer, RequestModelAction } from "sprotty-protocol";
import { DiagramServices, IDiagramGenerator, IModelLayoutEngine } from "sprotty-protocol/lib/diagram-services";
import { RequestModelActionHandler } from "./handler/RequestModelActionHandler";
import { ComputedBoundsActionHandler } from "./handler/ComputedBoundsActionHandler";

export class DiagramExtension extends SprottyVscodeExtension {

    constructor(
        context: vscode.ExtensionContext,
        readonly layoutEngine: IModelLayoutEngine,
        readonly diagramGenerator: IDiagramGenerator
    ) {
        super("sprotty-starter", context);
    }

    protected createWebView(identifier: SprottyDiagramIdentifier): SprottyWebview {
        const webview = new SprottyWebview({
            extension: this,
            identifier,
            localResourceRoots: [this.getExtensionFileUri("pack")],
            scriptUri: this.getExtensionFileUri("pack", "webview.js"),
            singleton: true
        });
        this.connectWebViewWithDiagramServer(webview);
        return webview;
    }

    protected connectWebViewWithDiagramServer(webview: SprottyWebview) {
        const diagramServer = new DiagramServer(
            async <A extends Action>(action: A) => {
                await webview.dispatch(action);
            },
            this.diagramServices()
        );
        this.registerActionHandlers(webview, diagramServer);
    }

    protected diagramServices(): DiagramServices {
        return {
            DiagramGenerator: this.diagramGenerator,
            ModelLayoutEngine: this.layoutEngine,
        };
    }

    protected registerActionHandlers(webview: SprottyWebview, diagramServer: DiagramServer) {
        // every action which is sent by the webView (client) and should be handled by the diagramServer (server)
        // requires a custom ActionHandler that extends the AbstractWebViewActionHandler
        webview.actionHandlers.set(RequestModelAction.KIND, new RequestModelActionHandler(diagramServer));
        webview.actionHandlers.set(ComputedBoundsAction.KIND, new ComputedBoundsActionHandler(diagramServer));
    }

    protected getDiagramType(): string | Promise<string | undefined> | undefined {
        return "sprotty-starter-diagram";
    }

}
