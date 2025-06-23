import {
  getDroppedFiles,
  isDragDropSupported,
  toArray_default
} from "./chunk-ONTW7GGY.js";
import {
  UIPlugin_default
} from "./chunk-GELW2I2L.js";
import "./chunk-NSZ4VRGI.js";
import {
  y
} from "./chunk-XMU66BJW.js";
import {
  __async,
  __spreadValues
} from "./chunk-APYJOV5E.js";

// node_modules/@uppy/drag-drop/lib/locale.js
var locale_default = {
  strings: {
    // Text to show on the droppable area.
    // `%{browse}` is replaced with a link that opens the system file selection dialog.
    dropHereOr: "Drop here or %{browse}",
    // Used as the label for the link that opens the system file selection dialog.
    browse: "browse"
  }
};

// node_modules/@uppy/drag-drop/lib/DragDrop.js
var packageJson = {
  "version": "3.1.0"
};
var defaultOptions = {
  inputName: "files[]",
  width: "100%",
  height: "100%"
};
var DragDrop = class _DragDrop extends UIPlugin_default {
  constructor(uppy, opts) {
    super(uppy, __spreadValues(__spreadValues({}, defaultOptions), opts));
    this.isDragDropSupported = isDragDropSupported();
    this.addFiles = (files) => {
      const descriptors = files.map((file) => ({
        source: this.id,
        name: file.name,
        type: file.type,
        data: file,
        meta: {
          // path of the file relative to the ancestor directory the user selected.
          // e.g. 'docs/Old Prague/airbnb.pdf'
          relativePath: file.relativePath || null
        }
      }));
      try {
        this.uppy.addFiles(descriptors);
      } catch (err) {
        this.uppy.log(err);
      }
    };
    this.onInputChange = (event) => {
      const files = toArray_default(event.target.files);
      if (files.length > 0) {
        this.uppy.log("[DragDrop] Files selected through input");
        this.addFiles(files);
      }
      event.target.value = null;
    };
    this.handleDragOver = (event) => {
      var _this$opts$onDragOver, _this$opts;
      event.preventDefault();
      event.stopPropagation();
      const {
        types
      } = event.dataTransfer;
      const hasFiles = types.some((type) => type === "Files");
      const {
        allowNewUpload
      } = this.uppy.getState();
      if (!hasFiles || !allowNewUpload) {
        event.dataTransfer.dropEffect = "none";
        clearTimeout(this.removeDragOverClassTimeout);
        return;
      }
      event.dataTransfer.dropEffect = "copy";
      clearTimeout(this.removeDragOverClassTimeout);
      this.setPluginState({
        isDraggingOver: true
      });
      (_this$opts$onDragOver = (_this$opts = this.opts).onDragOver) == null || _this$opts$onDragOver.call(_this$opts, event);
    };
    this.handleDragLeave = (event) => {
      var _this$opts$onDragLeav, _this$opts2;
      event.preventDefault();
      event.stopPropagation();
      clearTimeout(this.removeDragOverClassTimeout);
      this.removeDragOverClassTimeout = setTimeout(() => {
        this.setPluginState({
          isDraggingOver: false
        });
      }, 50);
      (_this$opts$onDragLeav = (_this$opts2 = this.opts).onDragLeave) == null || _this$opts$onDragLeav.call(_this$opts2, event);
    };
    this.handleDrop = (event) => __async(this, null, function* () {
      var _this$opts$onDrop, _this$opts3;
      event.preventDefault();
      event.stopPropagation();
      clearTimeout(this.removeDragOverClassTimeout);
      this.setPluginState({
        isDraggingOver: false
      });
      const logDropError = (error) => {
        this.uppy.log(error, "error");
      };
      const files = yield getDroppedFiles(event.dataTransfer, {
        logDropError
      });
      if (files.length > 0) {
        this.uppy.log("[DragDrop] Files dropped");
        this.addFiles(files);
      }
      (_this$opts$onDrop = (_this$opts3 = this.opts).onDrop) == null || _this$opts$onDrop.call(_this$opts3, event);
    });
    this.type = "acquirer";
    this.id = this.opts.id || "DragDrop";
    this.title = "Drag & Drop";
    this.defaultLocale = locale_default;
    this.i18nInit();
  }
  renderHiddenFileInput() {
    const {
      restrictions
    } = this.uppy.opts;
    return y("input", {
      className: "uppy-DragDrop-input",
      type: "file",
      hidden: true,
      ref: (ref) => {
        this.fileInputRef = ref;
      },
      name: this.opts.inputName,
      multiple: restrictions.maxNumberOfFiles !== 1,
      accept: restrictions.allowedFileTypes,
      onChange: this.onInputChange
    });
  }
  static renderArrowSvg() {
    return y("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon uppy-DragDrop-arrow",
      width: "16",
      height: "16",
      viewBox: "0 0 16 16"
    }, y("path", {
      d: "M11 10V0H5v10H2l6 6 6-6h-3zm0 0",
      fillRule: "evenodd"
    }));
  }
  renderLabel() {
    return y("div", {
      className: "uppy-DragDrop-label"
    }, this.i18nArray("dropHereOr", {
      browse: y("span", {
        className: "uppy-DragDrop-browse"
      }, this.i18n("browse"))
    }));
  }
  renderNote() {
    return y("span", {
      className: "uppy-DragDrop-note"
    }, this.opts.note);
  }
  render() {
    const dragDropClass = `uppy-u-reset
      uppy-DragDrop-container
      ${this.isDragDropSupported ? "uppy-DragDrop--isDragDropSupported" : ""}
      ${this.getPluginState().isDraggingOver ? "uppy-DragDrop--isDraggingOver" : ""}
    `;
    const dragDropStyle = {
      width: this.opts.width,
      height: this.opts.height
    };
    return y("button", {
      type: "button",
      className: dragDropClass,
      style: dragDropStyle,
      onClick: () => this.fileInputRef.click(),
      onDragOver: this.handleDragOver,
      onDragLeave: this.handleDragLeave,
      onDrop: this.handleDrop
    }, this.renderHiddenFileInput(), y("div", {
      className: "uppy-DragDrop-inner"
    }, _DragDrop.renderArrowSvg(), this.renderLabel(), this.renderNote()));
  }
  install() {
    const {
      target
    } = this.opts;
    this.setPluginState({
      isDraggingOver: false
    });
    if (target) {
      this.mount(target, this);
    }
  }
  uninstall() {
    this.unmount();
  }
};
DragDrop.VERSION = packageJson.version;
export {
  DragDrop as default
};
//# sourceMappingURL=@uppy_drag-drop.js.map
