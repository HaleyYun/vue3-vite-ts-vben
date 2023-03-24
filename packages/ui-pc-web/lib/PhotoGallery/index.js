import { defineComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, ref, reactive, watch, unref, withModifiers, Fragment, renderList, toDisplayString, withDirectives, vModelText, vShow, createBlock, isRef, createCommentVNode } from 'vue';

// import { NOOP } from '@vue/shared'
const withInstall = (main, extra) => {
    main.install = (app) => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp);
        }
    };
    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            main[key] = comp;
        }
    }
    return main;
};
// export const withNoopInstall = <T>(component: T) => {
//   ;(component as SFCWithInstall<T>).install = NOOP
//
//   return component as SFCWithInstall<T>
// }

const _hoisted_1 = { class: "picker-item" };
const _hoisted_2 = /*#__PURE__*/ createElementVNode("img", {
    src: "https://qn.antdv.com/vue.png",
    class: "block-img"
}, null, -1 /* HOISTED */);
const _hoisted_3 = /*#__PURE__*/ createElementVNode("div", { class: "picker-item__text" }, "红色旅游等等", -1 /* HOISTED */);
var script = /*#__PURE__*/ defineComponent({
    props: {
        /**
         * 是否选中
         */
        isCheckEd: {
            type: Boolean,
            default: false,
        },
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1, [
                createElementVNode("div", {
                    class: normalizeClass(["picker-item__block", { 'active-item': __props.isCheckEd }])
                }, [
                    createElementVNode("span", {
                        class: normalizeClass(["block-checkbox", { selected: __props.isCheckEd }])
                    }, null, 2 /* CLASS */),
                    _hoisted_2
                ], 2 /* CLASS */),
                _hoisted_3
            ]));
        };
    }
});

script.__file = "packages/components/PhotoGallery/src/widget/photoPickerItem.vue";

// Interface data format used to return a unified format
function resultSuccess(result, { message = 'ok' } = {}) {
    return {
        code: 0,
        result,
        message,
        type: 'success',
    };
}

const directoryMenu = [
    { name: '我的分组', label: 1, count: 100, id: 1 },
    { name: '小分组1', label: 2, count: 50, id: 2 },
    { name: '小分组2', label: 2, count: 50, id: 3 },
];
const imgMockList = [
    [],
    [
        {
            url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
            id: 1,
        },
        {
            url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
            id: 2,
        },
    ],
    [
        {
            url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
            id: 3,
        },
    ],
    [
        {
            url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
            id: 4,
        },
        {
            url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
            id: 5,
        },
        {
            url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
            id: 6,
        },
    ],
];
//获取目录列表
const getDirectoryMenu = () => {
    return new Promise((resolve, reject) => {
        resolve(resultSuccess({
            data: directoryMenu,
        }));
    });
};
//获取图片列表
const getMockImgList = (id) => {
    return new Promise((resolve, reject) => {
        resolve(resultSuccess({
            data: imgMockList[id],
            count: imgMockList[id].length,
        }));
    });
};
//添加分组
const addMockDirectoryMenu = (name) => {
    return new Promise((resolve) => {
        directoryMenu.push({
            name,
            label: 2,
            count: 20,
            id: directoryMenu[directoryMenu.length - 1].id + 1,
        });
        resolve('');
    });
};

