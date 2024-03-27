import {createApp} from 'vue'
import App from './App.vue'
import router from './router'



import '@/styles/index.scss'

const app = createApp(App)

app.use(router)

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'

app.component('svg-icon', SvgIcon)

//region primevue

import AutoComplete from 'primevue/autocomplete'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Badge from 'primevue/badge'
import BlockUI from 'primevue/blockui'
import Button from 'primevue/button'
import Breadcrumb from 'primevue/breadcrumb'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import CascadeSelect from 'primevue/cascadeselect'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Chips from 'primevue/chips'
import ColorPicker from 'primevue/colorpicker'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import DynamicDialog from 'primevue/dynamicdialog'
import ContextMenu from 'primevue/contextmenu'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import DeferredContent from 'primevue/deferredcontent'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import Dock from 'primevue/dock'
import Editor from 'primevue/editor'
import FloatLabel from 'primevue/floatlabel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import Image from 'primevue/image'
import InlineMessage from 'primevue/inlinemessage'
import Inplace from 'primevue/inplace'
import MeterGroup from 'primevue/metergroup'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import InputOtp from 'primevue/inputotp'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Knob from 'primevue/knob'
import Galleria from 'primevue/galleria'
import Listbox from 'primevue/listbox'
import MegaMenu from 'primevue/megamenu'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import OrderList from 'primevue/orderlist'
import OrganizationChart from 'primevue/organizationchart'
import OverlayPanel from 'primevue/overlaypanel'
import Paginator from 'primevue/paginator'
import Panel from 'primevue/panel'
import PanelMenu from 'primevue/panelmenu'
import Password from 'primevue/password'
import PickList from 'primevue/picklist'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import Rating from 'primevue/rating'
import RadioButton from 'primevue/radiobutton'
import SelectButton from 'primevue/selectbutton'
import ScrollPanel from 'primevue/scrollpanel'
import ScrollTop from 'primevue/scrolltop'
import Slider from 'primevue/slider'
import Sidebar from 'primevue/sidebar'
import Skeleton from 'primevue/skeleton'
import SplitButton from 'primevue/splitbutton'
import SpeedDial from 'primevue/speeddial'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Stepper from 'primevue/stepper'
import StepperPanel from 'primevue/stepperpanel'
import Steps from 'primevue/steps'
import TabMenu from 'primevue/tabmenu'
import Tag from 'primevue/tag'
import TieredMenu from 'primevue/tieredmenu'
import Textarea from 'primevue/textarea'
import Timeline from 'primevue/timeline'
import Toast from 'primevue/toast'
import Toolbar from 'primevue/toolbar'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import ToggleButton from 'primevue/togglebutton'
import Tree from 'primevue/tree'
import TreeSelect from 'primevue/treeselect'
import TreeTable from 'primevue/treetable'
import TriStateCheckbox from 'primevue/tristatecheckbox'
import VirtualScroller from 'primevue/virtualscroller'
import Terminal from 'primevue/terminal'

//import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config'

 import 'primevue/resources/themes/lara-light-green/theme.css'

// directives
//import BadgeDirective from 'primevue/badgedirective'
// import StyleClass from 'primevue/styleclass'
import Tooltip from 'primevue/tooltip'
// import FocusTrap from 'primevue/focustrap'

// services
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'


//   app.directive('badge', BadgeDirective)

app.directive('tooltip', Tooltip)
app.directive('PTooltip', Tooltip)
//  app.directive('styleclass', StyleClass)
//  app.directive('focustrap', FocusTrap)

// components
app.component('PAccordion', Accordion)
app.component('PAccordionTab', AccordionTab)
app.component('PAutoComplete', AutoComplete)
app.component('PAvatar', Avatar)
app.component('PAvatarGroup', AvatarGroup)
app.component('PBadge', Badge)
app.component('PBlockUI', BlockUI)
app.component('PBreadcrumb', Breadcrumb)
app.component('PButton', Button)
app.component('PCalendar', Calendar)
app.component('PCard', Card)
app.component('PCarousel', Carousel)
app.component('PCascadeSelect', CascadeSelect)
app.component('PChart', Chart)
app.component('PCheckbox', Checkbox)
app.component('PChip', Chip)
app.component('PChips', Chips)
app.component('PColorPicker', ColorPicker)
app.component('PColumn', Column)
app.component('PColumnGroup', ColumnGroup)
//不能使用PConfirmDialog，会导致 ConfirmDialog出现2次
app.component('ConfirmDialog', ConfirmDialog)
app.component('PDynamicDialog', DynamicDialog)

