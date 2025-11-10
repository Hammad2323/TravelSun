var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/emailjs-com/cjs/store/store.js
var require_store = __commonJS({
  "node_modules/emailjs-com/cjs/store/store.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.store = void 0;
    exports2.store = {
      _origin: "https://api.emailjs.com"
    };
  }
});

// node_modules/emailjs-com/cjs/methods/init/init.js
var require_init = __commonJS({
  "node_modules/emailjs-com/cjs/methods/init/init.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.init = void 0;
    var store_1 = require_store();
    var init = (userID, origin = "https://api.emailjs.com") => {
      store_1.store._userID = userID;
      store_1.store._origin = origin;
    };
    exports2.init = init;
  }
});

// node_modules/emailjs-com/cjs/utils/validateParams.js
var require_validateParams = __commonJS({
  "node_modules/emailjs-com/cjs/utils/validateParams.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateParams = void 0;
    var validateParams = (userID, serviceID, templateID) => {
      if (!userID) {
        throw "The user ID is required. Visit https://dashboard.emailjs.com/admin/integration";
      }
      if (!serviceID) {
        throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
      }
      if (!templateID) {
        throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
      }
      return true;
    };
    exports2.validateParams = validateParams;
  }
});

// node_modules/emailjs-com/cjs/models/EmailJSResponseStatus.js
var require_EmailJSResponseStatus = __commonJS({
  "node_modules/emailjs-com/cjs/models/EmailJSResponseStatus.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EmailJSResponseStatus = void 0;
    var EmailJSResponseStatus = class {
      constructor(httpResponse) {
        this.status = httpResponse.status;
        this.text = httpResponse.responseText;
      }
    };
    exports2.EmailJSResponseStatus = EmailJSResponseStatus;
  }
});

// node_modules/emailjs-com/cjs/api/sendPost.js
var require_sendPost = __commonJS({
  "node_modules/emailjs-com/cjs/api/sendPost.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sendPost = void 0;
    var EmailJSResponseStatus_1 = require_EmailJSResponseStatus();
    var store_1 = require_store();
    var sendPost = (url, data, headers = {}) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", ({ target }) => {
          const responseStatus = new EmailJSResponseStatus_1.EmailJSResponseStatus(target);
          if (responseStatus.status === 200 || responseStatus.text === "OK") {
            resolve(responseStatus);
          } else {
            reject(responseStatus);
          }
        });
        xhr.addEventListener("error", ({ target }) => {
          reject(new EmailJSResponseStatus_1.EmailJSResponseStatus(target));
        });
        xhr.open("POST", store_1.store._origin + url, true);
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
        xhr.send(data);
      });
    };
    exports2.sendPost = sendPost;
  }
});

// node_modules/emailjs-com/cjs/methods/send/send.js
var require_send = __commonJS({
  "node_modules/emailjs-com/cjs/methods/send/send.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.send = void 0;
    var store_1 = require_store();
    var validateParams_1 = require_validateParams();
    var sendPost_1 = require_sendPost();
    var send = (serviceID, templateID, templatePrams, userID) => {
      const uID = userID || store_1.store._userID;
      validateParams_1.validateParams(uID, serviceID, templateID);
      const params = {
        lib_version: "3.2.0",
        user_id: uID,
        service_id: serviceID,
        template_id: templateID,
        template_params: templatePrams
      };
      return sendPost_1.sendPost("/api/v1.0/email/send", JSON.stringify(params), {
        "Content-type": "application/json"
      });
    };
    exports2.send = send;
  }
});

// node_modules/emailjs-com/cjs/methods/sendForm/sendForm.js
var require_sendForm = __commonJS({
  "node_modules/emailjs-com/cjs/methods/sendForm/sendForm.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sendForm = void 0;
    var store_1 = require_store();
    var validateParams_1 = require_validateParams();
    var sendPost_1 = require_sendPost();
    var findHTMLForm = (form) => {
      let currentForm;
      if (typeof form === "string") {
        currentForm = document.querySelector(form);
      } else {
        currentForm = form;
      }
      if (!currentForm || currentForm.nodeName !== "FORM") {
        throw "The 3rd parameter is expected to be the HTML form element or the style selector of form";
      }
      return currentForm;
    };
    var sendForm = (serviceID, templateID, form, userID) => {
      const uID = userID || store_1.store._userID;
      const currentForm = findHTMLForm(form);
      validateParams_1.validateParams(uID, serviceID, templateID);
      const formData = new FormData(currentForm);
      formData.append("lib_version", "3.2.0");
      formData.append("service_id", serviceID);
      formData.append("template_id", templateID);
      formData.append("user_id", uID);
      return sendPost_1.sendPost("/api/v1.0/email/send-form", formData);
    };
    exports2.sendForm = sendForm;
  }
});

// node_modules/emailjs-com/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/emailjs-com/cjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sendForm = exports2.send = exports2.init = void 0;
    var init_1 = require_init();
    Object.defineProperty(exports2, "init", { enumerable: true, get: function() {
      return init_1.init;
    } });
    var send_1 = require_send();
    Object.defineProperty(exports2, "send", { enumerable: true, get: function() {
      return send_1.send;
    } });
    var sendForm_1 = require_sendForm();
    Object.defineProperty(exports2, "sendForm", { enumerable: true, get: function() {
      return sendForm_1.sendForm;
    } });
    exports2.default = {
      init: init_1.init,
      send: send_1.send,
      sendForm: sendForm_1.sendForm
    };
  }
});

// netlify/functions/sendEmail.js
var import_emailjs_com = __toESM(require_cjs(), 1);
//# sourceMappingURL=sendEmail.js.map
