import { defineComponent, openBlock, createElementBlock } from 'vue';

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

var script = defineComponent({
    name: 'Button',
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("button", null, "33"))
}

script.render = render;
script.__file = "packages/components/Button/src/Button.vue";

const VoButton = withInstall(script);

export default VoButton;
export { VoButton };
