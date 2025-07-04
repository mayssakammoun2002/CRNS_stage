class CustomTag {
    init() {
        class AppMenu extends HTMLElement {
            connectedCallback() {
                this.outerHTML = `
                <div class="startbar d-print-none">
                    <!--start brand-->
                    <div class="brand">
                        <a href="index.html" class="logo">
                            <span>
                                <img src="assets/images/logo-sm.png" alt="logo-small" class="logo-sm">
                            </span>

                        </a>
                    </div>
            
                    <div class="startbar-menu">
                        <div class="startbar-collapse" id="startbarCollapse" data-simplebar>
                            <div class="d-flex align-items-start flex-column w-100">
                                <ul class="navbar-nav mb-auto w-100">
                                    <li class="menu-label pt-0 mt-0">Documentation</li>
            
                                    <li class="nav-item">
                                        <a href="index.html" class="nav-link">
                                            <i class="menu-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                    <g fill="none">
                                                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                                        <path fill="currentColor" d="M13.586 2A2 2 0 0 1 15 2.586L19.414 7A2 2 0 0 1 20 8.414V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM12 4H6v16h12V10h-4.5A1.5 1.5 0 0 1 12 8.5zm3 10a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2zm-5-4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Zm4-5.586V8h3.586z"></path>
                                                    </g>
                                                </svg></i>
                                            <span class="menu-text"> Introduction </span>
                                        </a>
                                    </li>
        
            
                                    <li class="nav-item">
                                        <a href="installation.html" class="nav-link">
                                             <i class="menu-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                    <g fill="none">
                                                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                                        <path fill="currentColor" d="M13.586 2A2 2 0 0 1 15 2.586L19.414 7A2 2 0 0 1 20 8.414V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM12 4H6v16h12V10h-4.5A1.5 1.5 0 0 1 12 8.5zm3 10a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2zm-5-4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Zm4-5.586V8h3.586z"></path>
                                                    </g>
                                                </svg></i>
                                            <span class="menu-text"> Installation </span>
                                        </a>
                                    </li>
            
            
                                    <li class="menu-label">Other</li>

                                    <li class="nav-item">
                                    <a href="support.html" class="nav-link">
                                        <i class="iconoir-headset-help menu-icon"></i>
                                        <span class="menu-text"> Support </span>
                                    </a>

                                    <a href="credits.html" class="nav-link">
                                    <i class="iconoir-credit-card menu-icon"></i>
                                    <span class="menu-text"> Credits </span>
                                </a>
                                </li>
            
                                    <li class="nav-item">
                                        <a href="changelog.html" class="nav-link">
                                            <i class="menu-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                    <g fill="none">
                                                        <path d="M0 0v24h24V0zm11.407 23.258l.011.002l.071.035l.02.004l.014-.004l.071-.036c.01-.003.019 0 .024.006l.004.01l.017.428l-.005.02l-.01.013l-.104.074l-.015.004l-.012-.004l-.104-.074l-.012-.016l-.004-.017l.017-.427c.002-.01.009-.017.016-.018Zm-.265-.113l.014.002l.184.093l.01.01l.003.011l-.018.43l-.005.012l-.008.008l-.201.092a.025.025 0 0 1-.029-.008l-.004-.014l.034-.614c.003-.012.01-.02.02-.022m.715.002a.023.023 0 0 1 .027.006l.006.014l.034.614c0 .012-.007.02-.017.024l-.015-.002l-.201-.093l-.01-.008l-.003-.011l-.018-.43l.003-.012l.01-.01z"></path>
                                                        <path fill="currentColor" d="M20 9a1 1 0 0 1 .993.883L21 10v5a4 4 0 0 1-3.8 3.995L17 19H8.107l-.02.415l-.034.519c-.027.346-.352.557-.631.41l-.306-.164l-.36-.203l-.198-.117l-.43-.263a20.62 20.62 0 0 1-.229-.147l-.463-.31l-.21-.147l-.377-.273l-.315-.24a16.254 16.254 0 0 1-.133-.104c-.236-.188-.225-.566.023-.762l.28-.217l.34-.252l.4-.282l.456-.305l.462-.291l.416-.249l.365-.205l.307-.165c.275-.143.571.036.598.36l.025.347l.024.415l.01.23H17a2 2 0 0 0 1.995-1.85L19 15v-5a1 1 0 0 1 1-1m-3.422-5.345l.306.165l.36.203l.198.117l.43.263l.229.147l.463.31l.21.147l.377.273l.315.24l.133.104c.236.188.225.566-.023.762l-.28.217l-.34.252l-.4.282l-.456.305l-.462.291l-.416.249l-.365.205l-.307.165c-.275.143-.572-.036-.598-.36l-.025-.347l-.024-.415a24.926 24.926 0 0 1-.01-.23H7a2 2 0 0 0-2 2v5a1 1 0 1 1-2 0V9a4 4 0 0 1 4-4h8.893l.02-.415l.022-.36l.012-.159c.027-.346.352-.557.631-.41Z"></path>
                                                    </g>
                                                </svg></i>
                                            <span class="menu-text"> Changelog </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        }

        class AppHeader extends HTMLElement {
            connectedCallback() {
                this.outerHTML = `<div class="topbar">
                <div class="container-xxl">
                    <nav class="topbar-custom d-flex justify-content-between" id="topbar-custom">
                        <ul class="topbar-item list-unstyled d-inline-flex align-items-center mb-0">
                            <li>
                                <button class="nav-link mobile-menu-btn nav-icon" id="togglemenu">
                                    <i class="iconoir-menu-scale"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>`;
            }
        }

        customElements.define("app-menu", AppMenu);
        customElements.define("app-header", AppHeader);
    }
}


new CustomTag().init();