// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spawnSync } from 'child_process';

let statusBarItem: vscode.StatusBarItem | undefined;
let refreshCommand: vscode.Disposable | undefined;
let timer: NodeJS.Timer | undefined;

function getNodeVersion() {
	if (!statusBarItem) {
		console.log('[show-node-version]: 无法获取到状态栏实例');
		return;
	}
	const info = spawnSync('node', ['--version']);
	const version = info.stdout.toString();
	statusBarItem.text = `Node ${version}`;
}

export function activate(context: vscode.ExtensionContext) {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	statusBarItem.show();

	refreshCommand = vscode.commands.registerCommand('show-nodejs-version.refresh', getNodeVersion);

	context.subscriptions.push(statusBarItem, refreshCommand);

	timer = setInterval(() => {
		getNodeVersion();
	}, 1500);
}

export function deactivate() {
	statusBarItem?.dispose();
	refreshCommand?.dispose();
	clearInterval(timer);
}
