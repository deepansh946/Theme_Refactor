import React, { Component } from 'react';
import './Documentation.css';

export class Documentation extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card docs no-margin">
                        <h1>Current Version</h1>
                        <p>React 16.7.0 and PrimeReact 3.0.0</p>

                        <h1>Getting Started</h1>
                        <p>Babylon is an application template for React based on the popular <a href="https://github.com/facebookincubator/create-react-app">create-react-app</a> that allows
                            creating React apps with no configuration. To get started extract the contents of the zip bundle and install the dependencies
                            with npm or yarn.</p>
                        <pre>
{
`npm install
`}
</pre>

                        or

                        <pre>
{
`yarn
`}
</pre>

                        <p>Next step is running the application using the start script and navigate to <b>http://localhost:3000/</b> to view the application.
                            That is it, you may now start with the development of your application using the Babylon template.</p>

                        <pre>
{
`npm start
`}
</pre>

                        or

                        <pre>
{
`yarn start
`}
</pre>

                        <h1>React Scripts</h1>
                        <p>Following commands are derived from create-app-app.</p>
                        <pre>
{
`"npm start" or "yarn start": Starts the development server
"npm test" or "yarn test": Runs the tests.
"npm run build" or "yarn run build": Creates a production build.
`}
</pre>

                        <h1>Dependencies</h1>
                        <p>Only required dependencies are PrimeReact, PrimeIcons PrimeFlex where optional dependencies exist to enable certain components in PrimeReact such as Google Maps.</p>

<pre>
{
`"primereact": "^3.0.0",             //required: PrimeReact components
"primeicons": "^1.0.0-beta.10",      //required: Component Icons
"primeflex": "^1.0.0-rc.1",          //optional: Layout Grid
"react-router-dom": "^4.2.2"         //optional: Router
`
}
</pre>

                        <h1>Structure</h1>
                        <p>Babylon consists of 3 main parts; the application layout, layout resources and theme resources for PrimeReact components. <b>App.js</b> inside src folder is the main component containing the template for the base layout
                            whereas required resources for the layout are placed inside the <b>public/assets/layout</b> folder and similarly theme resources are inside <b>public/assets/theme</b> folder.
                        </p>

                        <h1>Template</h1>
                        <p>Main layout is the JSX of the App.js, it is divided into a couple of child components such as topbar, profile, menu and footer. Here is render method of the
                            App.js component that implements the logic such as menu state, layout modes and so on.
                        </p>

                        <pre>
{
`render() {
    const layoutClassName = classNames('layout-wrapper', {
        'layout-horizontal': this.state.layoutMode === 'horizontal',
        'layout-overlay': this.state.layoutMode === 'overlay',
        'layout-static': this.state.layoutMode === 'static',
        'layout-slim': this.state.layoutMode === 'slim',
        'layout-static-inactive': this.state.staticMenuDesktopInactive,
        'layout-mobile-active': this.state.staticMenuMobileActive,
        'layout-overlay-active': this.state.overlayMenuActive,
        'layout-menu-dark': this.state.darkMenu,
        'layout-menu-light':!this.state.darkMenu
    });
    const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);

    return (
        <div className={layoutClassName} onClick={this.onDocumentClick}>
            <AppTopbar topbarMenuActive={this.state.topbarMenuActive} 
                       activeTopbarItem={this.state.activeTopbarItem}
                       onMenuButtonClick={this.onMenuButtonClick} 
                       onTopbarMenuButtonClick={this.onTopbarMenuButtonClick} 
                       onTopbarItemClick={this.onTopbarItemClick}
                       profileMode={this.state.profileMode} 
                       horizontal={this.isHorizontal()}/>

            <div className='layout-menu-container' onClick={this.onMenuClick}>
                <div className="layout-menu-logo">
                    <button className="p-link">
                        <img id="layout-menu-logo" src="assets/layout/images/logo-white.png" alt="babylon-layout"/>
                    </button>
                </div>

                <div className="layout-menu-wrapper">
                    <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height: '100%'}}>
                        <div className="menu-scroll-content">
                            {(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') && <AppInlineProfile />}
                            <AppMenu model={this.state.grouped ? this.menuGrouped : this.menuUngrouped} 
                                onMenuItemClick={this.onMenuItemClick}
                                onRootMenuItemClick={this.onRootMenuItemClick}
                                layoutMode={this.state.layoutMode} active={this.state.menuActive}/>
                        </div>
                    </ScrollPanel>
                </div>
            </div>

            <div className="layout-main">
                <AppBreadCrumbWithRouter/>

                <div className="layout-content">
                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/forms" component={FormsDemo}/>
                    <Route path="/sample" component={SampleDemo}/>
                    <Route path="/data" component={DataDemo}/>
                    <Route path="/panels" component={PanelsDemo}/>
                    <Route path="/overlays" component={OverlaysDemo}/>
                    <Route path="/menus" component={MenusDemo}/>
                    <Route path="/messages" component={MessagesDemo}/>
                    <Route path="/charts" component={ChartsDemo}/>
                    <Route path="/misc" component={MiscDemo}/>
                    <Route path="/empty" component={EmptyPage}/>
                    <Route path="/documentation" component={Documentation}/>
                </div>
            </div>

            <AppFooter/>

            {this.state.staticMenuMobileActive && <div className="layout-mask"></div>}
        </div>
    );
}
`
}
</pre>

                        <h1>Menu</h1>
                        <p>Menu is a separate component defined in AppMenu.js file based on PrimeReact MenuModel API. In order to define the menuitems,
                            navigate to createMenu() method App.js file and define your own model as a nested structure. Here is the menu component from the demo application.
                            Notice that menu object is bound to the model property of AppMenu component as shown above.</p>

