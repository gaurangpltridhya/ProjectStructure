import { Injectable } from "@angular/core";
import { Constants } from '../API-URL/contants';
import { Globals } from "../globals";

declare var $: any;
declare var window: any;
declare var moment: any;
let _thisObj;
@Injectable()
export class UtilityService {
  timer: any;
  access: any;
  constructor(
    private globals: Globals,
  ) {
    _thisObj = this;
  }

  phoneValidate(event: any) {
    let number = event.target.value.replace(/[^\d]/g, "");
    if (number != "") {
      // if (flag === false) {
      if (number.length >= 7) {
        return true;
      } else {
        return false;
      }
      // } else {
      //   return true;
      // }
    } else {
      return true;
    }
  }

  phoneNumberFormat() {
    $(document).ready(() => {
      $(".phoneNum").each(() => {
        // let number = $(this).val().replace(/[^\d]/g, "");
        // if (number.length == 7) {
        //   number = number.replace(/(\d{3})(\d{4})/, "$1-$2");
        // } else if (number.length == 10) {
        //   number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        // }
        // $(this).val(number);

        let first = true;
        var i = $(this).val();
        i = i
          .replace(/[^0-9\+]/g, '')
          .replace(/(\+)+/g, function (match: any, p1: any) {
            if (first) {
              first = false;
              return p1;
            }
            else return '';
          });
        $(this).val(i);

      });
      $(".phoneNum").on("input", () => {
        // var number = $(this).val().replace(/[^\d]/g, "");
        // if (number.length == 7) {
        //   number = number.replace(/(\d{3})(\d{4})/, "$1-$2");
        // } else if (number.length == 10) {
        //   number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        // }
        // $(this).val(number);

        let first = true;
        var i = $(this).val();
        i = i
          .replace(/[^0-9\+]/g, '')
          .replace(/(\+)+/g, function (match: any, p1: any) {
            if (first) {
              first = false;
              return p1;
            }
            else return '';
          });

        $(this).val(i);

      });
    });
  }


  validateNumber() {
    $(".number-validate").keypress((event: any) => {
      var $this = $(this);
      if ((event.which != 46 || $this.val().indexOf(".") != -1) && ((event.which < 48 || event.which > 57) && (event.which != 0 && event.which != 8))) {
        event.preventDefault();
      }
    });
  }

  validateNumberAllowColun() {
    $(".number-validate-colun").keypress((event: any) => {
      var $this = $(this);
      if ((event.which != 46 || $this.val().indexOf(".") != -1) && ((event.which < 48 || event.which > 58) && (event.which != 0 && event.which != 8))) {
        event.preventDefault();
      }
    });
  }

  serializeURL(obj: any, prefix: any): any {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push(v !== null && typeof v === "object" ? this.serializeURL(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

  titleCase(str: any) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  getDatatableFooterCount(dataLength: any, event: any, paramLength: any, paramStart: any, recordsFiltered: any) {
    let startIndex;
    let endIndex;
    if (dataLength > 0) {
      startIndex = ((event - 1) * paramLength) + 1;
      if ((paramStart - 1) + paramLength > recordsFiltered) {
        endIndex = recordsFiltered;
      } else {
        if (paramStart > 0) {
          // endIndex = (paramStart - 1) + paramLength;
          if (paramStart * paramLength > recordsFiltered) {
            endIndex = recordsFiltered;

          } else {
            endIndex = paramStart * paramLength;
          }
        } else {
          endIndex = paramStart + paramLength;
        }
      }
    } else {
      startIndex = 0;
      endIndex = 0;
    }
    return { startIndex, endIndex };
  }



  downloadFile(download_url: string, filename: string) {
    if (download_url != "") {
      $.ajax(download_url, {
        method: "GET",
        headers: {
          //secretKey: SERVER_SECRETKEY,
          platform: "web"
        },
        xhrFields: {
          responseType: "blob"
        },
        success: function (res: any, status: any, xhr: any) {
          var URL = window.URL || window.webkitURL;
          var downloadUrl = URL.createObjectURL(res);
          if (filename) {
            // use HTML5 a[download] attribute to specify filename
            var a = document.createElement("a");
            // safari doesn't support this yet
            if (typeof a.download === "undefined") {
              window.location = downloadUrl;
            } else {
              a.href = downloadUrl;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
            }
          } else {
            window.location = downloadUrl;
          }
        }
      });
    }
  }

  isMobile() {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|Mozilla|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
  }

}
