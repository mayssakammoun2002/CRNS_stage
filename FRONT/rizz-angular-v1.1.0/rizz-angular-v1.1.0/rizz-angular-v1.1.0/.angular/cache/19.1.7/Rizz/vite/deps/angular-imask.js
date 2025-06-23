import {
  IMask,
  PIPE_TYPE,
  pipe
} from "./chunk-XMXMGJ37.js";
import {
  COMPOSITION_BUFFER_MODE,
  NG_VALUE_ACCESSOR
} from "./chunk-G3K6QEU2.js";
import {
  isPlatformBrowser
} from "./chunk-QUS4YK6H.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Output,
  PLATFORM_ID,
  Pipe,
  Renderer2,
  forwardRef,
  inject,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵlistener
} from "./chunk-5B2X536L.js";
import "./chunk-SKRIDR4B.js";
import "./chunk-27RY7B3A.js";
import "./chunk-XDHHU5BE.js";
import "./chunk-APYJOV5E.js";

// node_modules/angular-imask/fesm2022/angular-imask.mjs
var DefaultImaskFactory = class _DefaultImaskFactory {
  create(el, opts) {
    return IMask(el, opts);
  }
  static {
    this.ɵfac = function DefaultImaskFactory_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DefaultImaskFactory)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _DefaultImaskFactory,
      factory: _DefaultImaskFactory.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultImaskFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var IMASK_FACTORY = new InjectionToken("IMASK_FACTORY", {
  providedIn: "root",
  factory: () => inject(DefaultImaskFactory)
});
var MASKEDINPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IMaskDirective),
  multi: true
};
var DEFAULT_IMASK_ELEMENT = (elementRef) => elementRef.nativeElement;
var IMaskDirective = class _IMaskDirective {
  constructor() {
    this.onTouched = () => {
    };
    this.onChange = () => {
    };
    this._viewInitialized = false;
    this._composing = false;
    this._writing = false;
    this._elementRef = inject(ElementRef);
    this._renderer = inject(Renderer2);
    this._factory = inject(IMASK_FACTORY);
    this._platformId = inject(PLATFORM_ID);
    this._compositionMode = inject(COMPOSITION_BUFFER_MODE, {
      optional: true
    }) ?? !this._isAndroid();
    this.imaskElement = DEFAULT_IMASK_ELEMENT;
    this.accept = new EventEmitter();
    this.complete = new EventEmitter();
  }
  get element() {
    return this.imaskElement(this._elementRef, this);
  }
  get maskValue() {
    if (!this.maskRef) return this.element?.value || "";
    if (this.unmask === "typed") return this.maskRef.typedValue;
    if (this.unmask) return this.maskRef.unmaskedValue;
    return this.maskRef.value;
  }
  set maskValue(value) {
    if (this.maskRef) {
      if (this.unmask === "typed") this.maskRef.typedValue = value;
      else if (this.unmask) this.maskRef.unmaskedValue = value;
      else this.maskRef.value = value;
    } else {
      this._renderer.setProperty(this.element, "value", value);
    }
  }
  ngAfterViewInit() {
    if (this.imask) this.initMask();
    this._viewInitialized = true;
  }
  ngOnChanges(changes) {
    if (changes["elementRef"] && !this.imaskElement) this.imaskElement = DEFAULT_IMASK_ELEMENT;
    if (!changes["imask"] || !this._viewInitialized) return;
    if (this.imask) {
      if (this.maskRef) this.maskRef.updateOptions(this.imask);
      else {
        this.initMask();
        this.onChange(this.maskValue);
      }
    } else {
      this.destroyMask();
    }
  }
  destroyMask() {
    if (this.maskRef) {
      this.maskRef.destroy();
      delete this.maskRef;
    }
  }
  ngOnDestroy() {
    this.destroyMask();
    this.accept.complete();
    this.complete.complete();
  }
  beginWrite(value) {
    this._writing = true;
    this._writingValue = value;
  }
  endWrite() {
    this._writing = false;
    return this._writingValue;
  }
  writeValue(value) {
    value = value == null && this.unmask !== "typed" ? "" : value;
    if (this.maskRef) {
      this.beginWrite(value);
      this.maskValue = value;
      this.endWrite();
    } else {
      this._renderer.setProperty(this.element, "value", value);
      this._initialValue = value;
    }
  }
  _onAccept() {
    const value = this.maskValue;
    if (this._writing && value === this.endWrite()) return;
    this.onChange(value);
    this.accept.emit(value);
  }
  _onComplete() {
    this.complete.emit(this.maskValue);
  }
  initMask() {
    this.maskRef = this._factory.create(this.element, this.imask).on("accept", this._onAccept.bind(this)).on("complete", this._onComplete.bind(this));
    if (this._initialValue != null) this.writeValue(this._initialValue);
    delete this._initialValue;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this.element, "disabled", isDisabled);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  _handleInput(value) {
    if (this.maskRef) return;
    if (!this._compositionMode || this._compositionMode && !this._composing) {
      this.onChange(value);
    }
  }
  _compositionStart() {
    this._composing = true;
  }
  _compositionEnd(value) {
    this._composing = false;
    this._compositionMode && this._handleInput(value);
  }
  _isAndroid() {
    return isPlatformBrowser(this._platformId) && /android (\d+)/.test(navigator.userAgent.toLowerCase());
  }
  static {
    this.ɵfac = function IMaskDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IMaskDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _IMaskDirective,
      selectors: [["", "imask", ""]],
      hostBindings: function IMaskDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("input", function IMaskDirective_input_HostBindingHandler($event) {
            return ctx._handleInput($event.target.value);
          })("blur", function IMaskDirective_blur_HostBindingHandler() {
            return ctx.onTouched();
          })("compositionstart", function IMaskDirective_compositionstart_HostBindingHandler() {
            return ctx._compositionStart();
          })("compositionend", function IMaskDirective_compositionend_HostBindingHandler($event) {
            return ctx._compositionEnd($event.target.value);
          });
        }
      },
      inputs: {
        imask: "imask",
        unmask: "unmask",
        imaskElement: "imaskElement"
      },
      outputs: {
        accept: "accept",
        complete: "complete"
      },
      exportAs: ["imask"],
      features: [ɵɵProvidersFeature([MASKEDINPUT_VALUE_ACCESSOR]), ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IMaskDirective, [{
    type: Directive,
    args: [{
      selector: "[imask]",
      standalone: true,
      exportAs: "imask",
      host: {
        "(input)": "_handleInput($event.target.value)",
        "(blur)": "onTouched()",
        "(compositionstart)": "_compositionStart()",
        "(compositionend)": "_compositionEnd($event.target.value)"
      },
      providers: [MASKEDINPUT_VALUE_ACCESSOR]
    }]
  }], null, {
    imask: [{
      type: Input
    }],
    unmask: [{
      type: Input
    }],
    imaskElement: [{
      type: Input
    }],
    accept: [{
      type: Output
    }],
    complete: [{
      type: Output
    }]
  });
})();
var IMaskPipe = class _IMaskPipe {
  transform(...args) {
    return pipe(...args);
  }
  static {
    this.ɵfac = function IMaskPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IMaskPipe)();
    };
  }
  static {
    this.ɵpipe = ɵɵdefinePipe({
      name: "imask",
      type: _IMaskPipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IMaskPipe, [{
    type: Pipe,
    args: [{
      name: "imask",
      standalone: true
    }]
  }], null, null);
})();
var IMaskModule = class _IMaskModule {
  static {
    this.ɵfac = function IMaskModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IMaskModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _IMaskModule,
      imports: [IMaskDirective, IMaskPipe],
      exports: [IMaskDirective, IMaskPipe]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IMaskModule, [{
    type: NgModule,
    args: [{
      imports: [IMaskDirective, IMaskPipe],
      exports: [IMaskDirective, IMaskPipe]
    }]
  }], null, null);
})();
export {
  DEFAULT_IMASK_ELEMENT,
  DefaultImaskFactory,
  IMASK_FACTORY,
  IMask,
  IMaskDirective,
  IMaskModule,
  IMaskPipe,
  MASKEDINPUT_VALUE_ACCESSOR,
  PIPE_TYPE,
  pipe
};
//# sourceMappingURL=angular-imask.js.map
