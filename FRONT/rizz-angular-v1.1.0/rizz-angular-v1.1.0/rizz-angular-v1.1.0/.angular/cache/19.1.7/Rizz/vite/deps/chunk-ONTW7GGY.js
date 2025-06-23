import {
  __async,
  __asyncGenerator,
  __await,
  __forAwait,
  __yieldStar
} from "./chunk-APYJOV5E.js";

// node_modules/@uppy/utils/lib/toArray.js
var toArray_default = Array.from;

// node_modules/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js
function getFilesAndDirectoriesFromDirectory(directoryReader, oldEntries, logDropError, _ref) {
  let {
    onSuccess
  } = _ref;
  directoryReader.readEntries(
    (entries) => {
      const newEntries = [...oldEntries, ...entries];
      if (entries.length) {
        queueMicrotask(() => {
          getFilesAndDirectoriesFromDirectory(directoryReader, newEntries, logDropError, {
            onSuccess
          });
        });
      } else {
        onSuccess(newEntries);
      }
    },
    // Make sure we resolve on error anyway, it's fine if only one directory couldn't be parsed!
    (error) => {
      logDropError(error);
      onSuccess(oldEntries);
    }
  );
}

// node_modules/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/index.js
function getAsFileSystemHandleFromEntry(entry, logDropError) {
  if (entry == null) return entry;
  return {
    kind: (
      // eslint-disable-next-line no-nested-ternary
      entry.isFile ? "file" : entry.isDirectory ? "directory" : void 0
    ),
    name: entry.name,
    getFile() {
      return new Promise((resolve, reject) => entry.file(resolve, reject));
    },
    values() {
      return __asyncGenerator(this, null, function* () {
        const directoryReader = entry.createReader();
        const entries = yield new __await(new Promise((resolve) => {
          getFilesAndDirectoriesFromDirectory(directoryReader, [], logDropError, {
            onSuccess: (dirEntries) => resolve(dirEntries.map((file) => getAsFileSystemHandleFromEntry(file, logDropError)))
          });
        }));
        yield* __yieldStar(entries);
      });
    },
    isSameEntry: void 0
  };
}
function createPromiseToAddFileOrParseDirectory(entry, relativePath, lastResortFile) {
  try {
    if (lastResortFile === void 0) {
      lastResortFile = void 0;
    }
    return function() {
      return __asyncGenerator(this, null, function* () {
        const getNextRelativePath = () => `${relativePath}/${entry.name}`;
        if (entry.kind === "file") {
          const file = yield new __await(entry.getFile());
          if (file != null) {
            ;
            file.relativePath = relativePath ? getNextRelativePath() : null;
            yield file;
          } else if (lastResortFile != null) yield lastResortFile;
        } else if (entry.kind === "directory") {
          try {
            for (var iter = __forAwait(entry.values()), more, temp, error; more = !(temp = yield new __await(iter.next())).done; more = false) {
              const handle = temp.value;
              yield* __yieldStar(createPromiseToAddFileOrParseDirectory(handle, relativePath ? getNextRelativePath() : entry.name));
            }
          } catch (temp) {
            error = [temp];
          } finally {
            try {
              more && (temp = iter.return) && (yield new __await(temp.call(iter)));
            } finally {
              if (error)
                throw error[0];
            }
          }
        } else if (lastResortFile != null) yield lastResortFile;
      });
    }();
  } catch (e) {
    return Promise.reject(e);
  }
}
function getFilesFromDataTransfer(dataTransfer, logDropError) {
  return __asyncGenerator(this, null, function* () {
    const fileSystemHandles = yield new __await(Promise.all(Array.from(dataTransfer.items, (item) => __async(this, null, function* () {
      var _fileSystemHandle;
      let fileSystemHandle;
      const getAsEntry = () => typeof item.getAsEntry === "function" ? item.getAsEntry() : item.webkitGetAsEntry();
      (_fileSystemHandle = fileSystemHandle) != null ? _fileSystemHandle : fileSystemHandle = getAsFileSystemHandleFromEntry(getAsEntry(), logDropError);
      return {
        fileSystemHandle,
        lastResortFile: item.getAsFile()
        // can be used as a fallback in case other methods fail
      };
    }))));
    for (const {
      lastResortFile,
      fileSystemHandle
    } of fileSystemHandles) {
      if (fileSystemHandle != null) {
        try {
          yield* __yieldStar(createPromiseToAddFileOrParseDirectory(fileSystemHandle, "", lastResortFile));
        } catch (err) {
          if (lastResortFile != null) {
            yield lastResortFile;
          } else {
            logDropError(err);
          }
        }
      } else if (lastResortFile != null) yield lastResortFile;
    }
  });
}

// node_modules/@uppy/utils/lib/getDroppedFiles/utils/fallbackApi.js
function fallbackApi(dataTransfer) {
  const files = toArray_default(dataTransfer.files);
  return Promise.resolve(files);
}

// node_modules/@uppy/utils/lib/getDroppedFiles/index.js
function getDroppedFiles(dataTransfer, options) {
  return __async(this, null, function* () {
    var _options$logDropError;
    const logDropError = (_options$logDropError = options == null ? void 0 : options.logDropError) != null ? _options$logDropError : Function.prototype;
    try {
      const accumulator = [];
      try {
        for (var iter = __forAwait(getFilesFromDataTransfer(dataTransfer, logDropError)), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const file = temp.value;
          accumulator.push(file);
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      return accumulator;
    } catch {
      return fallbackApi(dataTransfer);
    }
  });
}

// node_modules/@uppy/utils/lib/isDragDropSupported.js
function isDragDropSupported() {
  const div = document.body;
  if (!("draggable" in div) || !("ondragstart" in div && "ondrop" in div)) {
    return false;
  }
  if (!("FormData" in window)) {
    return false;
  }
  if (!("FileReader" in window)) {
    return false;
  }
  return true;
}

export {
  toArray_default,
  getDroppedFiles,
  isDragDropSupported
};
//# sourceMappingURL=chunk-ONTW7GGY.js.map
