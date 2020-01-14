import request from "@/utils/request";

// request.get("/db.json").then(response => {
//     console.log(response.data);
// });

// request({
//     method: "get",
//     url: "/db.json"
// }).then(response => {
//     console.log(response.data);
// });

// const BASE_URI = process.env.VUE_APP_BASE_API;

export default {
  getList() {
    const req = request({
      method: "get",
      // url: BASE_URI + "/db.json"
      url: "/db.json"
    });
    return req;
  }
};
