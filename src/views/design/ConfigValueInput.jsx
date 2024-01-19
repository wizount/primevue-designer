import FixItem from "@/components/FixItem"

//生成配置的InputGroup
export default {
    props: [
        // 'modelValue',
        // 'attrName',
        'attrConfig'
    ],
    setup(props) {
        // function buildVModel() {
        //     return {
        //         modelValue: props.data[props.attrName],
        //         'onUpdate:modelValue'(e) {
        //             props.data[props.attrName] = e
        //         }
        //     }
        // }



        const {tag} = props.attrConfig;
        const renderConfig = {
            __config__: {tag, ...props.attrConfig.config},
            __props__: props.attrConfig.props || {}
        }
        return () => <FixItem conf={renderConfig}></FixItem>

    }


}



