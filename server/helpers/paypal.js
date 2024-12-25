const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AX-B_FdK2LrtPn0_Qf_jp90LOW61Wfb2eHcAFcDi417AfCSUrIlNm2S9twfaJQ7qfIZHyL8vye0GQ0en",
  client_secret: "EAbNwKrjYum8bpy5m4u2dk0pNMdlZ9AW7iPYA5BstJOdu0RYU83gh5ALzy38Ep_x0mhT6y72nIOJxmk8",
});

module.exports = paypal;
