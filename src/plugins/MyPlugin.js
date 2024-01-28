import GlobalComp from "../components/GlobalComp.vue";

// Create Plugin
export default {
  install: (app, options) => {
    //Logic of Plugin

    // Add Global Component
    app.component("GlobalComp", GlobalComp);

    // Add directive
    // app.directive("font-style", (el, binding) => {
    //   el.style.fontSize = "24pt";
    //   el.style.fontFamily = "courier";
    //   el.style.color = "#ee0000";
    //   el.style.fontWeight = "bold";
    //   console.log(binding);
    // });

    // Passing Customizable Options to Plugins
    // console.log(options);
    app.directive("font-style", (el, binding) => {
      el.style.fontSize = options.fontSize;
      el.style.fontFamily = options.fontFamily;
      el.style.color = options.color;
      el.style.fontWeight = options.fontWeight;
      console.log(binding);
    });

    app.directive("logo-style", (el) => {
      el.style.fontSize = options.fontSize;
      el.style.fontFamily = options.logoFontFamily;
      el.style.color = options.color;
    })


    // Provide - Inject 
    app.provide("siteName", "Task Manager App");


    // Add Global Instance Properties or Methods 
    // Inject a Globally available $translate Method
    app.config.globalProperties.$translate = (key) => {
        console.log(key);
        return key.split('.').reduce((o, i) => {
            // console.log(o)
            // console.log(i)
            if(o){
                return o[i];
            }
        }, options)
    } 
  },
};
