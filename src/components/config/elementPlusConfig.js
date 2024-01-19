const defaultInputGroupConfig = {
    showLabel: true,
    wrapWithInputGroup: true
}
export const primeVueComponents =

    [{
        title: "html组件",
        children: [
            {
                name: "html组件",
                key: "html",
                children: [
                    {
                        __id__: "plainText",
                        __slots__: {
                            default: "plainText"
                        },
                    },
                    {
                        __id__: "div",
                    },
                    {
                        __id__: "flex-div",
                        __props__: {
                            style: {
                                display: "flex"
                            }
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "span",//必须是英文
                            name: "span",
                            tag: "span",
                            tagIcon: "code"
                        },
                        __slots__: {
                            default: ["span"]
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "p",//必须是英文
                            name: "p",
                            tag: "p",
                            tagIcon: "p"
                        },
                        __slots__: {
                            default: ["段落"]
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "h1",//必须是英文
                            name: "h1",
                            tag: "h1",
                            tagIcon: "h1"
                        },
                        __slots__: {
                            default: ["标题h1"]
                        },
                        __link__: ["h2", "h3", "h4", "h5", "h6"].map(h => {
                            return {
                                __id__: "html",
                                __config__: {
                                    itemName: h,//必须是英文
                                    name: h,
                                    tag: h,
                                    tagIcon: h
                                },
                                __slots__: {
                                    default: ["标题" + h]
                                },
                                __link__: []
                            }
                        })
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "ul",//必须是英文
                            name: "无序列表",
                            tag: "ul",
                            tagIcon: "ul"
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "ol",//必须是英文
                            name: "有序列表",
                            tag: "ol",
                            tagIcon: "ol"
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "li",//必须是英文
                            name: "列表项",
                            tag: "li",
                            tagIcon: "menu"
                        },
                        __slots__: {
                            default: ["列表项"]
                        }
                    },
                ]
            }
        ]
    },
        {
            title: "Form",
            children: [
                {
                    name: "AutoComplete",
                    key: "AutoComplete",
                    children: [
                        {
                            __id__: "auto-complete"
                        }
                    ]
                },
                {
                    name: "Calendar",
                    key: "Calendar",
                    children: [
                        {
                            __id__: "calendar",
                            __config__: {
                                ...defaultInputGroupConfig
                            }
                        }
                    ]
                },
                {
                    name: "CascadeSelect",
                    key: "CascadeSelect",
                    children: [
                        {
                            __id__: "cascade-select",
                            __config__: {
                                ...defaultInputGroupConfig
                            },
                            __props__: {
                                "option-label": "label",
                                "option-value": "value",
                                "option-group-children": ['children']
                            }
                        }
                    ]
                },
                {
                    name: "Checkbox",
                    key: "Checkbox",
                    children: [
                        {
                            __id__: "checkbox",
                            __config__: {
                                ...defaultInputGroupConfig
                            },
                            __props__: {
                                value: "checkbox"
                            }
                        }
                    ]
                },
                {
                    name: "Chips",
                    key: "Chips",
                    children: [
                        {
                            __id__: "chips",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "ColorPicker",
                    key: "ColorPicker",
                    children: [
                        {
                            __id__: "color-picker",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "Dropdown",
                    key: "Dropdown",
                    children: [
                        {
                            __id__: "dropdown",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "Editor",
                    key: "Editor",
                    children: [
                        {
                            __id__: "editor",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "InputMask",
                    key: "InputMask",
                    children: [
                        {
                            __id__: "input-mask",
                            __config__: {
                                ...defaultInputGroupConfig
                            },
                            __props__: {
                                mask: "999"
                            }

                        }
                    ]
                },
                {
                    name: "InputNumber",
                    key: "InputNumber",
                    children: [
                        {
                            __id__: "input-number",
                            __config__: {
                                ...defaultInputGroupConfig
                            },
                            __props__: {
                                showButtons: true
                            }

                        }
                    ]
                },
                {
                    name: "InputSwitch",
                    key: "InputSwitch",
                    children: [
                        {
                            __id__: "input-switch",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "InputText",
                    key: "InputText",
                    children: [
                        {
                            __id__: "input-text",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "Knob",
                    key: "Knob",
                    children: [
                        {
                            __id__: "knob",
                            __config__: {
                                defaultValue: 50,
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "Listbox",
                    key: "Listbox",
                    children: [
                        {
                            __id__: "listbox",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "MultiSelect",
                    key: "MultiSelect",
                    children: [
                        {
                            __id__: "multi-select",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "Password",
                    key: "Password",
                    children: [
                        {
                            __id__: "password",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "RadioButton",
                    key: "RadioButton",
                    children: [
                        {
                            __id__: "radio-button",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "Rating",
                    key: "Rating",
                    children: [
                        {
                            __id__: "rating",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "SelectButton",
                    key: "SelectButton",
                    children: [
                        {
                            __id__: "select-button",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "Slider",
                    key: "Slider",
                    children: [
                        {
                            __id__: "slider",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "Textarea",
                    key: "Textarea",
                    children: [
                        {
                            __id__: "textarea",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "ToggleButton",
                    key: "ToggleButton",
                    children: [
                        {
                            __id__: "toggle-button",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "TreeSelect",
                    key: "TreeSelect",
                    children: [
                        {
                            __id__: "tree-select",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                },
                {
                    name: "TriStateCheckbox",
                    key: "TriStateCheckbox",
                    children: [
                        {
                            __id__: "tri-state-checkbox",
                            __config__: {
                                ...defaultInputGroupConfig
                            }

                        }
                    ]
                }
            ]
        },
        {
            title: "Button",
            children: [
                {
                    name: "Button",
                    key: "Button",
                    children: [
                        {
                            __id__: "button"
                        }
                    ]
                },
                {
                    name: "SplitButton",
                    key: "SplitButton",
                    children: [
                        {
                            __id__: "split-button"
                        }
                    ]
                }
            ]
        },
        {
            title: "Data",
            children: [
                {
                    name: "DataTable",
                    key: "DataTable",
                    children: [
                        {
                            __id__: "data-table",
                            __props__: {
                                value: []
                            },
                            __slots__: {
                                default: [{
                                    __id__: "column",
                                    __props__: {
                                        field: 'date',
                                        header: 'Date'
                                    }
                                }, {
                                    __id__: "column",
                                    __props__: {
                                        field: 'address',
                                        header: 'Address'
                                    }
                                }]
                            },
                            __link__: [{
                                __id__: "column",
                            }]
                        }
                    ]
                },
                {
                    name: "DataView",
                    key: "DataView",
                    children: [
                        {
                            __id__: "data-view"
                        }
                    ]
                },
                {
                    name: "OrderList",
                    key: "OrderList",
                    children: [
                        {
                            __id__: "order-list"
                        }
                    ]
                },
                {
                    name: "Paginator",
                    key: "Paginator",
                    children: [
                        {
                            __id__: "paginator",
                            __props__: {
                                totalRecords: 100,
                                rows: 10
                            }
                        }
                    ]
                },
                {
                    name: "PickList",
                    key: "PickList",
                    children: [
                        {
                            __id__: "pick-list"
                        }
                    ]
                },
                {
                    name: "Tree",
                    key: "Tree",
                    children: [
                        {
                            __id__: "tree"
                        }
                    ]
                },
                {
                    name: "TreeTable",
                    key: "TreeTable",
                    children: [
                        {
                            __id__: "tree-table"
                        }
                    ]
                },
                {
                    name: "Timeline",
                    key: "Timeline",
                    children: [
                        {
                            __id__: "timeline"
                        }
                    ]
                },
                {
                    name: "VirtualScroller",
                    key: "VirtualScroller",
                    children: [
                        {
                            __id__: "virtual-scroller"
                        }
                    ]
                }
            ]
        },
        {
            title: "Panel",
            children: [
                {
                    name: "Accordion",
                    key: "Accordion",
                    children: [
                        {
                            __id__: "accordion",
                            __link__: [{
                                __id__: "accordion-tab",
                            }]
                        }
                    ]
                },
                {
                    name: "Card",
                    key: "Card",
                    children: [
                        {
                            __id__: "card"
                        }
                    ]
                },
                {
                    name: "Divider",
                    key: "Divider",
                    children: [
                        {
                            __id__: "divider"
                        }
                    ]
                },
                {
                    name: "Fieldset",
                    key: "Fieldset",
                    children: [
                        {
                            __id__: "fieldset"
                        }
                    ]
                },
                {
                    name: "Panel",
                    key: "Panel",
                    children: [
                        {
                            __id__: "panel"
                        }
                    ]
                },
                {
                    name: "ScrollPanel",
                    key: "ScrollPanel",
                    children: [
                        {
                            __id__: "scroll-panel"
                        }
                    ]
                },
                {
                    name: "Splitter",
                    key: "Splitter",
                    children: [
                        {
                            __id__: "splitter",
                            __props__: {
                                style: {height: '300px'}
                            },
                            __slots__: {
                                default: [{
                                    __id__: "splitter-panel",
                                    __slots__: {
                                        default: ["Panel1"]
                                    }
                                }, {
                                    __id__: "splitter-panel",
                                    __slots__: {
                                        default: ["Panel1"]
                                    }
                                }]
                            },
                            __link__: [
                                {__id__: "splitter-panel",}
                            ]
                        }
                    ]
                },
                {
                    name: "TabView",
                    key: "TabView",
                    children: [
                        {
                            __id__: "tab-view",
                            __slots__: {
                                default: [{
                                    __id__: "tab-panel",
                                    __props__: {
                                        header: 'Header I'
                                    }
                                }, {
                                    __id__: "tab-panel",
                                    __props__: {
                                        header: 'Header II'
                                    }
                                }]
                            },
                            __link__: [
                                {__id__: "tab-panel"}
                            ]
                        }
                    ]
                },
                {
                    name: "Toolbar",
                    key: "Toolbar",
                    children: [
                        {
                            __id__: "toolbar"
                        }
                    ]
                }
            ]
        },
        {
            title: "Overlay",
            children: [
                {
                    name: "ConfirmDialog",
                    key: "ConfirmDialog",
                    children: [
                        {
                            __id__: "confirm-dialog"
                        }
                    ]
                },
                {
                    name: "ConfirmPopup",
                    key: "ConfirmPopup",
                    children: [
                        {
                            __id__: "confirm-popup"
                        }
                    ]
                },
                {
                    name: "Dialog",
                    key: "Dialog",
                    children: [
                        {
                            __id__: "dialog"
                        }
                    ]
                },
                {
                    name: "DynamicDialog",
                    key: "DynamicDialog",
                    children: [
                        {
                            __id__: "dynamic-dialog"
                        }
                    ]
                },
                {
                    name: "OverlayPanel",
                    key: "OverlayPanel",
                    children: [
                        {
                            __id__: "overlay-panel"
                        }
                    ]
                },
                {
                    name: "Sidebar",
                    key: "Sidebar",
                    children: [
                        {
                            __id__: "sidebar"
                        }
                    ]
                },
                {
                    name: "Tooltip",
                    key: "Tooltip",
                    children: [
                        {
                            __id__: "tooltip"
                        }
                    ]
                }
            ]
        },
        {
            title: "File",
            children: []
        },
        {
            title: "Menu",
            children: [
                {
                    name: "Breadcrumb",
                    key: "Breadcrumb",
                    children: [
                        {
                            __id__: "breadcrumb",
                            __props__: {
                                "model": [
                                    {
                                        "label": "item1"
                                    },
                                    {
                                        "label": "item2"
                                    }
                                ],
                                "home": {
                                    "icon": "pi pi-home"
                                }
                            }
                        }
                    ]
                },
                {
                    name: "ContextMenu",
                    key: "ContextMenu",
                    children: [
                        {
                            __id__: "context-menu"
                        }
                    ]
                },
                {
                    name: "Dock",
                    key: "Dock",
                    children: [
                        {
                            __id__: "dock"
                        }
                    ]
                },
                {
                    name: "Menu",
                    key: "Menu",
                    children: [
                        {
                            __id__: "menu"
                        }
                    ]
                },
                {
                    name: "Menubar",
                    key: "Menubar",
                    children: [
                        {
                            __id__: "menubar"
                        }
                    ]
                },
                {
                    name: "MegaMenu",
                    key: "MegaMenu",
                    children: [
                        {
                            __id__: "mega-menu"
                        }
                    ]
                },
                {
                    name: "PanelMenu",
                    key: "PanelMenu",
                    children: [
                        {
                            __id__: "panel-menu"
                        }
                    ]
                },
                {
                    name: "Steps",
                    key: "Steps",
                    children: [
                        {
                            __id__: "steps",
                            __props__: {
                                model: [
                                    {
                                        label: 'Personal Info'
                                    },
                                    {
                                        label: 'Reservation'
                                    },
                                    {
                                        label: 'Review'
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "TabMenu",
                    key: "TabMenu",
                    children: [
                        {
                            __id__: "tab-menu"
                        }
                    ]
                },
                {
                    name: "TieredMenu",
                    key: "TieredMenu",
                    children: [
                        {
                            __id__: "tiered-menu"
                        }
                    ]
                }
            ]
        },
        {
            title: "Chart",
            children: []
        },
        {
            title: "Messages",
            children: [
                {
                    name: "Message",
                    key: "Message",
                    children: [
                        {
                            __id__: "message"
                        }
                    ]
                },
                {
                    name: "InlineMessage",
                    key: "InlineMessage",
                    children: [
                        {
                            __id__: "inline-message"
                        }
                    ]
                },
                {
                    name: "Toast",
                    key: "Toast",
                    children: [
                        {
                            __id__: "toast"
                        }
                    ]
                }
            ]
        },
        {
            title: "Media",
            children: [
                {
                    name: "Carousel",
                    key: "Carousel",
                    children: [
                        {
                            __id__: "carousel"
                        }
                    ]
                },
                {
                    name: "Galleria",
                    key: "Galleria",
                    children: [
                        {
                            __id__: "galleria"
                        }
                    ]
                },
                {
                    name: "Image",
                    key: "Image",
                    children: [
                        {
                            __id__: "image"
                        }
                    ]
                }
            ]
        },
        {
            title: "Misc",
            children: [
                {
                    name: "Avatar",
                    key: "Avatar",
                    children: [
                        {
                            __id__: "avatar",
                            __config__: {
                                wrapWithSpan: true
                            }
                        }
                    ]
                },
                {
                    name: "Badge",
                    key: "Badge",
                    children: [
                        {
                            __id__: "badge"
                        }
                    ]
                },
                {
                    name: "BlockUI",
                    key: "BlockUI",
                    children: [
                        {
                            __id__: "block-u-i",
                            __slots__: {
                                default: ["blockUI"]
                            }
                        }
                    ]
                },
                {
                    name: "Chip",
                    key: "Chip",
                    children: [
                        {
                            __id__: "chip",
                            __props__: {
                                label: "Chip"
                            }
                        }
                    ]
                },
                {
                    name: "Inplace",
                    key: "Inplace",
                    children: [
                        {
                            __id__: "inplace",
                            __slots__: {
                                display: ["View Content"],
                                content: ["Content for Inplace"]
                            }
                        }
                    ]
                },
                {
                    name: "ScrollTop",
                    key: "ScrollTop",
                    children: [
                        {
                            __id__: "scroll-top"
                        }
                    ]
                },
                {
                    name: "Skeleton",
                    key: "Skeleton",
                    children: [
                        {
                            __id__: "skeleton",
                            __config__: {
                                wrapWithSpan: true
                            }
                        }
                    ]
                },
                {
                    name: "ProgressBar",
                    key: "ProgressBar",
                    children: [
                        {
                            __id__: "progress-bar"
                        }
                    ]
                },
                {
                    name: "ProgressSpinner",
                    key: "ProgressSpinner",
                    children: [
                        {
                            __id__: "progress-spinner"
                        }
                    ]
                },
                {
                    name: "Ripple",
                    key: "Ripple",
                    children: [
                        {
                            __id__: "ripple"
                        }
                    ]
                },
                {
                    name: "StyleClass",
                    key: "StyleClass",
                    children: [
                        {
                            __id__: "style-class"
                        }
                    ]
                },
                {
                    name: "Tag",
                    key: "Tag",
                    children: [
                        {
                            __id__: "tag"
                        }
                    ]
                },
                {
                    name: "Terminal",
                    key: "Terminal",
                    children: [
                        {
                            __id__: "terminal",
                            __props__: {
                                welcomeMessage: "Welcome to PrimeVue",
                                prompt: "primevue $",
                                "aria-label": "PrimeVue Terminal Service",
                                pt: {
                                    root: '',
                                    prompt: '',
                                    command: '',
                                    response: ''
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]

