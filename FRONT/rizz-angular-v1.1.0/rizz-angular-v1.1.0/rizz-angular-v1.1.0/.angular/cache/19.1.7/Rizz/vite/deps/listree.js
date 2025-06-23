import "./chunk-APYJOV5E.js";

// node_modules/listree/dist/listree.esm.min.js
function e() {
  const e2 = document.getElementsByClassName("listree-submenu-heading");
  Array.from(e2).forEach(function(e3) {
    e3.classList.add("collapsed"), e3.nextElementSibling.style.display = "none", e3.addEventListener("click", function(s) {
      s.preventDefault();
      const t = s.target.nextElementSibling;
      "none" == t.style.display ? (e3.classList.remove("collapsed"), e3.classList.add("expanded"), t.style.display = "block") : (e3.classList.remove("expanded"), e3.classList.add("collapsed"), t.style.display = "none"), s.stopPropagation();
    });
  });
}
var listree_esm_min_default = e;
export {
  listree_esm_min_default as default
};
//# sourceMappingURL=listree.js.map
