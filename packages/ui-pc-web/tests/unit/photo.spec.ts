// import { mount } from "@vue/test-utils";
// import MeImg from "~/MeImg/index.vue"; // 引入主要测试的组件

// describe("MeImg", () => {
//   const src = "http://dummyimage.com/100x100/0079cb/fff"; // 图片地址
//   // 测试传参 src
//   test("props src", () => {
//     // 向组件里传参，获取组件实例
//     const wrapper = mount(MeImg, {
//       props: { src }
//     });
//     const viewer = wrapper.find(".me-img"); // 获取 DOM
//     expect(viewer.exists()).toBeTruthy(); // 是否存在
//     const imgEl = viewer.find("img");
//     expect(viewer.exists()).toBeTruthy();
//     expect(imgEl.attributes("src")).toBe(src); // 传入的 src 地址是否在组件里正确
//   });
// });
