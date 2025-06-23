import {
  __commonJS
} from "./chunk-APYJOV5E.js";

// node_modules/tobii/dist/js/tobii.js
var require_tobii = __commonJS({
  "node_modules/tobii/dist/js/tobii.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.Tobii = factory());
    })(exports, function() {
      "use strict";
      function Tobii(userOptions) {
        var config = {};
        var browserWindow = window;
        var figcaptionId = 0;
        var lightbox = null;
        var prevButton = null;
        var nextButton = null;
        var closeButton = null;
        var counter = null;
        var drag = {};
        var isDraggingX = false;
        var isDraggingY = false;
        var pointerDown = false;
        var lastFocus = null;
        var firstFocusableEl = null;
        var lastFocusableEl = null;
        var offset = null;
        var offsetTmp = null;
        var resizeTicking = false;
        var isYouTubeDependencieLoaded = false;
        var waitingEls = [];
        var player = [];
        var playerId = 0;
        var groupAtts = {
          gallery: [],
          slider: null,
          sliderElements: [],
          elementsLength: 0,
          currentIndex: 0,
          x: 0
        };
        var groups = {};
        var newGroup = null;
        var activeGroup = null;
        var mergeOptions = function mergeOptions2(userOptions2) {
          var options = {
            selector: ".lightbox",
            captions: true,
            captionsSelector: "img",
            captionAttribute: "alt",
            nav: "auto",
            navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 18l-6-6 6-6"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M10 6l6 6-6 6"/></svg>'],
            navLabel: ["Previous image", "Next image"],
            close: true,
            closeText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M6 18L18 6"/></svg>',
            closeLabel: "Close lightbox",
            loadingIndicatorLabel: "Image loading",
            counter: true,
            download: false,
            // TODO
            downloadText: "",
            // TODO
            downloadLabel: "Download image",
            // TODO
            keyboard: true,
            zoom: true,
            zoomText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 16v5h-5"/><path d="M8 21H3v-5"/><path d="M16 3h5v5"/><path d="M3 8V3h5"/></svg>',
            docClose: true,
            swipeClose: true,
            hideScrollbar: true,
            draggable: true,
            threshold: 100,
            rtl: false,
            // TODO
            loop: false,
            // TODO
            autoplayVideo: false
          };
          if (userOptions2) {
            Object.keys(userOptions2).forEach(function(key) {
              options[key] = userOptions2[key];
            });
          }
          return options;
        };
        var supportedElements = {
          image: {
            checkSupport: function checkSupport(el) {
              return !el.hasAttribute("data-type") && el.href.match(/\.(png|jpe?g|tiff|tif|gif|bmp|webp|svg|ico)(\?.*)?$/i);
            },
            init: function init2(el, container) {
              var figure = document.createElement("figure");
              var figcaption = document.createElement("figcaption");
              var image = document.createElement("img");
              var thumbnail = el.querySelector("img");
              var loadingIndicator = document.createElement("div");
              figure.style.opacity = "0";
              if (thumbnail) {
                image.alt = thumbnail.alt || "";
              }
              image.setAttribute("src", "");
              image.setAttribute("data-src", el.href);
              figure.appendChild(image);
              if (config.captions) {
                if (config.captionsSelector === "self" && el.getAttribute(config.captionAttribute)) {
                  figcaption.textContent = el.getAttribute(config.captionAttribute);
                } else if (config.captionsSelector === "img" && thumbnail && thumbnail.getAttribute(config.captionAttribute)) {
                  figcaption.textContent = thumbnail.getAttribute(config.captionAttribute);
                }
                if (figcaption.textContent) {
                  figcaption.id = "tobii-figcaption-" + figcaptionId;
                  figure.appendChild(figcaption);
                  image.setAttribute("aria-labelledby", figcaption.id);
                  ++figcaptionId;
                }
              }
              container.appendChild(figure);
              loadingIndicator.className = "tobii-loader";
              loadingIndicator.setAttribute("role", "progressbar");
              loadingIndicator.setAttribute("aria-label", config.loadingIndicatorLabel);
              container.appendChild(loadingIndicator);
              container.setAttribute("data-type", "image");
            },
            onPreload: function onPreload(container) {
              supportedElements.image.onLoad(container);
            },
            onLoad: function onLoad(container) {
              var image = container.querySelector("img");
              if (!image.hasAttribute("data-src")) {
                return;
              }
              var figure = container.querySelector("figure");
              var loadingIndicator = container.querySelector(".tobii-loader");
              image.onload = function() {
                container.removeChild(loadingIndicator);
                figure.style.opacity = "1";
              };
              image.setAttribute("src", image.getAttribute("data-src"));
              image.removeAttribute("data-src");
            },
            onLeave: function onLeave(container) {
            },
            onCleanup: function onCleanup(container) {
            }
          },
          html: {
            checkSupport: function checkSupport(el) {
              return checkType(el, "html");
            },
            init: function init2(el, container) {
              var targetSelector = el.hasAttribute("href") ? el.getAttribute("href") : el.getAttribute("data-target");
              var target = document.querySelector(targetSelector);
              if (!target) {
                throw new Error("Ups, I can't find the target " + targetSelector + ".");
              }
              container.appendChild(target);
              container.setAttribute("data-type", "html");
            },
            onPreload: function onPreload(container) {
            },
            onLoad: function onLoad(container) {
              var video = container.querySelector("video");
              if (video) {
                if (video.hasAttribute("data-time") && video.readyState > 0) {
                  video.currentTime = video.getAttribute("data-time");
                }
                if (config.autoplayVideo) {
                  video.play();
                }
              }
            },
            onLeave: function onLeave(container) {
              var video = container.querySelector("video");
              if (video) {
                if (!video.paused) {
                  video.pause();
                }
                if (video.readyState > 0) {
                  video.setAttribute("data-time", video.currentTime);
                }
              }
            },
            onCleanup: function onCleanup(container) {
              var video = container.querySelector("video");
              if (video) {
                if (video.readyState > 0 && video.readyState < 3 && video.duration !== video.currentTime) {
                  var videoClone = video.cloneNode(true);
                  removeSources(video);
                  video.load();
                  video.parentNode.removeChild(video);
                  container.appendChild(videoClone);
                }
              }
            }
          },
          iframe: {
            checkSupport: function checkSupport(el) {
              return checkType(el, "iframe");
            },
            init: function init2(el, container) {
              var iframe = document.createElement("iframe");
              var href = el.hasAttribute("href") ? el.getAttribute("href") : el.getAttribute("data-target");
              iframe.setAttribute("frameborder", "0");
              iframe.setAttribute("src", "");
              iframe.setAttribute("data-src", href);
              if (el.getAttribute("data-width")) {
                iframe.style.maxWidth = el.getAttribute("data-width") + "px";
              }
              if (el.getAttribute("data-height")) {
                iframe.style.maxHeight = el.getAttribute("data-height") + "px";
              }
              container.appendChild(iframe);
              container.setAttribute("data-type", "iframe");
            },
            onPreload: function onPreload(container) {
            },
            onLoad: function onLoad(container) {
              var iframe = container.querySelector("iframe");
              iframe.setAttribute("src", iframe.getAttribute("data-src"));
            },
            onLeave: function onLeave(container) {
            },
            onCleanup: function onCleanup(container) {
            }
          },
          youtube: {
            checkSupport: function checkSupport(el) {
              return checkType(el, "youtube");
            },
            init: function init2(el, container) {
              var iframePlaceholder = document.createElement("div");
              container.appendChild(iframePlaceholder);
              player[playerId] = new window.YT.Player(iframePlaceholder, {
                host: "https://www.youtube-nocookie.com",
                height: el.getAttribute("data-height") || "360",
                width: el.getAttribute("data-width") || "640",
                videoId: el.getAttribute("data-id"),
                playerVars: {
                  controls: el.getAttribute("data-controls") || 1,
                  rel: 0,
                  playsinline: 1
                }
              });
              container.setAttribute("data-player", playerId);
              container.setAttribute("data-type", "youtube");
              playerId++;
            },
            onPreload: function onPreload(container) {
            },
            onLoad: function onLoad(container) {
              if (config.autoplayVideo) {
                player[container.getAttribute("data-player")].playVideo();
              }
            },
            onLeave: function onLeave(container) {
              if (player[container.getAttribute("data-player")].getPlayerState() === 1) {
                player[container.getAttribute("data-player")].pauseVideo();
              }
            },
            onCleanup: function onCleanup(container) {
              if (player[container.getAttribute("data-player")].getPlayerState() === 1) {
                player[container.getAttribute("data-player")].pauseVideo();
              }
            }
          }
        };
        if (!Object.entries) {
          Object.entries = function(obj) {
            var ownProps = Object.keys(obj);
            var i = ownProps.length;
            var resArray = new Array(i);
            while (i--) {
              resArray[i] = [ownProps[i], obj[ownProps[i]]];
            }
            return resArray;
          };
        }
        var init = function init2(userOptions2) {
          config = mergeOptions(userOptions2);
          if (!lightbox) {
            createLightbox();
          }
          var els = document.querySelectorAll(config.selector);
          if (!els) {
            throw new Error("Ups, I can't find the selector " + config.selector + ".");
          }
          Array.prototype.forEach.call(els, function(el) {
            checkDependencies(el);
          });
        };
        var checkDependencies = function checkDependencies2(el, callback) {
          if (document.querySelector('[data-type="youtube"]') !== null && !isYouTubeDependencieLoaded) {
            if (document.getElementById("iframe_api") === null) {
              var tag = document.createElement("script");
              var firstScriptTag = document.getElementsByTagName("script")[0];
              tag.id = "iframe_api";
              tag.src = "https://www.youtube.com/iframe_api";
              firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }
            if (waitingEls.indexOf(el) === -1) {
              waitingEls.push(el);
            }
            window.onYouTubePlayerAPIReady = function() {
              Array.prototype.forEach.call(waitingEls, function(waitingEl) {
                add(waitingEl, callback);
              });
              isYouTubeDependencieLoaded = true;
            };
          } else {
            add(el, callback);
          }
        };
        var getGroupName = function getGroupName2(el) {
          return el.hasAttribute("data-group") ? el.getAttribute("data-group") : "default";
        };
        var copyObject = function copyObject2(object) {
          return JSON.parse(JSON.stringify(object));
        };
        var add = function add2(el, callback) {
          newGroup = getGroupName(el);
          if (!Object.prototype.hasOwnProperty.call(groups, newGroup)) {
            groups[newGroup] = copyObject(groupAtts);
            createSlider();
          }
          if (groups[newGroup].gallery.indexOf(el) === -1) {
            groups[newGroup].gallery.push(el);
            groups[newGroup].elementsLength++;
            if (config.zoom && el.querySelector("img")) {
              var TobiiZoom = document.createElement("div");
              TobiiZoom.className = "tobii-zoom__icon";
              TobiiZoom.innerHTML = config.zoomText;
              el.classList.add("tobii-zoom");
              el.appendChild(TobiiZoom);
            }
            el.addEventListener("click", triggerTobii);
            createSlide(el);
            if (isOpen() && newGroup === activeGroup) {
              updateConfig();
              updateLightbox();
            }
            if (callback) {
              callback.call(this);
            }
          } else {
            throw new Error("Ups, element already added to the lightbox.");
          }
        };
        var remove = function add2(el, callback) {
          var groupName = getGroupName(el);
          if (groups[groupName].gallery.indexOf(el) === -1) ;
          else {
            var slideIndex = groups[groupName].gallery.indexOf(el);
            var slideEl = groups[groupName].sliderElements[slideIndex];
            groups[groupName].elementsLength--;
            if (config.zoom && el.querySelector(".tobii-zoom__icon")) {
              var zoomIcon = el.querySelector(".tobii-zoom__icon");
              zoomIcon.parentNode.classList.remove("tobii-zoom");
              zoomIcon.parentNode.removeChild(zoomIcon);
            }
            el.removeEventListener("click", triggerTobii);
            slideEl.parentNode.removeChild(slideEl);
            if (isOpen() && groupName === activeGroup) {
              updateConfig();
              updateLightbox();
            }
            if (callback) {
              callback.call(this);
            }
          }
        };
        var createLightbox = function createLightbox2() {
          lightbox = document.createElement("div");
          lightbox.setAttribute("role", "dialog");
          lightbox.setAttribute("aria-hidden", "true");
          lightbox.className = "tobii";
          prevButton = document.createElement("button");
          prevButton.className = "tobii__prev";
          prevButton.setAttribute("type", "button");
          prevButton.setAttribute("aria-label", config.navLabel[0]);
          prevButton.innerHTML = config.navText[0];
          lightbox.appendChild(prevButton);
          nextButton = document.createElement("button");
          nextButton.className = "tobii__next";
          nextButton.setAttribute("type", "button");
          nextButton.setAttribute("aria-label", config.navLabel[1]);
          nextButton.innerHTML = config.navText[1];
          lightbox.appendChild(nextButton);
          closeButton = document.createElement("button");
          closeButton.className = "tobii__close";
          closeButton.setAttribute("type", "button");
          closeButton.setAttribute("aria-label", config.closeLabel);
          closeButton.innerHTML = config.closeText;
          lightbox.appendChild(closeButton);
          counter = document.createElement("div");
          counter.className = "tobii__counter";
          lightbox.appendChild(counter);
          document.body.appendChild(lightbox);
        };
        var createSlider = function createSlider2() {
          groups[newGroup].slider = document.createElement("div");
          groups[newGroup].slider.className = "tobii__slider";
          lightbox.appendChild(groups[newGroup].slider);
        };
        var createSlide = function createSlide2(el) {
          for (var index in supportedElements) {
            if (Object.prototype.hasOwnProperty.call(supportedElements, index)) {
              if (supportedElements[index].checkSupport(el)) {
                var sliderElement = document.createElement("div");
                var sliderElementContent = document.createElement("div");
                sliderElement.className = "tobii__slider-slide";
                sliderElement.style.position = "absolute";
                sliderElement.style.left = groups[newGroup].x * 100 + "%";
                supportedElements[index].init(el, sliderElementContent);
                sliderElement.appendChild(sliderElementContent);
                groups[newGroup].slider.appendChild(sliderElement);
                groups[newGroup].sliderElements.push(sliderElement);
                ++groups[newGroup].x;
                break;
              }
            }
          }
        };
        var open = function open2(index, callback) {
          activeGroup = activeGroup !== null ? activeGroup : newGroup;
          if (!isOpen() && !index) {
            index = 0;
          }
          if (isOpen()) {
            if (!index) {
              throw new Error("Ups, Tobii is aleady open.");
            }
            if (index === groups[activeGroup].currentIndex) {
              throw new Error("Ups, slide " + index + " is already selected.");
            }
          }
          if (index === -1 || index >= groups[activeGroup].elementsLength) {
            throw new Error("Ups, I can't find slide " + index + ".");
          }
          if (config.hideScrollbar) {
            document.documentElement.classList.add("tobii-is-open");
            document.body.classList.add("tobii-is-open");
          }
          updateConfig();
          if (!config.close) {
            closeButton.disabled = false;
            closeButton.setAttribute("aria-hidden", "true");
          }
          lastFocus = document.activeElement;
          groups[activeGroup].currentIndex = index;
          clearDrag();
          bindEvents();
          load(groups[activeGroup].currentIndex);
          lightbox.setAttribute("aria-hidden", "false");
          updateLightbox();
          preload(groups[activeGroup].currentIndex + 1);
          preload(groups[activeGroup].currentIndex - 1);
          setTimeout(function() {
            groups[activeGroup].slider.classList.add("tobii__slider--animate");
          }, 1e3);
          if (callback) {
            callback.call(this);
          }
        };
        var close = function close2(callback) {
          if (!isOpen()) {
            throw new Error("Tobii is already closed.");
          }
          if (config.hideScrollbar) {
            document.documentElement.classList.remove("tobii-is-open");
            document.body.classList.remove("tobii-is-open");
          }
          unbindEvents();
          lastFocus.focus();
          var container = groups[activeGroup].sliderElements[groups[activeGroup].currentIndex].querySelector("[data-type]");
          var type = container.getAttribute("data-type");
          supportedElements[type].onLeave(container);
          supportedElements[type].onCleanup(container);
          lightbox.setAttribute("aria-hidden", "true");
          groups[activeGroup].currentIndex = 0;
          groups[activeGroup].slider.classList.remove("tobii__slider--animate");
          if (callback) {
            callback.call(this);
          }
        };
        var preload = function preload2(index) {
          if (groups[activeGroup].sliderElements[index] === void 0) {
            return;
          }
          var container = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
          var type = container.getAttribute("data-type");
          supportedElements[type].onPreload(container);
        };
        var load = function load2(index) {
          if (groups[activeGroup].sliderElements[index] === void 0) {
            return;
          }
          var container = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
          var type = container.getAttribute("data-type");
          supportedElements[type].onLoad(container);
        };
        var prev = function prev2(callback) {
          if (groups[activeGroup].currentIndex > 0) {
            leave(groups[activeGroup].currentIndex);
            load(--groups[activeGroup].currentIndex);
            updateLightbox("left");
            cleanup(groups[activeGroup].currentIndex + 1);
            preload(groups[activeGroup].currentIndex - 1);
            if (callback) {
              callback.call(this);
            }
          }
        };
        var next = function next2(callback) {
          if (groups[activeGroup].currentIndex < groups[activeGroup].elementsLength - 1) {
            leave(groups[activeGroup].currentIndex);
            load(++groups[activeGroup].currentIndex);
            updateLightbox("right");
            cleanup(groups[activeGroup].currentIndex - 1);
            preload(groups[activeGroup].currentIndex + 1);
            if (callback) {
              callback.call(this);
            }
          }
        };
        var leave = function leave2(index) {
          if (groups[activeGroup].sliderElements[index] === void 0) {
            return;
          }
          var container = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
          var type = container.getAttribute("data-type");
          supportedElements[type].onLeave(container);
        };
        var cleanup = function cleanup2(index) {
          if (groups[activeGroup].sliderElements[index] === void 0) {
            return;
          }
          var container = groups[activeGroup].sliderElements[index].querySelector("[data-type]");
          var type = container.getAttribute("data-type");
          supportedElements[type].onCleanup(container);
        };
        var updateOffset = function updateOffset2() {
          activeGroup = activeGroup !== null ? activeGroup : newGroup;
          offset = -groups[activeGroup].currentIndex * lightbox.offsetWidth;
          groups[activeGroup].slider.style.transform = "translate3d(" + offset + "px, 0, 0)";
          offsetTmp = offset;
        };
        var updateCounter = function updateCounter2() {
          counter.textContent = groups[activeGroup].currentIndex + 1 + "/" + groups[activeGroup].elementsLength;
        };
        var updateFocus = function updateFocus2(dir) {
          var focusableEls = null;
          if (config.nav) {
            prevButton.disabled = false;
            nextButton.disabled = false;
            if (dir === "left") {
              prevButton.focus();
            } else {
              nextButton.focus();
            }
            if (groups[activeGroup].elementsLength === 1) {
              prevButton.disabled = true;
              nextButton.disabled = true;
              if (config.close) {
                closeButton.focus();
              }
            } else {
              if (groups[activeGroup].currentIndex === 0) {
                prevButton.disabled = true;
                nextButton.focus();
              }
              if (groups[activeGroup].currentIndex === groups[activeGroup].elementsLength - 1) {
                nextButton.disabled = true;
                prevButton.focus();
              }
            }
          } else if (config.close) {
            closeButton.focus();
          }
          focusableEls = lightbox.querySelectorAll(".tobii > button:not(:disabled)");
          firstFocusableEl = focusableEls[0];
          lastFocusableEl = focusableEls.length === 1 ? focusableEls[0] : focusableEls[focusableEls.length - 1];
        };
        var clearDrag = function clearDrag2() {
          drag = {
            startX: 0,
            endX: 0,
            startY: 0,
            endY: 0
          };
        };
        var updateAfterDrag = function updateAfterDrag2() {
          var movementX = drag.endX - drag.startX;
          var movementY = drag.endY - drag.startY;
          var movementXDistance = Math.abs(movementX);
          var movementYDistance = Math.abs(movementY);
          if (movementX > 0 && movementXDistance > config.threshold && groups[activeGroup].currentIndex > 0) {
            prev();
          } else if (movementX < 0 && movementXDistance > config.threshold && groups[activeGroup].currentIndex !== groups[activeGroup].elementsLength - 1) {
            next();
          } else if (movementY < 0 && movementYDistance > config.threshold && config.swipeClose) {
            close();
          } else {
            updateOffset();
          }
        };
        var resizeHandler = function resizeHandler2() {
          if (!resizeTicking) {
            resizeTicking = true;
            browserWindow.requestAnimationFrame(function() {
              updateOffset();
              resizeTicking = false;
            });
          }
        };
        var triggerTobii = function triggerTobii2(event) {
          event.preventDefault();
          activeGroup = getGroupName(this);
          open(groups[activeGroup].gallery.indexOf(this));
        };
        var clickHandler = function clickHandler2(event) {
          if (event.target === prevButton) {
            prev();
          } else if (event.target === nextButton) {
            next();
          } else if (event.target === closeButton || event.target.className === "tobii__slider-slide" && config.docClose) {
            close();
          }
          event.stopPropagation();
        };
        var keydownHandler = function keydownHandler2(event) {
          if (event.keyCode === 9 || event.code === "Tab") {
            if (event.shiftKey) {
              if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                event.preventDefault();
              }
            } else {
              if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                event.preventDefault();
              }
            }
          } else if (event.keyCode === 27 || event.code === "Escape") {
            event.preventDefault();
            close();
          } else if (event.keyCode === 37 || event.code === "ArrowLeft") {
            event.preventDefault();
            prev();
          } else if (event.keyCode === 39 || event.code === "ArrowRight") {
            event.preventDefault();
            next();
          }
        };
        var touchstartHandler = function touchstartHandler2(event) {
          if (isIgnoreElement(event.target)) {
            return;
          }
          event.stopPropagation();
          pointerDown = true;
          drag.startX = event.touches[0].pageX;
          drag.startY = event.touches[0].pageY;
          groups[activeGroup].slider.classList.add("tobii__slider--is-dragging");
        };
        var touchmoveHandler = function touchmoveHandler2(event) {
          event.stopPropagation();
          if (pointerDown) {
            event.preventDefault();
            drag.endX = event.touches[0].pageX;
            drag.endY = event.touches[0].pageY;
            doSwipe();
          }
        };
        var touchendHandler = function touchendHandler2(event) {
          event.stopPropagation();
          pointerDown = false;
          groups[activeGroup].slider.classList.remove("tobii__slider--is-dragging");
          if (drag.endX) {
            isDraggingX = false;
            isDraggingY = false;
            updateAfterDrag();
          }
          clearDrag();
        };
        var mousedownHandler = function mousedownHandler2(event) {
          if (isIgnoreElement(event.target)) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          pointerDown = true;
          drag.startX = event.pageX;
          drag.startY = event.pageY;
          groups[activeGroup].slider.classList.add("tobii__slider--is-dragging");
        };
        var mousemoveHandler = function mousemoveHandler2(event) {
          event.preventDefault();
          if (pointerDown) {
            drag.endX = event.pageX;
            drag.endY = event.pageY;
            doSwipe();
          }
        };
        var mouseupHandler = function mouseupHandler2(event) {
          event.stopPropagation();
          pointerDown = false;
          groups[activeGroup].slider.classList.remove("tobii__slider--is-dragging");
          if (drag.endX) {
            isDraggingX = false;
            isDraggingY = false;
            updateAfterDrag();
          }
          clearDrag();
        };
        var doSwipe = function doSwipe2() {
          if (Math.abs(drag.startX - drag.endX) > 0 && !isDraggingY && config.swipeClose) {
            groups[activeGroup].slider.style.transform = "translate3d(" + (offsetTmp - Math.round(drag.startX - drag.endX)) + "px, 0, 0)";
            isDraggingX = true;
            isDraggingY = false;
          } else if (Math.abs(drag.startY - drag.endY) > 0 && !isDraggingX) {
            groups[activeGroup].slider.style.transform = "translate3d(" + offsetTmp + "px, -" + Math.round(drag.startY - drag.endY) + "px, 0)";
            isDraggingX = false;
            isDraggingY = true;
          }
        };
        var bindEvents = function bindEvents2() {
          if (config.keyboard) {
            browserWindow.addEventListener("keydown", keydownHandler);
          }
          browserWindow.addEventListener("resize", resizeHandler);
          lightbox.addEventListener("click", clickHandler);
          if (config.draggable) {
            if (isTouchDevice()) {
              lightbox.addEventListener("touchstart", touchstartHandler);
              lightbox.addEventListener("touchmove", touchmoveHandler);
              lightbox.addEventListener("touchend", touchendHandler);
            }
            lightbox.addEventListener("mousedown", mousedownHandler);
            lightbox.addEventListener("mouseup", mouseupHandler);
            lightbox.addEventListener("mousemove", mousemoveHandler);
          }
        };
        var unbindEvents = function unbindEvents2() {
          if (config.keyboard) {
            browserWindow.removeEventListener("keydown", keydownHandler);
          }
          browserWindow.removeEventListener("resize", resizeHandler);
          lightbox.removeEventListener("click", clickHandler);
          if (config.draggable) {
            if (isTouchDevice()) {
              lightbox.removeEventListener("touchstart", touchstartHandler);
              lightbox.removeEventListener("touchmove", touchmoveHandler);
              lightbox.removeEventListener("touchend", touchendHandler);
            }
            lightbox.removeEventListener("mousedown", mousedownHandler);
            lightbox.removeEventListener("mouseup", mouseupHandler);
            lightbox.removeEventListener("mousemove", mousemoveHandler);
          }
        };
        var checkType = function checkType2(el, type) {
          return el.getAttribute("data-type") === type;
        };
        var removeSources = function setVideoSources(el) {
          var sources = el.querySelectorAll("src");
          if (sources) {
            Array.prototype.forEach.call(sources, function(source) {
              source.setAttribute("src", "");
            });
          }
        };
        var updateConfig = function updateConfig2() {
          if (config.draggable && groups[activeGroup].elementsLength > 1 && !groups[activeGroup].slider.classList.contains("tobii__slider--is-draggable")) {
            groups[activeGroup].slider.classList.add("tobii__slider--is-draggable");
          }
          if (!config.nav || groups[activeGroup].elementsLength === 1 || config.nav === "auto" && isTouchDevice()) {
            prevButton.setAttribute("aria-hidden", "true");
            nextButton.setAttribute("aria-hidden", "true");
          } else {
            prevButton.setAttribute("aria-hidden", "false");
            nextButton.setAttribute("aria-hidden", "false");
          }
          if (!config.counter || groups[activeGroup].elementsLength === 1) {
            counter.setAttribute("aria-hidden", "true");
          } else {
            counter.setAttribute("aria-hidden", "false");
          }
        };
        var updateSlider = function updateSlider2() {
          for (var name in groups) {
            if (!Object.prototype.hasOwnProperty.call(groups, name)) continue;
            groups[name].slider.style.display = activeGroup === name ? "block" : "none";
          }
        };
        var updateLightbox = function updateLightbox2(dir) {
          updateSlider();
          updateOffset();
          updateCounter();
          updateFocus(dir);
        };
        var destroy = function destroy2(callback) {
          if (isOpen()) {
            close();
          }
          var groupsEntries = Object.entries(groups);
          Array.prototype.forEach.call(groupsEntries, function(groupsEntrie) {
            var els = groupsEntrie[1].gallery;
            Array.prototype.forEach.call(els, function(el) {
              remove(el);
            });
          });
          lightbox.parentNode.removeChild(lightbox);
          groups = {};
          newGroup = activeGroup = null;
          figcaptionId = 0;
          if (callback) {
            callback.call(this);
          }
        };
        var isOpen = function isOpen2() {
          return lightbox.getAttribute("aria-hidden") === "false";
        };
        var isTouchDevice = function isTouchDevice2() {
          return "ontouchstart" in window;
        };
        var isIgnoreElement = function isIgnoreElement2(el) {
          return ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(el.nodeName) !== -1 || el === prevButton || el === nextButton || el === closeButton || groups[activeGroup].elementsLength === 1;
        };
        var currentSlide = function currentSlide2() {
          return groups[activeGroup].currentIndex;
        };
        var currentGroup = function currentGroup2() {
          return activeGroup !== null ? activeGroup : newGroup;
        };
        var selectGroup = function selectGroup2(name) {
          if (isOpen()) {
            throw new Error("Ups, I can't do this. Tobii is open.");
          }
          if (!name) {
            return;
          }
          if (name && !Object.prototype.hasOwnProperty.call(groups, name)) {
            throw new Error(`Ups, I don't have a group called "` + name + '".');
          }
          activeGroup = name;
        };
        init(userOptions);
        return {
          open,
          prev,
          next,
          close,
          add: checkDependencies,
          remove,
          destroy,
          isOpen,
          currentSlide,
          selectGroup,
          currentGroup
        };
      }
      return Tobii;
    });
  }
});
export default require_tobii();
//# sourceMappingURL=tobii.js.map
