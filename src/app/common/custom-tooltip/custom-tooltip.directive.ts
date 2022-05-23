import { Directive, ElementRef, Input, Renderer2, OnInit, HostListener } from '@angular/core';

declare let $: any;
@Directive({
  selector: '[customTooltip]'
})
export class CustomTooltipDirective {

  copyDiv = '';
  tooltip!: HTMLElement;
  tooltipTitle: string = 'Copy';
  offset = 10;
  delay = 500;

  @Input() placement: string = 'top';
  @Input() hoverIcons!: string; // get input from user


  // @HostListener('mouseenter') onMouseEnter() {
  //   if (!this.tooltip) { this.show(); }
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   if (this.tooltip) { this.hide(); }
  // }

  @HostListener('mouseover') onHover() {
    if ($(window).width() > 960) {
      // setTimeout(() => {
      this.prepareTooltip();
      // }, 2000);
    }
  }

  @HostListener('click') click() {
    if ($(window).width() <= 960) {
      // setTimeout(() => {
      this.prepareTooltip();
      // }, 2000);
    }
  }

  prepareTooltip() {
    this.closeAllPopover();
    // this.renderer.setStyle(this.elem.nativeElement, 'cursor', 'pointer');
    // this.tooltipTitle = 'Click to Copy';
    this.copyDiv = '<div class="action-tooltip">'
    if (this.hoverIcons.includes('copy')) {
      this.copyDiv += '<span style="cursor:pointer;" class="copy-text-toolTip">Copy</span>'
    }
    if (this.hoverIcons.includes('phone')) {
      this.copyDiv += '<span style="cursor:pointer;" class="phone-to-dial"> | Call</span>'
    }
    if (this.hoverIcons.includes('email')) {
      this.copyDiv += '<span style="cursor:pointer;" class="email-to-mail"> | Send Email</span>'
    }
    if (this.hoverIcons.includes('map')) {
      this.copyDiv += '<span style="cursor:pointer;" class="address-to-map"> | See Google Map</span>'
    }
    this.copyDiv += '</div>'

    if (!this.tooltip) { this.show(); }
  }

  constructor(private elem: ElementRef, private renderer: Renderer2) {
    // renderer.setStyle(elem.nativeElement, 'box-shadow', '2px 2px 12px #58A362');
  }

  ngOnInit() {
    // console.log(this.hoverIcons);
    $("#container-3").scroll(() => {
      // this.closeAllPopover();
      this.setPosition();
    });

    if ($(window).width() > 960) { // work only greater than 960
      $('body').click(() => { // on body click hide popovers
        this.closeAllPopover();
        this.tooltip = null;
      });
    }
  }

  closeAllPopover() {
    let popups = document.getElementsByClassName("ng-tooltip-show");
    if (popups.length > 0) {
      for (let i = 0; i < popups.length; i++) {
        popups[i].classList.remove("ng-tooltip-show");
      }
      this.tooltip = null;
    }
  }

  /*
   * copy text
   */
  copyText() {
    // if (this.tooltip) { this.hide(); }
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.elem.nativeElement.textContent.trim();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.tooltipTitle = 'Copied!';
    // if (!this.tooltip) { this.show(); }
    if (this.tooltip) { this.hide(); }

  }

  /*
   * phone number open in dialer
   */
  phoneToDial() {
    let link = "tel:" + this.elem.nativeElement.textContent.trim();
    window.location.href = link;
    if (this.tooltip) { this.hide(); }
  }

  /*
   * email id open into mail engine 
   */
  emailToMail() {
    let link = "mailto:" + this.elem.nativeElement.textContent.trim();
    window.open(link)
    // window.location.href = link;
    if (this.tooltip) { this.hide(); }
  }

  /*
   * adress to open google map
   */
  addressToGoogleMap() {
    let link = "https://www.google.com/maps/search/?api=1&query="; // API url for open map
    let address = this.elem.nativeElement.textContent.trim();
    address = address.split(/[ ,]+/).join('+'); // replace space and comma into + sign
    link += address;
    // window.location.href = link;
    window.open(link)
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');

    $(".copy-text-toolTip").click(() => { // call copy text func
      this.copyText();
    });

    $(".phone-to-dial").click(() => { // call phone to dial func
      this.phoneToDial();
    });

    $(".email-to-mail").click(() => { // call phone to dial func
      this.emailToMail();
    });

    $(".address-to-map").click(() => { // open address to google map
      this.addressToGoogleMap();
    });

    setTimeout(() => { // hide tooltip after 5 sec
      if (this.tooltip) { this.hide(); }
    }, 3500)

    // below commented code is for on click icon usinf javascript
    // let that = this;
    // let anchors: HTMLElement = document.getElementsByClassName('copy-text-toolTip')[0] as HTMLElement;
    // console.log(anchors);
    // anchors.onclick = function () {
    //   that.copyText();
    // }
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    window.setTimeout(() => {
      if (this.tooltip) {
        this.renderer.removeChild(document.body, this.tooltip);
        this.tooltip = null;
      }
    }, 500);
  }

  create() {
    this.tooltip = this.renderer.createElement('span');
    // this.renderer.appendChild(this.tooltip,this.renderer.createText(this.tooltipTitle)); // textNode
    this.tooltip.insertAdjacentHTML('beforeend', this.copyDiv);
    this.renderer.appendChild(document.body, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);

    // delay
    this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
  }

  setPosition() {
    if (this.elem.nativeElement == undefined || this.tooltip == undefined) {
      return;
    }
    const hostPos = this.elem.nativeElement.getBoundingClientRect();

    const tooltipPos = this.tooltip.getBoundingClientRect();

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

}