<div style={{height: '400px', overflow: 'auto'}}>
                        <pre>
{
`createMenu() {
    this.menuGrouped = [
        { 	label: 'Home Page', icon: 'pi pi-fw pi-home',
            items: [
                {label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'}
            ]
        },
        { label: 'Customization', icon: 'pi pi-fw pi-cog',
            items: [
                {	label: 'Menu Layouts', icon: 'pi pi-fw pi-th-large', badge: 2,
                    items: [
                        {label: 'Static Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'static'})},
                        {label: 'Overlay Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'overlay'})},
                        {label: 'Slim Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'slim'})},
                        {label: 'Horizontal Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'horizontal'})},
                        {label: 'Grouped Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({grouped: true})},
                        {label: 'Ungrouped Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({grouped: false})}
                    ]
                },
                {
                    label: 'Menu Colors', icon: 'pi pi-fw pi-list', badge: 2,
                    items: [
                        { label: 'Light', icon: 'pi pi-fw pi-circle-off', command: () => this.setState({darkMenu: false})},
                        { label: 'Dark', icon: 'pi pi-fw pi-circle-on', command: () => this.setState({darkMenu: true})}
                    ]
                },
                {label: 'User Profile', icon: 'pi pi-fw pi-user', badge: 2,
                    items: [
                        {label: 'Popup Profile', icon: 'pi pi-fw pi-user',  command: () => this.setState({profileMode: 'popup'})},
                        {label: 'Inline Profile', icon: 'pi pi-fw pi-user',  command: () => this.setState({profileMode: 'inline'})}
                    ]
                },
                {
                    label: 'Themes', icon: 'pi pi-fw pi-pencil', badge: 17,
                    items: [
                        {
                            label: 'Blue', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('blue', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('blue', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('blue', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Blue Grey', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('bluegrey', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('bluegrey', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('bluegrey', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Light Blue', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('lightblue', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('lightblue', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('lightblue', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Indigo', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('indigo', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('indigo', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('indigo', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Pink', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('pink', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('pink', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('pink', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Green', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('green', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('green', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('green', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Light Green', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('lightgreen', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('lightgreen', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('lightgreen', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Teal', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('teal', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('teal', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('teal', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Cyan', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('cyan', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('cyan', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('cyan', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Lime', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('lime', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('lime', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('lime', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Amber', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('amber', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('amber', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('amber', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Orange', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('orange', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('orange', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('orange', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Deep Orange', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('deeporange', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('deeporange', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('deeporange', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Yellow', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('yellow', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('yellow', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('yellow', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Purple', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('purple', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('purple', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('purple', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Deep Purple', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('deeppurple', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('deeppurple', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('deeppurple', 'dark')
                                }
                            ]
                        },
                        {
                            label: 'Brown', icon: 'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Accent', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('brown', 'accent')
                                },
                                {
                                    label: 'Light', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('brown', 'light')
                                },
                                {
                                    label: 'Dark', icon: 'pi pi-fw pi-pencil',
                                    command: () => this.changeTheme('brown', 'dark')
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            label: 'Components', icon: 'pi pi-fw pi-star',
            items: [
                {label: 'Sample Page', icon: 'pi pi-fw pi-th-large', to: '/sample'},
                {label: 'Forms', icon: 'pi pi-fw pi-file', to: '/forms'},
                {label: 'Data', icon: 'pi pi-fw pi-table', to: '/data'},
                {label: 'Panels', icon: 'pi pi-fw pi-list', to: '/panels'},
                {label: 'Overlays', icon: 'pi pi-fw pi-clone', to: '/overlays'},
                {label: 'Menus', icon: 'pi pi-fw pi-plus', to: '/menus'},
                {label: 'Messages', icon: 'pi pi-fw pi-spinner',to: '/messages'},
                {label: 'Charts', icon: 'pi pi-fw pi-chart-bar', to: '/charts'},
                {label: 'Misc', icon: 'pi pi-fw pi-upload', to: '/misc'}
            ]
        },
        {
            label: 'Pages', icon: 'pi pi-fw pi-copy',
            items: [
                {label: 'Empty Page', icon: 'pi pi-fw pi-clone', to: '/empty'},
                {label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
                {label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login'},
                {label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', to: '/error'},
                {label: '404 Page', icon: 'pi pi-fw pi-times', to: '/notfound'},
                {label: 'Access Denied', icon: 'pi pi-fw pi-ban', to: '/access'}
            ]
        },
        {
            label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
            items: [
                {
                    label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
                    items: [
                        {
                            label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in' },
                            ]
                        },
                        {
                            label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
                            items: [
                                { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in' },
                                { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-sign-in' }
                            ]
                        },
                    ]
                },
                {
                    label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
                    items: [
                        {
                            label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in' },
                                { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-sign-in' },
                            ]
                        },
                        {
                            label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
                            items: [
                                { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in' },
                                { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-sign-in' }
                            ]
                        },
                    ]
                }
            ]
        },
        { label: 'Get Started', icon: 'pi pi-fw pi-download',
            items: [
                {
                    label: 'Docs', icon: 'pi pi-fw pi-file', command: () => {window.location = "#/documentation"}
                },
                {
                    label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
                }
            ]
        }
    ];
}
    
`}
</pre>
</div>

                        <h1>Theme and Layout SASS</h1>
                        <p>Babylon provides 51 PrimeReact theme colors out of the box. Setup of a theme is simple by including the css of theme to your bundle that are located inside assets/theme folder such as assets/theme/pink/theme-light.css. A theme color offers 3 alternatives, in "accent" mode a secondary color is used for highlighted elements and headers are displayed with the primary color. In "light" and "dark" alternatives, highlighted elements use the primary color and header elements are displayed as light or dark. Full list of available themes are;.</p>

                        <ul>
                            <li>amber</li>
                            <li>blue</li>
                            <li>bluegrey</li>
                            <li>brown</li>
                            <li>cyan</li>
                            <li>deeporange</li>
                            <li>deeppurple</li>
                            <li>green</li>
                            <li>indigo</li>
                            <li>lightblue</li>
                            <li>lightgreen</li>
                            <li>lime</li>
                            <li>orange</li>
                            <li>pink</li>
                            <li>purple</li>
                            <li>teal</li>
                            <li>yellow</li>
                        </ul>

                        <p>A custom theme can be developed by the following steps.</p>
                        <ul>
                            <li>Choose a custom theme name such as theme-myown.</li>
                            <li>Create a file named theme-myown.scss under <i>public/assets/theme folder</i>.</li>
                            <li>Define the variables listed below and import the <i>../../sass/theme/_theme</i> file.</li>
                            <li>Build the scss to generate css.</li>
                            <li>Include the generated theme.css in your application.</li>
                        </ul>

                        <p>Here are the variables required to create a theme.</p>

