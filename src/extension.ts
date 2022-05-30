import * as vscode from "vscode";
import ViewLoader from "./view/ViewLoader";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-react" is now active!');

  let disposable = vscode.commands.registerCommand(
    "extension.viewconfig",
    () => {
      let openDialogOptions: vscode.OpenDialogOptions = {
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        filters: {
          Json: ["json"],
        },
      };

      vscode.window
        .showOpenDialog(openDialogOptions)
        .then(async (uri: vscode.Uri[] | undefined) => {
          if (uri && uri.length > 0) {
            const view = new ViewLoader(uri[0], context.extensionPath);
          } else {
            vscode.window.showErrorMessage("No valid file selected!");
            return;
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
