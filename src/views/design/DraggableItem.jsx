import FixItem from "@/components/FixItem"
import PInputGroup from "primevue/inputgroup";
import PInputGroupAddon from "primevue/inputgroupaddon";
import Draggable from '@/vuedraggable/vuedraggable';
import {deepClone, titleCase} from "@/utils";
import {h, resolveComponent} from "vue";
import '@/styles/draggalbeItem.scss'
import {AutoCompleteCallback} from "@/utils/primevue-utils";

let eventTime = Date.now();

export default {
    props: [
        'currentItem',
        'activeId',
        'designConf',
        'onActiveItem',
        'onChange',
        'itemMove',
        'formModelsAndRules',
        'dynamicData'
    ],
    setup(props) {
        function buildEvent(curItem) {
            const onClick = (event) => {
                //fixme 再针对menu写一些代码  {//阻止事件向上传递（因无法选中el-menu-item而更改）
                if (Date.now() - eventTime > 50) {
                    props.onActiveItem(curItem)
                }
                if (curItem.__id__ === 'menu-item') {
                    eventTime = Date.now();
                }
                if (event instanceof PointerEvent) {
                    event.stopPropagation()
                }
            }

            return {onClick}
        }

        function buildProps(curItem, {isBuildClass, isBuildEvent, isBuildModel}) {
            const newProps = {};
            Object.assign(newProps, curItem.__native__);
            Object.assign(newProps, curItem.__props__);
            if(curItem.__id__==="auto-complete"){
                const ac =new AutoCompleteCallback(["a","abc","abc32ea"]);
                newProps["suggestions"]=ac.items;

                newProps["onComplete"]=ac.querySearch;
            }
            //对style进行复制
            if(newProps.style){
                newProps.style=deepClone(newProps.style);
            }
            if (isBuildClass) {
                Object.assign(newProps, buildClass(curItem, newProps.class))
            }
            if (isBuildEvent) {
                Object.assign(newProps, buildEvent(curItem))
            }
            if (isBuildModel && curItem.__vModel__) {
                Object.assign(newProps, buildVModel(curItem));
            }
            return newProps;
        }


        function buildClass(curItem, oldClass) {
            const {drawItemId} = curItem.__config__
            let clazz = props.activeId === drawItemId ? 'drawing-ele selected-draw-ele' : 'drawing-ele';
            if (props.designConf.unFocusedComponentBorder && props.activeId !== drawItemId) clazz += ' unselected-draw-ele'
            if (oldClass) {
                if (Array.isArray(oldClass)) {
                    clazz += " " + oldClass.join(" ")
                } else {
                    clazz += " " + oldClass
                }
            }
            if (clazz) {
                return {class: clazz};
            } else {
                return {};
            }

        }

        function buildVModel(curItem) {
            if (curItem.__vModel__) {
                return {
                    modelValue: curItem.__config__.defaultValue,
                    'onUpdate:modelValue'(e) {
                        curItem.__config__.defaultValue = e
                    }
                }
            } else {
                return {}
            }
        }

        function inputGroup(curItem, layout) {
            //使用函数，才能响应式

            let Input;
            if (layout === 'rawItem') {
                Input = rawItem(curItem, true)

            } else if (layout === 'fixedItem') {
                Input = fixedItem(curItem, true);
            } else {
                Input = "error layout!";
            }

            let {label,showLabel} = curItem.__config__
            const InputGroup =
                <PInputGroup {...buildClass(curItem)}>
                    {
                        showLabel? <PInputGroupAddon>{label}</PInputGroupAddon>:null
                    }

                    <Input/>
                </PInputGroup>
            return <InputGroup {...buildEvent(curItem)}/>


        }

        function containerItem(curItem) {
            let containerProps = (curItem) => {
                const props_ = buildProps(curItem, {isBuildClass: true, isBuildModel: true})
                if (curItem.__slots__.default.length === 0) {
                    if (!props_.style.minHeight && !props_.style['min-height']) {
                        props_.style['min-height'] = '60px';
                        props_.style['min-width'] = '120px';
                    }
                }
                return props_;
            }
            let model = undefined
            let rules = undefined
            if (props.formModelsAndRules && curItem.__config__.tag === 'p-form') {
                model = props.formModelsAndRules[curItem.__props__.model];
                rules = props.formModelsAndRules[curItem.__props__.rules];
            }
            const thisSlots = buildSlots(curItem, true);
            let DraggableChildren = <Draggable tag={curItem.__config__.tag}
                                               componentData={{
                                                   ...containerProps(curItem),
                                                   model,
                                                   rules
                                               }}
                                               componentSlots={thisSlots}
                                               list={curItem.__slots__.default} group="componentsGroup"
                                               itemKey="renderKey"
                                               onChange={props.onChange}
                                               move={props.itemMove}
                                               animation={340}>
                {{
                    item: ({element}) => h(doLayout(element)),
                }}
            </Draggable>
            return <DraggableChildren {...buildEvent(curItem)}/>

        }

        function buildSlots(curItem, noDefault) {
            let thisSlots = {}
            for (const key in curItem.__slots__) {
                if (noDefault && key === 'default') {
                    continue;
                }
                if (typeof curItem.__slots__[key] === 'string') {
                    thisSlots[key] = () => curItem.__slots__[key];
                    continue;
                }
                if (curItem.__slots__[key].length === 0) {
                    continue;
                }
                if (curItem.__config__.layout === 'rawItem') {
                    thisSlots[key] = () => curItem.__slots__[key].map(element => doLayout(element));
                } else {
                    thisSlots[key] = () =>
                        <Draggable tag="span"
                                   list={curItem.__slots__[key]} group="componentsGroup"
                                   itemKey="renderKey"
                        >
                            {{
                                item: ({element}) => h(doLayout(element)),
                            }}
                        </Draggable>
                }

            }
            return thisSlots;
        }


        function buildData(curItem) {
            const data = curItem.__data__;

            let dataProps = {}
            if (data) {
                const {name, source, inProps} = data;
                if (source === 'static') {
                    dataProps[name] = data.static[name];
                } else {
                    const key = curItem.__refs__[name];
                    if (data.dynamic.dataKey) {
                        dataProps[name] = props.dynamicData[key] && props.dynamicData[key][data.dynamic.dataKey] || [];//[]硬编码
                    } else {
                        dataProps[name] = props.dynamicData[key] || [];//[]硬编码
                    }
                }
                if (inProps) {
                    return dataProps;
                } else {
                    return {__data__: dataProps};
                }
            } else {
                return {}
            }


        }

        function fixedItem(curItem, simple) {
            const {wrapWithSpan} = curItem.__config__;
            let config = {...curItem, ...buildData(curItem)};


            if (simple) {
                return <FixItem conf={config} {...buildVModel(curItem)}></FixItem>
            } else {
                if (wrapWithSpan) {
                    const source = <FixItem conf={config}  {...buildVModel(curItem)}></FixItem>
                    return doWrapWithSpan(curItem, source);
                } else {
                    return <FixItem
                        conf={config} {...buildClass(curItem,curItem.__native__.class)} {...buildVModel(curItem)} {...buildEvent(curItem)}></FixItem>
                }


            }


        }
        /**
         *
         * @param curItem
         * @param simple true:不生成class和event
         * @return {VNode}
         */
        function rawItem(curItem, simple) {
            const {tag, wrapWithSpan} = curItem.__config__;
            const data = buildData(curItem);
            if (simple) {
                return h(resolveComponent(tag), {...buildProps(curItem, { isBuildModel: true, isBuildEvent: true}), ...data},
                    buildSlots(curItem));
            } else {
                if (wrapWithSpan) {
                    const source = h(resolveComponent(tag), {...buildProps(curItem, { isBuildModel: true, isBuildEvent: true}) ,...data}, buildSlots(curItem));
                    return doWrapWithSpan(curItem, source);
                } else {

                  console.log(data,curItem.__config__.tag,{...buildProps(curItem, {isBuildClass: true, isBuildModel: true, isBuildEvent: true}), ...data})
                    return h(resolveComponent(tag),
                        {...buildProps(curItem, {isBuildClass: true, isBuildModel: true, isBuildEvent: true}), ...data},
                        buildSlots(curItem));
                }

            }

        }

        function doWrapWithSpan(curItem, source) {
            const {drawItemId} = curItem.__config__
            let clazz = props.activeId === drawItemId ? 'selected-raw-ele' : props.designConf.unFocusedComponentBorder && props.activeId !== drawItemId ? 'raw-ele' : '';
            return h("span", {class: clazz, ...buildEvent(curItem)}, source);
        }

        function doLayout(curItem) {
            if (typeof curItem === "string") {
                return h("span", curItem);
            }
            const {layout, wrapWithInputGroup} = curItem.__config__;
            if (wrapWithInputGroup) {
                return inputGroup(curItem, layout);
            } else if (layout === 'containerItem') {
                return containerItem(curItem);
            } else if (layout === 'rawItem') {
                return rawItem(curItem);
            } else if (layout === 'fixedItem') {
                return fixedItem(curItem);
            }
        }

        return () => doLayout(props.currentItem);

    }


}