<pre>
{
`//primary color with shades
$primaryLighterColor:#D1C4E9;
$primaryColor:#673AB7;
$primaryDarkColor:#512DA8;
$primaryDarkerColor:#4527A0;
$primaryTextColor:#ffffff;

//highlight color
$accentColor:#FFC107;
$accentDarkerColor:#FFA000;
$accentColorText:#000000;

//headers of panel components
$containerHeaderBgColor:$primaryColor;
$containerHeaderBorder:1px solid $primaryColor;
$containerHeaderTextColor:$primaryTextColor;
$containerHeaderIconColor:$primaryLighterColor;
$containerHeaderIconHoverColor:$primaryTextColor;

//panel components such as accordion whose headers can be clicked
$clickableContainerHeaderBgColor:$primaryColor;
$clickableContainerHeaderBorder:1px solid $primaryColor;
$clickableContainerHeaderTextColor:$primaryTextColor;
$clickableContainerHeaderIconColor:$primaryTextColor;

$clickableContainerHeaderHoverBgColor:$primaryDarkColor;
$clickableContainerHeaderHoverBorder:1px solid $primaryDarkColor;
$clickableContainerHeaderHoverTextColor:$primaryTextColor;
$clickableContainerHeaderHoverIconColor:$primaryTextColor;

$clickableContainerHeaderActiveBgColor:$accentColor;
$clickableContainerHeaderActiveBorder:1px solid $accentColor;
$clickableContainerHeaderActiveTextColor:$accentColorText;
$clickableContainerHeaderActiveIconColor:$accentColorText;

$clickableContainerHeaderActiveHoverBgColor:$accentColor;
$clickableContainerHeaderActiveHoverHoverBorder:1px solid $accentColor;
$clickableContainerHeaderActiveHoverTextColor:$accentColorText;
$clickableContainerHeaderActiveHoverIconColor:$accentColorText;

@import '../../sass/theme/_theme';
 
`
}
</pre>
 
                        <p> An example sass command to compile the css would be;</p>

                        <pre>
sass --update public/assets/theme/theme-myown.scss:public/assets/theme/theme-myown.css
</pre>

                        <p>Watch mode is handy to avoid compiling everytime when a change is made, instead use the following command
                            so that sass generates the file whenever you make a customization. This builds all css files whenever a change is made to any scss file.</p>
                        <pre>
