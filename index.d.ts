interface webpackResolver {
  apply(resolver: any): void;
}

type FileExts = string[];

declare class ExtensionPipeResolvePlugin implements webpackResolver {
  constructor(extension: string, includes: FileExts): void;
  apply(resolver: any) {}
}
