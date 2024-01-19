/**
 * 创建p-auto-complete回调
 */
export class AutoCompleteCallback {

    constructor(list) {
        this.list = list;
    }

    items= [];
    querySearch = (event) => {
        const {query} = event;
        this.items.length=0;
       this.items.push(...this.list.filter(s=>s.indexOf(query)>=0))
    }

    createFilter = (query) => {
        return (item) => {
            return (
                item.toLowerCase().indexOf(query.toLowerCase()) >= 0
            )
        }
    }
}