sass --watch public/assets/theme/theme-myown.scss:public/assets/theme/theme-myown.css
</pre>

                        <p>Same can also be applied to layout itself;</p>
                        <ul>
                            <li>Choose a layout name such as layout-myown.</li>
                            <li>Create an empty file named layout-myown.scss inside <i>assets/layout/css</i> folder.</li>
                            <li>Define the variables listed below and import the <i>/sass/layout/_layout.scss</i> file.</li>
                            <li>Build the scss to generate css</li>
                            <li>Serve the css by importing it using a link tag or a bundler.</li>
                        </ul>

                        <p>Here are the variables required to create a layout.</p>

                        <pre>
{
`$logoBgColor:#FFCA28;
$topbarBgColor:#FFC107;
$topbarIconColor:#ffffff;
$topbarIconHoverBgColor:#FFD54F;
$lightMenuitemActiveTextColor:#FFC107;
$darkMenuitemActiveTextColor:#FFC107;
$horizontalMenuitemActiveBgColor:#FFC107;
$horizontalMenuitemActiveTextColor:#ffffff;
$badgeBgColor:#FFC107;
$badgeTextColor:#212121;

@import '../../sass/layout/_layout';
`
}
</pre>

                        <h1>Common SASS Variables</h1>
                        <p>In case you'd like to customize the shared variables, the _variables.scss files are where the options are defined for layout and theme.</p>

                        <h3>sass/_variables.scss</h3>
                        <pre>
{
`$fontFamily:'cabin',sans-serif;
$fontSize:14px;
$textColor:#212121;
$textSecondaryColor:#727272;
$borderRadius:3px;
$transitionDuration:.3s;
`
}
</pre> 
                        <h3>sass/layout/_variables.scss</h3>
                        <pre>
{
`@import '../_variables';

//main
$bodyBgColor:#f2f2f2;
$dividerColor:#E0E0E0;

$footerBgColor:#ffffff;
$footerBorderColor:#e8e8e8;

//breadcrumb
$breadcrumbBgColor:#ffffff;
$breadcrumbBorder: 1px solid #e8e8e8;

//light menu
$menuBgColor:#ffffff;
$menuBorder: 1px solid #E0E0E0;
$menuSeparator:1px solid $dividerColor;
$rootMenuitemTextColor:$textSecondaryColor;
$menuitemTextColor:$textSecondaryColor;
$menuitemIconColor:$textSecondaryColor;
$menuitemHoverBgColor:#e0e0e0;

//dark menu
$darkMenuBgColor:#212121;
$darkMenuBorder: 1px solid #212121;
$darkMenuSeparator:1px solid #373737;
$darkMenuRootMenuitemTextColor:#757575;
$darkMenuitemTextColor:#BDBDBD;
$darkMenuitemIconColor:#BDBDBD;
$darkMenuitemHoverBgColor:#373737;

//topbar
$topbarMenuBgColor:#ffffff;
$topbarMenuBorderColor:#e0e0e0;
$topbarBadgeBgColor:#e0284f;
$topbarBadgeTextColor:#ffffff;

//card
$cardBgColor:#ffffff;
$cardBorder:1px solid #EEEEEE;

//tooltip
$tooltipBgColor:#212121;
$tooltipTextColor:#ffffff;
`
}
</pre>

                        <h3>sass/theme/_variables.scss</h3>