app.component('PConfirmPopup', ConfirmPopup)
app.component('PContextMenu', ContextMenu)
app.component('PDataTable', DataTable)
app.component('PDataView', DataView)
app.component('PDataViewLayoutOptions', DataViewLayoutOptions)
app.component('PDeferredContent', DeferredContent)
app.component('PDialog', Dialog)
app.component('PDivider', Divider)
app.component('PDropdown', Dropdown)
app.component('PDock', Dock)
app.component('PEditor', Editor)
app.component('PFloatLabel', FloatLabel)
app.component('PIconField', IconField)
app.component('PInputIcon', InputIcon)
app.component('PFieldset', Fieldset)
app.component('PFileUpload', FileUpload)
app.component('PImage', Image)
app.component('PInlineMessage', InlineMessage)
app.component('PInplace', Inplace)
app.component('PMeterGroup', MeterGroup)
app.component('PInputMask', InputMask)
app.component('PInputNumber', InputNumber)
app.component('PInputOtp', InputOtp)
app.component('PInputSwitch', InputSwitch)
app.component('PInputText', InputText)
app.component('PInputGroup', InputGroup)
app.component('PInputGroupAddon', InputGroupAddon)
app.component('PGalleria', Galleria)
app.component('PKnob', Knob)
app.component('PListbox', Listbox)
app.component('PMegaMenu', MegaMenu)
app.component('PMenu', Menu)
app.component('PMenubar', Menubar)
app.component('PMessage', Message)
app.component('PMultiSelect', MultiSelect)
app.component('POrderList', OrderList)
app.component('POrganizationChart', OrganizationChart)
app.component('POverlayPanel', OverlayPanel)
app.component('PPaginator', Paginator)
app.component('PPanel', Panel)
app.component('PPanelMenu', PanelMenu)
app.component('PPassword', Password)
app.component('PPickList', PickList)
app.component('PProgressBar', ProgressBar)
app.component('PProgressSpinner', ProgressSpinner)
app.component('PRadioButton', RadioButton)
app.component('PRating', Rating)
app.component('PSelectButton', SelectButton)
app.component('PScrollPanel', ScrollPanel)
app.component('PScrollTop', ScrollTop)
app.component('PSlider', Slider)
app.component('PSidebar', Sidebar)
app.component('PSkeleton', Skeleton)
app.component('PSpeedDial', SpeedDial)
app.component('PSplitButton', SplitButton)
app.component('PSplitter', Splitter)
app.component('PSplitterPanel', SplitterPanel)
app.component('PStepper', Stepper)
app.component('PStepperPanel', StepperPanel)
app.component('PSteps', Steps)
app.component('PTabMenu', TabMenu)
app.component('PTabView', TabView)
app.component('PTabPanel', TabPanel)
app.component('PTag', Tag)
app.component('PTextarea', Textarea)
app.component('PTieredMenu', TieredMenu)
app.component('PTimeline', Timeline)
app.component('PToast', Toast)
app.component('PToolbar', Toolbar)
app.component('PToggleButton', ToggleButton)
app.component('PTree', Tree)
app.component('PTreeSelect', TreeSelect)
app.component('PTreeTable', TreeTable)
app.component('PTriStateCheckbox', TriStateCheckbox)
app.component('PVirtualScroller', VirtualScroller)
app.component('PTerminal', Terminal)
app.use(PrimeVue)
// services
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)

//endregion


//载入props编辑组件。
import editors from '@/components/editors/'

app.use(editors)


import 'primeicons/primeicons.css'



app.mount('#app')