const _hoisted_1$1 = ["onClick"];
const _hoisted_2$1 = /*#__PURE__*/ createElementVNode("div", null, "选择图片", -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/ createElementVNode("path", {
    d: "M1003.008 902.656L612.352 512l390.656-390.656c27.648-27.648 27.648-72.704 0-100.352-27.648-27.648-72.704-27.648-100.352 0L512 411.648 121.344 20.992c-27.648-27.648-72.704-27.648-100.352 0-27.648 27.648-27.648 72.704 0 100.352L411.648 512 20.992 902.656c-13.312 13.312-20.992 31.232-20.992 50.176 0 18.944 7.168 36.864 20.992 50.176 13.312 13.312 31.232 20.992 50.176 20.992 18.944 0 36.864-7.168 50.176-20.992l390.656-390.656 390.656 390.656c13.312 13.312 31.232 20.992 50.176 20.992 18.944 0 36.864-7.168 50.176-20.992 13.312-13.312 20.992-31.232 20.992-50.176 0-18.944-7.168-36.864-20.992-50.176z",
    "p-id": "2201",
    fill: "#7e8081"
}, null, -1 /* HOISTED */);
const _hoisted_4 = [
    _hoisted_3$1
];
const _hoisted_5 = { class: "body" };
const _hoisted_6 = { class: "body-directory" };
const _hoisted_7 = { class: "body-directory__list" };
const _hoisted_8 = ["onClick"];
const _hoisted_9 = { class: "body-directory__add" };
const _hoisted_10 = ["onClick"];
const _hoisted_11 = /*#__PURE__*/ createElementVNode("span", { class: "add-alert__span" }, "创建分组", -1 /* HOISTED */);
const _hoisted_12 = { class: "add-group group" };
const _hoisted_13 = ["onClick"];
const _hoisted_14 = { class: "body-list" };
const _hoisted_15 = { class: "body-list__header" };
const _hoisted_16 = /*#__PURE__*/ createElementVNode("span", null, " 大小不超过10M ", -1 /* HOISTED */);
const _hoisted_17 = { class: "body-list__header-btn" };
const _hoisted_18 = { for: "file-id" };
const _hoisted_19 = /*#__PURE__*/ createElementVNode("span", { class: "span-btn" }, "上传文件", -1 /* HOISTED */);
const _hoisted_20 = { class: "body-list__content" };
const _hoisted_21 = { class: "footer" };
const _hoisted_22 = /*#__PURE__*/ createElementVNode("svg", {
    t: "1646027141410",
    class: "icon footer-icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "6976",
    width: "24",
    height: "24"
}, [
    /*#__PURE__*/ createElementVNode("path", {
        d: "M616.401455 720.756364L418.909091 523.310545 616.401455 325.818182l32.907636 32.907636-164.584727 164.584727 164.584727 164.538182z",
        "p-id": "6977",
        fill: "#8a8a8a"
    })
], -1 /* HOISTED */);
const _hoisted_23 = { class: "footer-page" };
const _hoisted_24 = /*#__PURE__*/ createElementVNode("span", { class: "footer-page__division" }, "/", -1 /* HOISTED */);
const _hoisted_25 = /*#__PURE__*/ createElementVNode("svg", {
    t: "1646027220715",
    class: "icon footer-icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "8128",
    width: "24",
    height: "24"
}, [
    /*#__PURE__*/ createElementVNode("path", {
        d: "M407.59854499 303.243636L605.090909 500.689455 407.598545 698.18181801l-32.907636-32.90763601 164.584727-164.584727-164.584727-164.538182z",
        "p-id": "8129",
        fill: "#8a8a8a"
    })
], -1 /* HOISTED */);
const _hoisted_26 = /*#__PURE__*/ createElementVNode("span", { class: "footer-btn" }, "跳转", -1 /* HOISTED */);
const _hoisted_27 = { class: "group" };
const _hoisted_28 = { class: "group-check" };
const _hoisted_29 = /*#__PURE__*/ createElementVNode("span", null, "已选择", -1 /* HOISTED */);
const _hoisted_30 = { class: "group-check__text" };
const __default__ = defineComponent({
    name: 'PhotoGallery',
});
var script$1 = /*#__PURE__*/ defineComponent({
    ...__default__,
    props: {
        /**
         * 遮罩是否可以点击
         */
        mask: {
            type: Boolean,
            default: true,
        },
        /**
         * 最多选择项
         */
        maxCount: {
            type: Number,
            default: 9,
        },
    },
    emits: ["returnPhoto"],
    setup(__props, { expose, emit }) {
        const props = __props;
        //引入选择信息组件
        // 组件的变量 是否打开
        let photoShow = ref(false);
        const maskFn = () => {
            props.mask && (photoShow.value = false);
        };
        // 目录数组
        let directoryMenu = reactive([]);
        // 选择的图片数组
        let selectImgList = reactive([]);
        //选择某个图片
        const selectPhotoPicker = (item) => {
            const index = searchIndexSelectPhoto(item);
            if (index >= 0) {
                selectImgList.splice(index, 1);
            }
            else {
                if (selectImgList.length >= props.maxCount) {
                    alert(`最多选择${props.maxCount}个`);
                    return;
                }
                selectImgList.push(item);
            }
        };
        // 在选中的图片里面找到存在的下标
        const searchIndexSelectPhoto = (item) => {
            let boo = -1;
            for (let i = 0; i < selectImgList.length; i++) {
                if (selectImgList[i].id == item.id) {
                    boo = i;
                }
            }
            return boo;
        };
        /**
         *  @description 获取左边目录
         */
        const getDirectaryMenuFn = () => {
            directorySelect.value = 0;
            getDirectoryMenu().then((res) => {
                directoryMenu.length = 0;
                res.result.data.forEach((item) => {
                    directoryMenu.push(item);
                });
            });
        };
        /**
         *  @description 获取图片列表
         */
        const getImgListFn = () => {
            photoList.length = 0;
            getMockImgList(directoryMenu[directorySelect.value].id).then((res) => {
                photoListCount.value = res.result.count;
                res.result.data.forEach((item) => {
                    photoList.push(item);
                });
            });
        };
        //选中目录的下标
        let directorySelect = ref(0);
        // 图片列表信息
        let photoList = reactive([]);
        // 图片总数
        let photoListCount = ref(0);
        //第几页
        let photoListPage = ref(1);
        //要去的页数
        let photoListTopage = ref(1);
        /**
         * @description 选中目录
         */
        const changeDirectory = (index) => {
            directorySelect.value = index;
        };
        //监听选中值
        watch(directorySelect, (newVal) => {
            getImgListFn();
        });
        const uploadImg = (inputUploadRef) => {
            console.log(inputUploadRef.target.files, 'sss');
        };
        const addGroupBoo = ref(false);
        /**
         * @description 新增分组弹窗
         */
        const addGroup = () => {
            addGroupBoo.value = !addGroupBoo.value;
        };
        //添加分组名称
        const groupName = ref('');
        // 添加分组
        const addGroupFn = async () => {
            if (groupName.value.length <= 0) {
                alert('请输入分组名称');
                return;
            }
            if (groupName.value.length > 6) {
                alert('分组名称最多不能超过6个字');
                return;
            }
            addGroupBoo.value = false;
            await addMockDirectoryMenu(groupName.value);
            await getDirectaryMenuFn();
        };
        /**
         * @description 选择的图片列表
         */
        const surePhoto = () => {
            if (selectImgList.length <= 0)
                return;
            photoShow.value = false;
            emit('returnPhoto', selectImgList);
        };
        /**
         *  @description 打开当前组件
         */
        const openPhoto = async () => {
            await getDirectaryMenuFn();
            await getImgListFn();
            groupName.value = '';
            selectImgList.length = 0;
            photoShow.value = true;
        };
        /**
         *  @description 关闭当前组件
         */
        const closePhoto = () => {
            photoShow.value = false;
        };
        // 重点！！这里需要使用defineExpose暴露出去
        expose({
            openPhoto,
            closePhoto,
        });
        return (_ctx, _cache) => {
            return (unref(photoShow))
                ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "vocen-desktop-dialog",
                    onClick: withModifiers(maskFn, ["stop"])
                }, [
                    createElementVNode("div", {
                        class: "vocen-desktop-dialog__content",
                        onClick: _cache[4] || (_cache[4] = withModifiers(($event) => (addGroupBoo.value = false), ["stop"]))
                    }, [
                        createElementVNode("div", { class: "header" }, [
                            _hoisted_2$1,
                            createElementVNode("svg", {
                                onClick: closePhoto,
                                t: "1646014081269",
                                class: "icon",
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg",
                                "p-id": "2200",
                                width: "18",
                                height: "18"
                            }, _hoisted_4)
                        ]),
                        createElementVNode("div", _hoisted_5, [
                            createElementVNode("div", _hoisted_6, [
                                createElementVNode("div", _hoisted_7, [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(directoryMenu), (item, index) => {
                                        return (openBlock(), createElementBlock("div", {
                                            class: normalizeClass(["item", {
                                                    'item-children': item.label > 1,
                                                    'item-active': unref(directorySelect) == index,
                                                }]),
                                            onClick: ($event) => (changeDirectory(index)),
                                            key: index
                                        }, toDisplayString(item.name) + "(" + toDisplayString(item.count) + ") ", 11 /* TEXT, CLASS, PROPS */, _hoisted_8));
                                    }), 128 /* KEYED_FRAGMENT */))
                                ]),
                                createElementVNode("div", _hoisted_9, [
                                    createElementVNode("span", {
                                        class: "body-directory__add-btn",
                                        onClick: withModifiers(addGroup, ["stop"])
                                    }, "新建分组", 8 /* PROPS */, _hoisted_10),
                                    withDirectives(createElementVNode("div", {
                                        class: "add-alert",
                                        onClick: _cache[2] || (_cache[2] = withModifiers(() => { }, ["stop"]))
                                    }, [
                                        createElementVNode("div", null, [
                                            _hoisted_11,
                                            withDirectives(createElementVNode("input", {
                                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ((groupName).value = $event)),
                                                type: "text",
                                                class: "add-alert__input",
                                                placeholder: "分组名为1-6个字符"
                                            }, null, 512 /* NEED_PATCH */), [
                                                [vModelText, groupName.value]
                                            ])
                                        ]),
                                        createElementVNode("div", _hoisted_12, [
                                            createElementVNode("div", {
                                                class: normalizeClass(["group-sure", { disable: groupName.value.length <= 0 || groupName.value.length > 6 }]),
                                                onClick: withModifiers(addGroupFn, ["stop"])
                                            }, "确定", 10 /* CLASS, PROPS */, _hoisted_13),
                                            createElementVNode("div", {
                                                class: "group-cancel",
                                                onClick: _cache[1] || (_cache[1] = withModifiers(($event) => { (addGroupBoo.value = false), (groupName.value = ''); }, ["stop"]))
                                            }, "取消")
                                        ])
                                    ], 512 /* NEED_PATCH */), [
                                        [vShow, addGroupBoo.value]
                                    ])
                                ])
                            ]),
                            createElementVNode("div", _hoisted_14, [
                                createElementVNode("div", _hoisted_15, [
                                    _hoisted_16,
                                    createElementVNode("span", _hoisted_17, [
                                        createElementVNode("label", _hoisted_18, [
                                            _hoisted_19,
                                            createElementVNode("input", {
                                                type: "file",
                                                title: "",
                                                onChange: uploadImg,
                                                id: "file-id",
                                                class: "file-input",
                                                multiple: "",
                                                accept: "image/png,image/jpeg,image/gif,image/jpg"
                                            }, null, 32 /* HYDRATE_EVENTS */)
                                        ])
                                    ])
                                ]),
                                createElementVNode("div", _hoisted_20, [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(photoList), (item, index) => {
                                        return (openBlock(), createBlock(script, {
                                            onClick: ($event) => (selectPhotoPicker(item)),
                                            isCheckEd: searchIndexSelectPhoto(item) >= 0,
                                            key: index
                                        }, null, 8 /* PROPS */, ["onClick", "isCheckEd"]));
                                    }), 128 /* KEYED_FRAGMENT */))
                                ]),
                                createElementVNode("div", _hoisted_21, [
                                    _hoisted_22,
                                    createElementVNode("span", _hoisted_23, [
                                        createElementVNode("span", null, toDisplayString(unref(photoListPage)), 1 /* TEXT */),
                                        _hoisted_24,
                                        createElementVNode("span", null, toDisplayString(Math.ceil(unref(photoListCount) / 18)), 1 /* TEXT */)
                                    ]),
                                    _hoisted_25,
                                    withDirectives(createElementVNode("input", {
                                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => (isRef(photoListTopage) ? (photoListTopage).value = $event : photoListTopage = $event)),
                                        type: "number",
                                        class: "page-number",
                                        "οnkeyup": "if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\\D/g,'')}",
                                        onafterpaste: "if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\\D/g,'')}"
                                    }, null, 512 /* NEED_PATCH */), [
                                        [vModelText, unref(photoListTopage)]
                                    ]),
                                    _hoisted_26
                                ])
                            ])
                        ]),
                        createElementVNode("div", _hoisted_27, [
                            createElementVNode("div", {
                                class: normalizeClass(["group-sure", { disable: unref(selectImgList).length <= 0 }]),
                                onClick: surePhoto
                            }, "确定", 2 /* CLASS */),
                            createElementVNode("div", {
                                class: "group-cancel",
                                onClick: closePhoto
                            }, "取消"),
                            createElementVNode("div", _hoisted_28, [
                                _hoisted_29,
                                createElementVNode("span", _hoisted_30, toDisplayString(unref(selectImgList).length) + " / " + toDisplayString(__props.maxCount) + " 项", 1 /* TEXT */)
                            ])
                        ])
                    ])
                ], 8 /* PROPS */, _hoisted_1$1))
                : createCommentVNode("v-if", true);
        };
    }
});

script$1.__file = "packages/components/PhotoGallery/src/PhotoGallery.vue";

const VoPhotoGallery = withInstall(script$1);

export default VoPhotoGallery;
export { VoPhotoGallery };