<div style={{height: '400px', overflow: 'auto'}}>
<pre>
{
`@import '../_variables';
$primeIconFontSize:1.143em;

//anchors
$linkColor:$primaryColor;
$linkHoverColor:$primaryDarkColor;
$linkActiveColor:$primaryDarkerColor;

//highlight
$highlightBgColor:$accentColor;
$highlightColorText:$accentColorText;

//focus
$focusOutline:0 none;
$focusOutlineOffset:0;
$focusShadow:0 0 0 .2em lighten($primaryColor, 25%);

//input field (e.g. inputtext, spinner, inputmask)
$inputPadding:0.429em;
$inputBgColor:#f5f5f5;
$inputBorder:1px solid #E0E0E0;
$inputHoverBorderColor:#bdbdbd;
$inputFocusBorderColor:$primaryColor;
$inputErrorBorder:1px solid #EF5350;
$inputPlaceholderTextColor:#909090;
$inputTransition:border-color $transitionDuration, box-shadow $transitionDuration;

//input groups
$inputGroupBorderColor:#E0E0E0;
$inputGroupBgColor:#eeeeee;
$inputGroupTextColor:$textColor;

//input lists (e.g. dropdown, autocomplete, multiselect, orderlist)
$inputListMinWidth:12em;
$inputListBgColor:#ffffff;
$inputListPadding:0;
$inputListItemPadding:0.429em 0.857em;
$inputListItemBgColor:transparent;
$inputListItemTextColor:$textColor;
$inputListItemHoverBgColor:$primaryLighterColor;
$inputListItemHoverTextColor:$primaryDarkerColor;
$inputListItemHighlightBgColor:$highlightBgColor;
$inputListItemHighlightTextColor:$highlightColorText;
$inputListItemBorder:0 none;
$inputListItemMargin:0;
$inputListItemFocusShadow:inset 0 0 0 0.2em lighten($primaryColor, 25%);
$inputListItemTransition:background-color $transitionDuration, box-shadow $transitionDuration;
$inputListItemDividerColor:#E0E0E0;
$inputListHeaderPaddingTop:0.429em;
$inputListHeaderPaddingLeft:0.857em;
$inputListHeaderPaddingRight:0.857em;
$inputListHeaderPaddingBottom:0.429em;
$inputListHeaderMargin:0;
$inputListHeaderBgColor:#eeeeee;
$inputListHeaderTextColor:$textColor;
$inputListHeaderBorder:1px solid #E0E0E0;
$inputListHeaderSearchIconColor:$textSecondaryColor;
$inputListHeaderCloseIconColor:$primaryColor;
$inputListHeaderCloseIconHoverColor:$primaryDarkColor;
$inputListHeaderCloseIconTransition:color $transitionDuration;

//inputs with panels (e.g. password)
$inputContentPanelPadding:.857em;
$inputContentPanelBgColor:#ffffff;
$inputContentPanelTextColor:$textColor;

//static positioned input lists like listbox
$inputListBorder:1px solid #E0E0E0;

//inputs with overlays (e.g. autocomplete, dropdown, multiselect)
$inputOverlayBorder:1px solid #E0E0E0;
$inputOverlayShadow:0 3px 6px 0 rgba(0, 0, 0, 0.16);

//input dropdowns (e.g. multiselect, dropdown)
$inputDropdownIconColor:$textSecondaryColor;

//button
$buttonTextOnlyPadding:0.429em 1em;
$buttonWithLeftIconPadding:0.429em 1em 0.429em 2em;
$buttonWithRightIconPadding:0.429em 2em 0.429em 1em;
$buttonIconOnlyPadding:0.429em;
$buttonIconOnlyWidth:2.143em;
$buttonBgColor:$primaryColor;
$buttonBorder:1px solid $primaryColor;
$buttonTextColor:$primaryTextColor;
$buttonHoverBgColor:$primaryDarkColor;
$buttonHoverTextColor:$primaryTextColor;
$buttonHoverBorderColor:$primaryDarkColor;
$buttonActiveBgColor:$primaryDarkerColor;
$buttonActiveTextColor:$primaryTextColor;
$buttonActiveBorderColor:$primaryDarkerColor;
$buttonTransition:background-color $transitionDuration,box-shadow $transitionDuration;
$raisedButtonShadow:0 3px 2px 0 rgba(0, 0, 0, 0.2);
$roundedButtonBorderRadius:1em;

$secondaryButtonBgColor:#F5F5F5;
$secondaryButtonBorder:1px solid #F5F5F5;
$secondaryButtonTextColor:#212121;
$secondaryButtonHoverBgColor:#E0E0E0;
$secondaryButtonHoverTextColor:#212121;
$secondaryButtonHoverBorderColor:#E0E0E0;
$secondaryButtonActiveBgColor:#BDBDBD;
$secondaryButtonActiveTextColor:#212121;
$secondaryButtonActiveBorderColor:#BDBDBD;
$secondaryButtonFocusShadow:0 0 0 0.2em lighten($primaryColor, 25%);

$infoButtonBgColor:#2196F3;
$infoButtonTextColor:#ffffff;
$infoButtonBorder:1px solid #2196F3;
$infoButtonHoverBgColor:#1976D2;
$infoButtonHoverTextColor:#ffffff;
$infoButtonHoverBorderColor:#1976D2;
$infoButtonActiveBgColor:#1565C0;
$infoButtonActiveTextColor:#ffffff;
$infoButtonActiveBorderColor:#1565C0;
$infoButtonFocusShadow:0 0 0 0.2em lighten($infoButtonBgColor, 25%);

$successButtonBgColor:#4CAF50;
$successButtonTextColor:#ffffff;
$successButtonBorder:1px solid #4CAF50;
$successButtonHoverBgColor:#388E3C;
$successButtonHoverTextColor:#ffffff;
$successButtonHoverBorderColor:#388E3C;
$successButtonActiveBgColor:#2E7D32;
$successButtonActiveTextColor:#ffffff;
$successButtonActiveBorderColor:#2E7D32;
$successButtonFocusShadow:0 0 0 0.2em lighten($successButtonBgColor, 25%);

$warningButtonBgColor:#FFC107;
$warningButtonTextColor:#000000;
$warningButtonBorder:1px solid #FFC107;
$warningButtonHoverBgColor:#FFA000;
$warningButtonHoverTextColor:#000000;
$warningButtonHoverBorderColor:#FFA000;
$warningButtonActiveBgColor:#FF8F00;
$warningButtonActiveTextColor:#000000;
$warningButtonActiveBorderColor:#FF8F00;
$warningButtonFocusShadow:0 0 0 0.2em lighten($warningButtonBgColor, 25%);

$dangerButtonBgColor:#FF5722;
$dangerButtonTextColor:#ffffff;
$dangerButtonBorder:1px solid #FF5722;
$dangerButtonHoverBgColor:#E64A19;
$dangerButtonHoverTextColor:#ffffff;
$dangerButtonHoverBorderColor:#E64A19;
$dangerButtonActiveBgColor:#D84315;
$dangerButtonActiveTextColor:#ffffff;
$dangerButtonActiveBorderColor:#D84315;
$dangerButtonFocusShadow:0 0 0 0.2em lighten($dangerButtonBgColor, 25%);

//checkbox
$checkboxWidth:20px;
$checkboxHeight:20px;
$checkboxActiveBorderColor:$primaryColor;
$checkboxActiveBgColor:$primaryColor;
$checkboxActiveTextColor:$primaryTextColor;
$checkboxActiveHoverBgColor:$primaryDarkerColor;
$checkboxActiveHoverTextColor:$primaryTextColor;
$checkboxActiveHoverBorderColor:$primaryColor;
$checkboxTransition:background-color $transitionDuration, border-color $transitionDuration, box-shadow $transitionDuration;

//radiobutton
$radiobuttonWidth:20px;
$radiobuttonHeight:20px;
$radiobuttonActiveBorderColor:$primaryColor;
$radiobuttonActiveBgColor:$primaryColor;
$radiobuttonActiveTextColor:$primaryTextColor;
$radiobuttonActiveHoverBgColor:$primaryDarkerColor;
$radiobuttonActiveHoverTextColor:$primaryTextColor;
$radiobuttonActiveHoverBorderColor:$primaryColor;
$radiobuttonTransition:background-color $transitionDuration, border-color $transitionDuration, box-shadow $transitionDuration;

//togglebutton
$toggleButtonBgColor:#E0E0E0;
$toggleButtonBorder:1px solid #E0E0E0;
$toggleButtonTextColor:$textColor;
$toggleButtonIconColor:$textSecondaryColor;
$toggleButtonHoverBgColor:$primaryLighterColor;
$toggleButtonHoverBorderColor:$primaryLighterColor;
$toggleButtonHoverTextColor:$primaryDarkerColor;
$toggleButtonHoverIconColor:$primaryColor;
$toggleButtonActiveBgColor:$primaryColor;
$toggleButtonActiveBorderColor:$primaryColor;
$toggleButtonActiveTextColor:$primaryTextColor;
$toggleButtonActiveIconColor:$primaryTextColor;
$toggleButtonActiveHoverBgColor:$primaryDarkColor;
$toggleButtonActiveHoverBorderColor:$primaryDarkerColor;
$toggleButtonActiveHoverTextColor:$primaryTextColor;
$toggleButtonActiveHoverIconColor:$primaryTextColor;

//inplace
$inplacePadding:$inputPadding;
$inplaceHoverBgColor:$primaryLighterColor;
$inplaceHoverTextColor:$primaryDarkerColor;
$inplaceTransition:background-color $transitionDuration;

//rating
$ratingTransition:color $transitionDuration;
$ratingCancelIconColor:#E57373;
$ratingCancelHoverIconColor:#E57373;
$ratingIconFontSize:1.429em;
$ratingStarIconColor:$textColor;
$ratingStarIconHoverColor:$primaryDarkColor;

//slider
$sliderBgColor:#e0e0e0;
$sliderBorder:0 none;
$sliderHeight:.286em;
$sliderWidth:0.286em;
$sliderHandleWidth:1.429em;
$sliderHandleHeight:1.429em;
$sliderHandleBgColor:#bdbdbd;
$sliderHandleBorder:2px solid #bdbdbd;
$sliderHandleBorderRadius:50%;
$sliderHandleHoverBorder:2px solid $primaryLighterColor;
$sliderHandleHoverBgColor:$primaryLighterColor;
$sliderHandleTransition:background-color $transitionDuration;
$sliderRangeBgColor:$primaryColor;

//calendar
$calendarWidth:18.571em;
$calendarNavIconColor:$textSecondaryColor;
$calendarNavIconHoverColor:$primaryColor;
$calendarNavIconTransition:color $transitionDuration, box-shadow $transitionDuration;
$calendarPadding:0.857em;
$calendarTableMargin:0.857em 0 0 0;
$calendarHeaderCellPadding:0.286em;
$calendarCellDatePadding:0.286em;
$calendarCellDateHoverBgColor:$primaryLighterColor;
$calendarCellDateBorderRadius:$borderRadius;
$calendarCellDateSelectedBgColor:$highlightBgColor;
$calendarCellDateSelectedTextColor:$highlightColorText;
$calendarCellDateTodayBgColor:#ffffff;
$calendarCellDateTodayTextColor:$textColor;
$calendarTimePickerDivider: 1px solid #d8dae2;
$calendarTimePickerPadding:0.857em;
$calendarTimePickerIconColor:$textColor;
$calendarTimePickerIconFontSize:1.286em;
$calendarTimePickerTimeFontSize:1.286em;
$calendarTimePickerIconHoverColor:$primaryColor;
$calendarButtonBarDivider: 1px solid #d8dae2;
$calendarMultipleMonthDivider: 1px solid #d8dae2;

//spinner
$spinnerButtonWidth:1.429em;

//input switch
$inputSwitchWidth:2.429em;
$inputSwitchHeight:1em;
$inputSwitchBorderRadius:8px;
$inputSwitchTransition:background-color $transitionDuration, box-shadow $transitionDuration;
$inputSwitchSliderOffBgColor:$inputBgColor;
$inputSwitchHandleOffBgColor:darken($inputBgColor, 10%);
$inputSwitchSliderOffHoverBgColor:$inputBgColor;
$inputSwitchSliderOnBgColor:lighten($highlightBgColor, 15%);
$inputSwitchSliderOnHoverBgColor:lighten($highlightBgColor, 15%);
$inputSwitchHandleOnBgColor:lighten($highlightBgColor, 5%);
$inputSwitchHandleOffFocusBgColor:darken($inputBgColor, 20%);

//panel common (e.g. accordion, panel, tabview)
$panelHeaderBorder:$containerHeaderBorder;
$panelHeaderBgColor:$containerHeaderBgColor;
$panelHeaderTextColor:$containerHeaderTextColor;
$panelHeaderIconColor:$containerHeaderIconColor;
$panelHeaderIconHoverColor:$containerHeaderIconHoverColor;
$panelHeaderIconTransition:color $transitionDuration, box-shadow $transitionDuration;
$panelHeaderFontWeight:700;
$panelHeaderPadding:0.857em 1em;
$panelContentBorder:1px solid #e0e0e0;
$panelContentBgColor:#ffffff;
$panelContentTextColor:$textColor;
$panelContentPadding:0.571em 1em;
$panelFooterBorder:1px solid #e0e0e0;
$panelFooterBgColor:#ffffff;
$panelFooterTextColor:$textColor;
$panelFooterPadding:0.571em 1em;
$clickablePanelHeaderBorder:$clickableContainerHeaderBorder;
$clickablePanelHeaderBgColor:$clickableContainerHeaderBgColor;
$clickablePanelHeaderTextColor:$clickableContainerHeaderTextColor;
$clickablePanelHeaderIconColor:$clickableContainerHeaderIconColor;
$clickablePanelHeaderIconTransition:color $transitionDuration;
$clickablePanelHeaderFontWeight:700;
$clickablePanelHeaderPadding:.857em 1em;
$clickablePanelHeaderHoverBgColor:$clickableContainerHeaderHoverBgColor;
$clickablePanelHeaderHoverBorder:$clickableContainerHeaderHoverBorder;
$clickablePanelHeaderHoverTextColor:$clickableContainerHeaderHoverTextColor;
$clickablePanelHeaderHoverIconColor:$clickableContainerHeaderHoverIconColor;
$clickablePanelHeaderActiveBgColor:$clickableContainerHeaderActiveBgColor;
$clickablePanelHeaderActiveBorder:$clickableContainerHeaderActiveBorder;
$clickablePanelHeaderActiveTextColor:$clickableContainerHeaderActiveTextColor;
$clickablePanelHeaderActiveIconColor:$clickableContainerHeaderActiveIconColor;
$clickablePanelHeaderActiveHoverBgColor:$clickableContainerHeaderActiveHoverBgColor;
$clickablePanelHeaderActiveHoverBorder:$clickableContainerHeaderActiveHoverHoverBorder;
$clickablePanelHeaderActiveHoverTextColor:$clickableContainerHeaderActiveHoverTextColor;
$clickablePanelHeaderActiveHoverIconColor:$clickableContainerHeaderActiveHoverIconColor;
$clickablePanelHeaderTransition:background-color $transitionDuration;

//accordion
$accordionSpacing:2px;

//tabview
$tabsNavBorder:0 none;
$tabsNavBgColor:#ffffff;
$tabHeaderSpacing:.214em;

//scrollpanel
$scrollPanelHandleBgColor:#bdbdbd;
$scrollPanelTrackBorder:0 none;
$scrollPanelTrackBgColor:#e0e0e0;

//card
$cardShadow:0 3px 6px 0 rgba(0, 0, 0, 0.16);

//paginator
$paginatorBgColor:#ffffff;
$paginatorBorder:$panelContentBorder;
$paginatorPadding:0;
$paginatorIconColor:$textSecondaryColor;
$paginatorElementWidth:2.286em;
$paginatorElementHeight:2.286em;
$paginatorElementHoverBgColor:$primaryLighterColor;
$paginatorElementHoverIconColor:$primaryDarkerColor;
$paginatorElementBorderRadius:0;
$paginatorElementMargin:0;
$paginatorElementPadding:0;
$paginatorElementBorder:0 none;

//table
$tableHeaderCellPadding:.500em 1.214em;
$tableHeaderCellBgColor:#ffffff;
$tableHeaderCellTextColor:$textColor;
$tableHeaderCellFontWeight:700;
$tableHeaderCellBorder:$panelContentBorder;
$tableHeaderCellHoverBgColor:$primaryLighterColor;
$tableHeaderCellHoverTextColor:$primaryDarkerColor;
$tableHeaderCellIconColor:$textColor;
$tableHeaderCellHoverIconColor:$primaryDarkerColor;
$tableBodyRowBgColor:#F5F5F5;
$tableBodyRowTextColor:$textColor;
$tableBodyRowEvenBgColor:#ffffff;
$tableBodyRowHoverBgColor:$primaryLighterColor;
$tableBodyRowHoverTextColor:$primaryDarkerColor;
$tableBodyCellBorder:$panelContentBorder;
$tableBodyCellPadding:.500em 1.214em;
$tableFooterCellPadding:.500em 1.214em;
$tableFooterCellBgColor:#ffffff;
$tableFooterCellTextColor:$textColor;
$tableFooterCellFontWeight:500;
$tableFooterCellBorder:$panelContentBorder;
$tableResizerHelperBgColor:$primaryColor;

//schedule
$scheduleEventBgColor:$primaryColor;
$scheduleEventBorder:1px solid $primaryDarkColor;
$scheduleEventTextColor:$primaryTextColor;

//tree
$treeContainerPadding:0.286em; //?
$treeNodePadding:0.143em 0;
$treeNodeLabelPadding:0.286em;
$treeNodeContentSpacing:0.143em;

//lightbox
$lightBoxNavIconFontSize:2em;
$lightBoxNavIconColor:#ffffff;

//org chart
$organizationChartConnectorColor:#c8c8c8;

//messages
$messagesMargin:1em 0;
$messagesPadding:1em;
$messagesIconFontSize:1.714em;
$messageCloseIconFontSize:1.5em;

//message
$messagePadding:$inputPadding;
$messageMargin: 0;
$messageIconFontSize: 1.25em; //?
$messageTextFontSize: 1em;

//toast
$toastShadow: 0 3px .429em 0 rgba(0, 0, 0, 0.16);
$toastMessageMargin:0 0 1em 0;

//severities
$infoMessageBgColor:#64B5F6;
$infoMessageBorder:0 none;
$infoMessageTextColor:#000000;
$infoMessageIconColor:#000000;

$successMessageBgColor:#4CAF50;
$successMessageBorder:0 none;
$successMessageTextColor:#ffffff;
$successMessageIconColor:#ffffff;

$warnMessageBgColor:#FFD54F;
$warnMessageBorder:0 none;
$warnMessageTextColor:#000000;
$warnMessageIconColor:#000000;

$errorMessageBgColor:#EF5350;
$errorMessageBorder:0 none;
$errorMessageTextColor:#ffffff;
$errorMessageIconColor:#ffffff;

//growl
$growlTopLocation:120px;
$growlIconFontSize:3.429em;
$growlMessageTextMargin: 0 0 0 4em;
$growlMargin:0 0 1em 0;
$growlPadding:1em;
$growlShadow:0 3px .429em 0 rgba(0, 0, 0, 0.16);
$growlOpacity:.9;

//overlays
$overlayContentBorder:$panelContentBorder;
$overlayContainerShadow:0 3px 6px 0 rgba(0, 0, 0, 0.16);

//dialog
$dialogHeaderPadding:.5em;
$confirmDialogPadding:1.5em;

//overlay panel
$overlayPanelCloseIconBgColor:$primaryDarkColor;
$overlayPanelCloseIconColor:$primaryTextColor;
$overlayPanelCloseIconHoverBgColor:$primaryDarkerColor;
$overlayPanelCloseIconHoverColor:$primaryTextColor;

//tooltip
$tooltipBgColor:#212121;
$tooltipTextColor:#ffffff;
$tooltipPadding:$inputPadding;

//steps
$stepsItemBgColor:#ffffff;
$stepsItemBorder:1px solid #e0e0e0;
$stepsItemBorderRadius:$borderRadius;
$stepsItemNumberColor:$textColor;
$stepsItemTextColor:$textSecondaryColor;
$stepsItemWidth:2em;
$stepsItemHeight:2em;

//progressbar
$progressBarHeight:1.714em;
$progressBarBorder:0 none;
$progressBarBgColor:#e0e0e0;
$progressBarValueBgColor:$primaryColor;

//menu (e.g. menu, menubar, tieredmenu)
$menuBgColor:$panelContentBgColor;
$menuBorder:$panelContentBorder;
$menuPadding:0;
$menuTextColor:$textColor;
$menuitemPadding:.571em .857em;
$menuitemMargin:0;
$menuitemTextColor:$textColor;
$menuitemIconColor:$textColor;
$menuitemHoverTextColor:$primaryDarkerColor;
$menuitemHoverIconColor:$primaryDarkerColor;
$menuitemHoverBgColor:$primaryLighterColor;
$menuitemActiveTextColor:$primaryDarkerColor;
$menuitemActiveIconColor:$primaryDarkerColor;
$menuitemActiveBgColor:$primaryLighterColor;
$submenuHeaderMargin: 0;
$submenuPadding: 0;
$overlayMenuBorder:1px solid #e0e0e0;
$overlayMenuShadow:0 3px 6px 0 rgba(0, 0, 0, 0.16);

//misc
$maskBgColor:rgba(139, 139, 144, 0.72);   //dialog mask
$inlineSpacing:.429em;                    //spacing between inline elements
$chipsItemMargin:0 .286em 0 0;            //autocomplete and chips token spacing
$dataIconColor:$textSecondaryColor;       //icon color of a data such as treetoggler, table expander
$dataIconHoverColor:$textColor;           //hover icon color of a data such as treetoggler, table expander

//general
$disabledOpacity:.5;                      //opacity of a disabled item
`
}
</pre>
</div>

                        <p>In the demo app layout and theme css files are defined using link tags in index.html so the demo can switch them on the fly by changing the path however if this is not a requirement, you may also import them in App.js so that webpack adds them to the bundle.</p>

                        <h1>Menu Modes</h1>
                        <p>Menu has 4 modes, static, overlay, slim and horizontal. Layout container element in App.js is used to define which mode to use by adding specific classes. List
                        below indicates the style classes for each mode.</p>
                        
                        <ul>
                            <li>Static: <b>layout-wrapper layout-static</b></li>
                            <li>Overlay: <b>layout-wrapper layout-overlay</b></li>
                            <li>Popup: <b>layout-wrapper layout-popup</b></li>
                            <li>Horizontal: <b>layout-wrapper layout-horizontal</b></li>
                        </ul>

                        <p>For example to create a horizontal menu, the div element should be in following form;</p>
<pre>
{`<div className="layout-wrapper layout-horizontal">
`
}
</pre>

                        <p>It is also possible to leave the choice to the user by keeping the preference at a component and using an expression to bind it so that user can switch between modes. Sample
                            application has an example implementation of such use case. Refer to App.js for an example.</p>

                        <h1>PrimeFlex Grid System</h1>
                        <p>Babylon uses PrimeFlex Grid System throughout the samples, although any Grid library can be used we suggest using PrimeFlex as your grid system as it is well tested and supported by PrimeReact. PrimeFlex is
                        available at npm and defined at package.json of PrimeReact so that it gets installed by default.</p> 

                        <h1>Customizing Styles</h1>
                        <p>It is suggested to write your customizations in the scss files under the <i>sass/overrides</i> folder for seamless updates
                        as these files are empty by default and never updated.</p>
                        
                        <ul>
                            <li>_layout_styles: Customizations for the layout</li>
                            <li>_layout_variables: Overrides of layout variables</li>
                            <li>_theme_styles: Customizations for the theme</li>
                            <li>_theme_variables: Overrides of theme variables</li>
                        </ul>
                    
                    </div>
                </div>
            </div>
        )
    }
}