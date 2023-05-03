import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import jwt from "jwt-decode"; // import dependency

dayjs.extend(duration);

const helpers = {
  cutText(text, length) {
    if (text.split(" ").length > 1) {
      const string = text.substring(0, length);
      const splitText = string.split(" ");
      splitText.pop();
      return splitText.join(" ") + "...";
    } else {
      return text;
    }
  },
  formatDate(date, format) {
    return dayjs(date).format(format);
  },

  capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return "";
    }
  },
  onlyNumber(string) {
    if (string) {
      return string.replace(/\D/g, "");
    } else {
      return "";
    }
  },
  // formatCurrency(number) {
  //   if (number) {
  //     const formattedNumber = number.toString().replace(/\D/g, "");
  //     const rest = formattedNumber.length % 3;
  //     let currency = formattedNumber.substr(0, rest);
  //     const thousand = formattedNumber.substr(rest).match(/\d{3}/g);
  //     let separator;

  //     if (thousand) {
  //       separator = rest ? "." : "";
  //       currency += separator + thousand.join(",");
  //     }

  //     return currency;
  //   } else {
  //     return "";
  //   }
  // },
  // formatCurrency: function (num) {
  //   num = isNaN(num) || num === "" || num === null ? 0.0 : parseFloat(num);
  //   return (
  //     (num < 0 ? "-" : "") +
  //     "$" +
  //     parseFloat(Math.abs(num))
  //       .toFixed(2)
  //       .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
  //   );
  // },
  // //formatNumber in javascript
  // formatNumber: function (number, decimals, dec_point, thousands_sep) {
  //   // Format a number with grouped thousands
  //   //
  //   // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  //   // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   // +     bugfix by: Michael White (http://getsprink.com)
  //   var i, j, kw, kd, km;

  //   if (isNaN((decimals = Math.abs(decimals)))) {
  //     decimals = 2;
  //   }
  //   if (dec_point == undefined) {
  //     dec_point = ",";
  //   }
  //   if (thousands_sep == undefined) {
  //     thousands_sep = ".";
  //   }

  //   i = parseInt((number = (+number || 0).toFixed(decimals))).toString();
  //   j = (j = i.length) > 3 ? j % 3 : 0;

  //   km = "";
  //   while (j-- > 1) {
  //     km += ",";
  //   } // seperator btw 1000s      kw=i.substr(-3);// get the last 3 digits       kd=kd=='000'?'0':kd;// pad with leading zeros      number=j?km+(kw):''+kw;// put them together and add formatting      return prefix==undefined?number:prefix+number+suffix;}
  // },
  formatCurrency(num) {
    var p = num.toFixed(2).split(".");
    return (
      "$" +
      p[0]
        .split("")
        .reverse()
        .reduce(function (acc, num, i, orig) {
          return num + (i && !(i % 3) ? "," : "") + acc;
        }, "") +
      "." +
      p[1]
    );
  },

  //$('#tbl_items').DataTable();

  diffTimeByNow(time) {
    const startDate = dayjs(dayjs().format("YYYY-MM-DD HH:mm:ss").toString());
    const endDate = dayjs(dayjs(time).format("YYYY-MM-DD HH:mm:ss").toString());

    const duration = dayjs.duration(endDate.diff(startDate));
    const milliseconds = Math.floor(duration.asMilliseconds());

    const days = Math.round(milliseconds / 86400000);
    const hours = Math.round((milliseconds % 86400000) / 3600000);
    let minutes = Math.round(((milliseconds % 86400000) % 3600000) / 60000);
    const seconds = Math.round((((milliseconds % 86400000) % 3600000) % 60000) / 1000);

    if (seconds < 30 && seconds >= 0) {
      minutes += 1;
    }

    return {
      days: days.toString().length < 2 ? "0" + days : days,
      hours: hours.toString().length < 2 ? "0" + hours : hours,
      minutes: minutes.toString().length < 2 ? "0" + minutes : minutes,
      seconds: seconds.toString().length < 2 ? "0" + seconds : seconds
    };
  },
  isset(obj) {
    if (obj !== null && obj !== undefined) {
      if (typeof obj === "object" || Array.isArray(obj)) {
        return Object.keys(obj).length;
      } else {
        return obj.toString().length;
      }
    }

    return false;
  },
  toRaw(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  randomNumbers(from, to, length) {
    const numbers = [0];
    for (let i = 1; i < length; i++) {
      numbers.push(Math.ceil(Math.random() * (from - to) + to));
    }

    return numbers;
  },
  toRGB(colors) {
    const tempColors = Object.assign({}, colors);
    const rgbColors = Object.entries(tempColors);
    for (const [key, value] of rgbColors) {
      if (typeof value === "string") {
        if (value.replace("#", "").length == 6) {
          const aRgbHex = value.replace("#", "").match(/.{1,2}/g);
          tempColors[key] = (opacity = 1) =>
            `rgb(${parseInt(aRgbHex[0], 16)} ${parseInt(aRgbHex[1], 16)} ${parseInt(
              aRgbHex[2],
              16
            )} / ${opacity})`;
        }
      } else {
        tempColors[key] = helpers.toRGB(value);
      }
    }
    return tempColors;
  },
  FindTotal(props) {
    var subtot = 0;
    if (props.hasOwnProperty("products")) {
      props.products.forEach((zone, index) => {
        subtot += zone.unit_price * zone.quantity;
      });
    }
    return subtot;
  },
  CalculateVat(props) {
    if (props.hasOwnProperty("products")) {
      let total = props.products.reduce((accumulator, object) => {
        return accumulator + object.unit_price * object.quantity;
      }, 0);

      return (total / 100) * 5;
    } else return 0;
  },
  isNullObject(obj) {
    return obj === null || typeof obj === "undefined" || Object.keys(obj).length === 0;
  },
  isObjEmpty(obj) {
    Object.keys(obj).length === 0;
  },

  currencyCodeFormat(props) {
    return `$${props}.00`;
  },
  getTokenData() {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const accessToken = JSON.parse(authUser).accessToken;

      if (accessToken) {
        return jwt(accessToken);
      }
    }
    return {};
  },
  getRole() {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const accessToken = JSON.parse(authUser).accessToken;

      if (accessToken) {
        return jwt(accessToken).role;
      }
    }
    return "";
  }
};

export { helpers as helper };
