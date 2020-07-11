import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getWorkspace } from '@schematics/angular/utility/config';
import {
  BrowserBuilderTarget,
  TestBuilderTarget,
  WorkspaceProject,
  WorkspaceSchema,
} from '@schematics/angular/utility/workspace-models';

interface Schema {
  project: string;
}

export default function(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const kanjiVgPackageJson = require('../../package.json');

    addPackageToPackageJson(host, '@madcat/kanjivg', kanjiVgPackageJson.peerDependencies['@madcat/kanjivg']);
    addPackageToPackageJson(host, '@madcat/kanjivg-ng', kanjiVgPackageJson.version);
    context.addTask(new NodePackageInstallTask());

    const workspaceConfig = host.read('/angular.json');
    if (!workspaceConfig) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }

    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    addKanjiVgToAssets(project);

    host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
  };
}

export function addPackageToPackageJson(host: Tree, pkg: string, version: string): void {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.dependencies) {
      json.dependencies = {};
    }

    if (!json.dependencies[pkg]) {
      json.dependencies[pkg] = version;
      json.dependencies = sortObjectByKeys(json.dependencies);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }
}

function getProjectFromWorkspace(workspace: WorkspaceSchema, projectName?: string): WorkspaceProject {
  const project = workspace.projects[projectName || workspace.defaultProject!];

  if (!project) {
    throw new SchematicsException(`Could not find project in workspace: ${projectName}`);
  }

  return project;
}

function sortObjectByKeys(obj: { [key: string]: string }): { [key: string]: string } {
  const sortedKeys = Object.keys(obj).sort();

  const sortedObj: { [key: string]: string } = {};
  for (const key of sortedKeys) {
    sortedObj[key] = obj[key];
  }

  return sortedObj;
}

function addKanjiVgToAssets(project: WorkspaceProject): void {
  const kanjiVgAssets = {
    glob: '*.svg',
    input: 'node_modules/@madcat/kanjivg/dist/min/main',
    output: 'kanjivg',
  };


  if (project.architect?.build) {
    addToAssets(project.architect.build, kanjiVgAssets);
  }
  if (project.architect?.test) {
    addToAssets(project.architect.test, kanjiVgAssets);
  }
}

function addToAssets(target: BrowserBuilderTarget | TestBuilderTarget, asset: string | object): void {
  target.options.assets = target.options.assets || [];
  target.options.assets!.push(asset);
}
