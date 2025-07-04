import {
  Cropper
} from "./chunk-RZC273KX.js";
import {
  CommonModule,
  NgIf
} from "./chunk-QUS4YK6H.js";
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  setClassMetadata,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-5B2X536L.js";
import "./chunk-SKRIDR4B.js";
import "./chunk-27RY7B3A.js";
import "./chunk-XDHHU5BE.js";
import {
  __spreadValues
} from "./chunk-APYJOV5E.js";

// node_modules/angular-cropperjs/fesm2020/angular-cropperjs.mjs
var _c0 = ["image"];
function CropperComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵelement(1, "div", 7);
    ɵɵelementEnd();
  }
}
function CropperComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.loadImageErrorText);
  }
}
var AngularCropperjsService = class {
  constructor() {
  }
};
AngularCropperjsService.ɵfac = function AngularCropperjsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AngularCropperjsService)();
};
AngularCropperjsService.ɵprov = ɵɵdefineInjectable({
  token: AngularCropperjsService,
  factory: AngularCropperjsService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularCropperjsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
var CropperComponent = class {
  constructor() {
    this.cropperOptions = {};
    this.export = new EventEmitter();
    this.ready = new EventEmitter();
    this.isLoading = true;
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
  }
  /**
   * Image loaded
   * @param ev
   */
  imageLoaded(ev) {
    this.loadError = false;
    const image = ev.target;
    this.imageElement = image;
    if (this.cropperOptions.checkCrossOrigin) image.crossOrigin = "anonymous";
    image.addEventListener("ready", () => {
      this.ready.emit(true);
      this.isLoading = false;
      if (this.cropbox) {
        this.cropper.setCropBoxData(this.cropbox);
      }
    });
    let aspectRatio = NaN;
    if (this.settings) {
      const {
        width,
        height
      } = this.settings;
      aspectRatio = width / height;
    }
    this.cropperOptions = __spreadValues(__spreadValues({}, {
      aspectRatio,
      checkCrossOrigin: true
    }), this.cropperOptions);
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = void 0;
    }
    this.cropper = new Cropper(image, this.cropperOptions);
  }
  /**
   * Image load error
   * @param event
   */
  imageLoadError(event) {
    this.loadError = true;
    this.isLoading = false;
  }
  /**
   * Export canvas
   * @param base64
   */
  exportCanvas(base64) {
    const imageData = this.cropper.getImageData();
    const cropData = this.cropper.getCropBoxData();
    const canvas = this.cropper.getCroppedCanvas();
    const data = {
      imageData,
      cropData
    };
    const promise = new Promise((resolve) => {
      if (base64) {
        return resolve({
          dataUrl: canvas.toDataURL("image/png")
        });
      }
      canvas.toBlob((blob) => resolve({
        blob
      }));
    });
    promise.then((res) => {
      this.export.emit(__spreadValues(__spreadValues({}, data), res));
    });
  }
};
CropperComponent.ɵfac = function CropperComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CropperComponent)();
};
CropperComponent.ɵcmp = ɵɵdefineComponent({
  type: CropperComponent,
  selectors: [["angular-cropper"]],
  viewQuery: function CropperComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.image = _t.first);
    }
  },
  inputs: {
    imageUrl: "imageUrl",
    settings: "settings",
    cropbox: "cropbox",
    loadImageErrorText: "loadImageErrorText",
    cropperOptions: "cropperOptions"
  },
  outputs: {
    export: "export",
    ready: "ready"
  },
  standalone: false,
  decls: 6,
  vars: 3,
  consts: [["image", ""], [1, "cropper-wrapper"], ["class", "loading-block", 4, "ngIf"], ["class", "alert alert-warning", 4, "ngIf"], [1, "cropper"], ["alt", "image", 3, "load", "error", "src"], [1, "loading-block"], [1, "spinner"], [1, "alert", "alert-warning"]],
  template: function CropperComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 1);
      ɵɵtemplate(1, CropperComponent_div_1_Template, 2, 0, "div", 2)(2, CropperComponent_div_2_Template, 2, 1, "div", 3);
      ɵɵelementStart(3, "div", 4)(4, "img", 5, 0);
      ɵɵlistener("load", function CropperComponent_Template_img_load_4_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.imageLoaded($event));
      })("error", function CropperComponent_Template_img_error_4_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.imageLoadError($event));
      });
      ɵɵelementEnd()()();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.isLoading);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.loadError);
      ɵɵadvance(2);
      ɵɵproperty("src", ctx.imageUrl, ɵɵsanitizeUrl);
    }
  },
  dependencies: [NgIf],
  styles: [':host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:cssload-spin 425ms infinite linear;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:cssload-spin 425ms infinite linear}@keyframes cssload-spin{to{transform:rotate(360deg)}}/*!\n * Cropper.js v1.4.1\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2018-07-15T09:54:43.167Z\n */.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{inset:0;position:absolute}.cropper-wrap-box,.cropper-canvas{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline-color:#3399ffbf;outline:1px solid #39f;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:before,.cropper-center:after{background-color:#eee;content:" ";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width: 768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width: 992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width: 1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:" ";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}\n'],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CropperComponent, [{
    type: Component,
    args: [{
      selector: "angular-cropper",
      encapsulation: ViewEncapsulation.None,
      template: '<!-- CROPPER WRAPPER -->\n<div class="cropper-wrapper">\n\n    <!-- LOADING -->\n    <div class="loading-block" *ngIf="isLoading">\n        <div class="spinner"></div>\n    </div>\n\n    <!-- LOAD ERROR -->\n    <div class="alert alert-warning" *ngIf="loadError">{{ loadImageErrorText }}</div>\n\n    <!-- CROPPER -->\n    <div class="cropper">\n        <img #image alt="image" [src]="imageUrl" (load)="imageLoaded($event)" (error)="imageLoadError($event)" />\n    </div>\n</div>\n',
      styles: [':host{display:block}.cropper img{max-width:100%;max-height:100%;height:auto}.cropper-wrapper{position:relative;min-height:80px}.cropper-wrapper .loading-block{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-wrapper .loading-block .spinner{width:31px;height:31px;margin:0 auto;border:2px solid rgba(97,100,193,.98);border-radius:50%;border-left-color:transparent;border-right-color:transparent;-webkit-animation:cssload-spin 425ms infinite linear;position:absolute;top:calc(50% - 15px);left:calc(50% - 15px);animation:cssload-spin 425ms infinite linear}@keyframes cssload-spin{to{transform:rotate(360deg)}}/*!\n * Cropper.js v1.4.1\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2018-07-15T09:54:43.167Z\n */.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{inset:0;position:absolute}.cropper-wrap-box,.cropper-canvas{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline-color:#3399ffbf;outline:1px solid #39f;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:calc(100% / 3);left:0;top:calc(100% / 3);width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:calc(100% / 3);top:0;width:calc(100% / 3)}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:before,.cropper-center:after{background-color:#eee;content:" ";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width: 768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width: 992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width: 1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:" ";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}\n']
    }]
  }], function() {
    return [];
  }, {
    image: [{
      type: ViewChild,
      args: ["image", {
        static: true
      }]
    }],
    imageUrl: [{
      type: Input
    }],
    settings: [{
      type: Input
    }],
    cropbox: [{
      type: Input
    }],
    loadImageErrorText: [{
      type: Input
    }],
    cropperOptions: [{
      type: Input
    }],
    export: [{
      type: Output
    }],
    ready: [{
      type: Output
    }]
  });
})();
var AngularCropperjsModule = class {
};
AngularCropperjsModule.ɵfac = function AngularCropperjsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AngularCropperjsModule)();
};
AngularCropperjsModule.ɵmod = ɵɵdefineNgModule({
  type: AngularCropperjsModule,
  declarations: [CropperComponent],
  imports: [CommonModule],
  exports: [CropperComponent]
});
AngularCropperjsModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularCropperjsModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [CropperComponent],
      exports: [CropperComponent]
    }]
  }], null, null);
})();
export {
  AngularCropperjsModule,
  AngularCropperjsService,
  CropperComponent
};
//# sourceMappingURL=angular-cropperjs.js.map
