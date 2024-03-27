const defaultInputGroupConfig = {
    showLabel: true,
    wrapWithInputGroup: true
}
const menuModel= [
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Templates',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Apollo',
                        icon: 'pi pi-palette'
                    }
                ]
            }
        ]
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope'
    }
]
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
                        __id__: "label",
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
                            tag: "ul",
                            tagIcon: "ul"
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "ol",//必须是英文
                            tag: "ol",
                            tagIcon: "ol"
                        }
                    },
                    {
                        __id__: "html",
                        __config__: {
                            itemName: "li",//必须是英文
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
                    key: "AutoComplete",
                    children: [
                        {
                            __id__: "auto-complete",
                            __config__: {
                                ...defaultInputGroupConfig
                            }
                        }
                    ]
                },
                {
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
                                "optionGroupLabel": "label",
                                "option-group-children": ['children']
                            }
                        }
                    ]
                },
                {
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
                    key: "Editor",
                    children: [
                        {
                            __id__: "editor",
                        }
                    ]
                },
                {
                    key: "FloatLabel",
                    children: [
                        {
                            __id__: "float-label",
                            __slots__: {
                                default: [{
                                    __id__: "input-text",
                                    __native__: {
                                        id: 'tempId'
                                    }
                                }, {
                                    __id__: "label",
                                    __native__: {
                                        for: 'tempId'
                                    },
                                    __slots__: {
                                        default: ["FloatLabel"]
                                    }
                                }]
                            },
                        }
                    ]
                },
                {
                    key: "IconField",
                    children: [
                        {
                            __id__: "icon-field",
                            __slots__: {
                                default: [{
                                    __id__: "input-icon",
                                    __native__: {
                                        class: "pi pi-search"
                                    }
                                }, {
                                    __id__: "input-text"

                                }]
                            },
                        }
                    ]
                },
                {
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
                    key: "InputOtp",
                    children: [
                        {
                            __id__: "input-otp"

                        }
                    ]
                },
                {
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
                    key: "Button",
                    children: [
                        {
                            __id__: "button"
                        }
                    ]
                },
                {
                    key: "SpeedDial",
                    children: [
                        {
                            __id__: "speed-dial"
                        }
                    ]
                },
                {
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
                    key: "DataView",
                    children: [
                        {
                            __id__: "data-view"
                        }
                    ]
                },
                {
                    key: "OrderList",
                    children: [
                        {
                            __id__: "order-list"
                        }
                    ]
                },
                {
                    key: "OrganizationChart",
                    children: [
                        {
                            __id__: "organization-chart",
                            __config__: {
                                name: "OrgChart"
                            }
                        }
                    ]
                },
                {
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
                    key: "PickList",
                    children: [
                        {
                            __id__: "pick-list"
                        }
                    ]
                },
                {
                    key: "Tree",
                    children: [
                        {
                            __id__: "tree"
                        }
                    ]
                },
                {
                    key: "TreeTable",
                    children: [
                        {
                            __id__: "tree-table",
                            __props__: {
                                value: []
                            },
                            __slots__: {
                                default: [{
                                    __id__: "column",
                                    __props__: {
                                        field: 'name',
                                        header: 'Name',
                                        expander: true
                                    }
                                }, {
                                    __id__: "column",
                                    __props__: {
                                        field: 'label',
                                        header: 'Label'
                                    }
                                }]
                            },
                        }
                    ]
                },
                {
                    key: "Timeline",
                    children: [
                        {
                            __id__: "timeline"
                        }
                    ]
                },
                {
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
                    key: "Card",
                    children: [
                        {
                            __id__: "card"
                        }
                    ]
                },
                {
                    key: "Divider",
                    children: [
                        {
                            __id__: "divider"
                        }
                    ]
                },
                {
                    key: "Fieldset",
                    children: [
                        {
                            __id__: "fieldset"
                        }
                    ]
                },
                {
                    key: "Panel",
                    children: [
                        {
                            __id__: "panel"
                        }
                    ]
                },
                {
                    key: "ScrollPanel",
                    children: [
                        {
                            __id__: "scroll-panel",
                            style: {
                                height: "200px",
                                width: "200px"
                            }
                        }
                    ]
                },
                {
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
                                        default: ["Panel2"]
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
                    key: "Stepper",
                    children: [
                        {
                            __id__: "stepper",
                            __props__: {
                                style: {height: '300px'}
                            },
                            __slots__: {
                                default: [{
                                    __id__: "stepper-panel",
                                    __slots__: {
                                        default: ["Panel1"]
                                    }
                                }, {
                                    __id__: "stepper-panel",
                                    __slots__: {
                                        default: ["Panel2"]
                                    }
                                }]
                            },
                            __link__: [
                                {__id__: "stepper-panel",}
                            ]
                        }
                    ]
                },
                {
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
                    key: "Toolbar",
                    children: [
                        {
                            __id__: "toolbar"
                        }
                    ]
                }
            ]
        },
        // {
        //     title: "Overlay",
        //     children: [
        //         {
        //             key: "ConfirmDialog",
        //             children: [
        //                 {
        //                     __id__: "confirm-dialog"
        //                 }
        //             ]
        //         },
        //         {
        //             key: "ConfirmPopup",
        //             children: [
        //                 {
        //                     __id__: "confirm-popup"
        //                 }
        //             ]
        //         },
        //         {
        //             key: "Dialog",
        //             children: [
        //                 {
        //                     __id__: "dialog"
        //                 }
        //             ]
        //         },
        //         {
        //             key: "DynamicDialog",
        //             children: [
        //                 {
        //                     __id__: "dynamic-dialog"
        //                 }
        //             ]
        //         },
        //         {
        //             key: "OverlayPanel",
        //             children: [
        //                 {
        //                     __id__: "overlay-panel"
        //                 }
        //             ]
        //         },
        //         {
        //             key: "Sidebar",
        //             children: [
        //                 {
        //                     __id__: "sidebar"
        //                 }
        //             ]
        //         }
        //     ]
        // },
        {
            title: "File",
            children: [{
                key: "FileUpload",
                children: [
                    {
                        __id__: "file-upload",
                        __props__: {}
                    }
                ]
            }]
        },
        {
            title: "Menu",
            children: [
                {
                    key: "Breadcrumb",
                    children: [
                        {
                            __id__: "breadcrumb",
                            __props__: {
                                model: menuModel,
                                "home": {
                                    "icon": "pi pi-home"
                                }
                            }
                        }
                    ]
                },
                {
                    key: "ContextMenu",
                    children: [
                        {
                            __id__: "context-menu"
                        }
                    ]
                },
                {
                    key: "Dock",
                    children: [
                        {
                            __id__: "dock"
                        }
                    ]
                },
                {
                    key: "Menu",
                    children: [
                        {
                            __id__: "menu",
                            __props__: {
                                model: menuModel
                            }
                        }
                    ]
                },
                {
                    key: "Menubar",
                    children: [
                        {
                            __id__: "menubar",
                            __props__: {
                                model: menuModel
                            }
                        }
                    ]
                },
                {
                    key: "MegaMenu",
                    children: [
                        {
                            __id__: "mega-menu",
                            __props__: {
                                model: [
                                    {
                                        label: 'Furniture',
                                        icon: 'pi pi-box',
                                        items: [
                                            [
                                                {
                                                    label: 'Living Room',
                                                    items: [{ label: 'Accessories' }, { label: 'Armchair' }, { label: 'Coffee Table' }, { label: 'Couch' }, { label: 'TV Stand' }]
                                                }
                                            ],
                                            [
                                                {
                                                    label: 'Kitchen',
                                                    items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }]
                                                },
                                                {
                                                    label: 'Bathroom',
                                                    items: [{ label: 'Accessories' }]
                                                }
                                            ],
                                            [
                                                {
                                                    label: 'Bedroom',
                                                    items: [{ label: 'Bed' }, { label: 'Chaise lounge' }, { label: 'Cupboard' }, { label: 'Dresser' }, { label: 'Wardrobe' }]
                                                }
                                            ],
                                            [
                                                {
                                                    label: 'Office',
                                                    items: [{ label: 'Bookcase' }, { label: 'Cabinet' }, { label: 'Chair' }, { label: 'Desk' }, { label: 'Executive Chair' }]
                                                }
                                            ]
                                        ]
                                    },
                                    {
                                        label: 'Electronics',
                                        icon: 'pi pi-mobile',
                                        items: [
                                            [
                                                {
                                                    label: 'Computer',
                                                    items: [{ label: 'Monitor' }, { label: 'Mouse' }, { label: 'Notebook' }, { label: 'Keyboard' }, { label: 'Printer' }, { label: 'Storage' }]
                                                }
                                            ],
                                            [
                                                {
                                                    label: 'Home Theather',
                                                    items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
                                                }
                                            ],
                                            [
                                                {
                                                    label: 'Gaming',
                                                    items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
                                                }
                                            ],
                                            [
                                                {
                                                    label: 'Appliances',
                                                    items: [{ label: 'Coffee Machine' }, { label: 'Fridge' }, { label: 'Oven' }, { label: 'Vaccum Cleaner' }, { label: 'Washing Machine' }]
                                                }
                                            ]
                                        ]
                                    },
                                    {
                                        label: 'Sports',
                                        icon: 'pi pi-clock',
                                        items: [
                                            [
                                                {
                                                    label: 'Football',
                                                    items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }]
                                                }
                                            ],
                                            [
                                                {
                                                    label: 'Running',
                                                    items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }]
                                                }
                                            ],
                                            [
                                                {
                                                    label: 'Swimming',
                                                    items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }]
                                                }
                                            ],
                                            [
                                                {
                                                    label: 'Tennis',
                                                    items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }]
                                                }
                                            ]
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    key: "PanelMenu",
                    children: [
                        {
                            __id__: "panel-menu",
                            __props__: {
                                model: menuModel
                            }
                        }
                    ]
                },
                {
                    key: "Steps",
                    children: [
                        {
                            __id__: "steps",
                            __props__: {
                                model: menuModel
                            }
                        }
                    ]
                },
                {
                    key: "TabMenu",
                    children: [
                        {
                            __id__: "tab-menu",
                            __props__: {
                                model: menuModel
                            }
                        }
                    ]
                },
                {
                    key: "TieredMenu",
                    children: [
                        {
                            __id__: "tiered-menu",
                            __props__: {
                                model: menuModel
                            }
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
                    key: "Message",
                    children: [
                        {
                            __id__: "message"
                        }
                    ]
                },
                {
                    key: "InlineMessage",
                    children: [
                        {
                            __id__: "inline-message"
                        }
                    ]
                },
                {
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
                    key: "Carousel",
                    children: [
                        {
                            __id__: "carousel"
                        }
                    ]
                },
                {
                    key: "Galleria",
                    children: [
                        {
                            __id__: "galleria"
                        }
                    ]
                },
                {
                    key: "Image",
                    children: [
                        {
                            __id__: "image",
                            __native__:{
                                src:"https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg"
                            }
                        }
                    ]
                }
            ]
        },
        {
            title: "Misc",
            children: [
                {
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
                    key: "Badge",
                    children: [
                        {
                            __id__: "badge"
                        }
                    ]
                },
                {
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
                    key: "Chip",
                    children: [
                        {
                            __id__: "chip",
                            __config__: {
                                wrapWithSpan: true
                            },
                            __props__: {
                                label: "Chip"
                            }
                        }
                    ]
                },
                {
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
                    key: "ScrollTop",
                    children: [
                        {
                            __id__: "scroll-top"
                        }
                    ]
                },
                {
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
                    key: "ProgressBar",
                    children: [
                        {
                            __id__: "progress-bar",
                            __props__: {
                                value: 50
                            }
                        }
                    ]
                },
                {
                    key: "ProgressSpinner",
                    children: [
                        {
                            __id__: "progress-spinner"
                        }
                    ]
                },
                {
                    key: "Tag",
                    children: [
                        {
                            __id__: "tag"
                        }
                    ]
                },
                {
                    key: "Terminal",
                    children: [
                        {
                            __id__: "terminal",
                            __props__: {
                                welcomeMessage: "Welcome to PrimeVue",
                                prompt: "primevue $",
                            }
                        }
                    ]
                }
            ]
        }
    ]

