import { EventHandlerUtil } from '../_utils';

class ThemeMode {
  menu: HTMLElement | null = null;
  element: HTMLElement | null = null;

  private getParamName = (postfix: string): string => {
    const ktName = document.body.hasAttribute('data-kt-name');
    const name = ktName ? ktName + '_' : '';
    return 'kt_' + name + 'theme_mode_' + postfix;
  };

  public getMode = (): 'light' => {
    // Always return light mode
    return 'light';
  };

  public setMode = (mode: 'light', menuMode: 'light' | ''): void => {
    // Force mode to always be 'light'
    mode = 'light';

    const modeParam: string = this.getParamName('value');
    const menuModeParam: string = this.getParamName('menu');

    // Set mode to the target element
    this.element?.setAttribute('data-bs-theme', mode);

    // Disable switching state
    const self = this;
    setTimeout(function () {
      self.element?.removeAttribute('data-kt-theme-mode-switching');
    }, 300);

    // Store mode value in storage
    if (localStorage) {
      localStorage.setItem(modeParam, mode);
    }

    // Set active menu item
    const activeMenuItem: HTMLElement | null =
      this.menu?.querySelector('[data-kt-element="mode"][data-kt-value="light"]') || null;

    if (activeMenuItem && localStorage) {
      localStorage.setItem(menuModeParam, 'light');
      this.setActiveMenuItem(activeMenuItem);
    }

    // Flip images
    this.flipImages();
  };

  public getMenuMode = (): 'light' => {
    // Always return light mode for menu
    return 'light';
  };

  public getSystemMode = (): 'light' => {
    // Always return light mode
    return 'light';
  };

  private initMode = (): void => {
    // Always initialize with light mode
    this.setMode('light', 'light');
    if (this.element) {
      EventHandlerUtil.trigger(this.element, 'kt.thememode.init');
    }
  };

  private setActiveMenuItem = (item: HTMLElement): void => {
    const activeItem = this.menu?.querySelector('.active[data-kt-element="mode"]');
    if (activeItem) {
      activeItem.classList.remove('active');
    }

    item.classList.add('active');
  };

  private handleMenu = (): void => {
    this.menu
      ?.querySelectorAll<HTMLElement>('[data-kt-element="mode"]')
      ?.forEach((item: HTMLElement) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();

          // Always enforce light mode
          this.setMode('light', 'light');
        });
      });
  };

  public flipImages = () => {
    document.querySelectorAll<HTMLElement>('[data-kt-img-dark]')?.forEach((item: HTMLElement) => {
      if (item.tagName === 'IMG') {
        item.setAttribute('data-kt-img-light', item.getAttribute('src') || '');
        item.setAttribute('src', item.getAttribute('data-kt-img-light') || '');
      } else {
        item.style.backgroundImage = "url('" + item.getAttribute('data-kt-img-light') + "')";
      }
    });
  };

  public init = () => {
    this.menu = document.querySelector<HTMLElement>('[data-kt-element="theme-mode-menu"]');
    this.element = document.documentElement;

    this.initMode();

    if (this.menu) {
      this.handleMenu();
    }
  };
}

const ThemeModeComponent = new ThemeMode();
// Initialize app on document ready => ThemeModeComponent.init()
export { ThemeModeComponent };
