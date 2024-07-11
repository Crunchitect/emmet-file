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
            try {
                const current_uri =
                    vscode.window.activeTextEditor!.document.uri;
            } catch {
                vscode.window.showInformationMessage(
                    'Please make an active file to parse your directory!'
                );
            }
            const encoder = new TextEncoder();
            const current_folder = vscode.workspace.getWorkspaceFolder(
                vscode.window.activeTextEditor!.document.uri
            )!;
            const watcher = vscode.workspace.createFileSystemWatcher(
                new vscode.RelativePattern(current_folder, '**/*'),
                false,
                false,
                false
            );
            vscode.window.showInformationMessage('Tracking Enabled!');
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
                    vscode.window.showInformationMessage('Invalid Parsing!');
                    return;
                }
                for (const file of filelist) {
                    const [filename, filecontents] = <
                        [string, string | undefined]
                    >file.split('{');
                    const create = vscode.Uri.joinPath(
                        vscode.Uri.file(parent),
                        filename
                    );
                    edit.createFile(
                        create,
                        filecontents
                            ? {
                                  contents: encoder.encode(
                                      filecontents.slice(0, -1)
                                  ),
                              }
                            : undefined
                    );
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
