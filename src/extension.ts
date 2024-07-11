// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// @ts-ignore
const { parse } = require('./parser');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand(
        'emmet-file.track',
        () => {
            const current_folder = vscode.workspace.getWorkspaceFolder(
                vscode.window.activeTextEditor!.document.uri
            )!;
            const watcher = vscode.workspace.createFileSystemWatcher(
                new vscode.RelativePattern(current_folder, '**/*'),
                false,
                false,
                false
            );

            watcher.onDidCreate((e) => {
                const edit = new vscode.WorkspaceEdit();
                let parent: string | string[] = e.path.split('/')!;
                parent.pop();
                parent = parent.join('/').substring(1);
                const abbr = e.path.split('/').at(-1)!;
                let filelist;
                try {
                    filelist = <string[]>parse(abbr);
                    console.log(abbr, filelist);
                } catch (err) {
                    vscode.window.showInformationMessage('Failed Parse :(');
                    return;
                }
                for (const file of filelist) {
                    const create = vscode.Uri.joinPath(
                        vscode.Uri.file(parent),
                        file
                    );
                    edit.createFile(create);
                }
                edit.deleteFile(e);
                vscode.workspace.applyEdit(edit);
            });
        }
    );

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
