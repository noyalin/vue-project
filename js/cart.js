var vm = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productlist: [],
        checkAllFlag: false
    },
    //局部过滤器
    filters: {
        formatMoney: function (value) {
            return "¥" + value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();//dom渲染完后会自动调用cartView，类似ready
        })
    },
    methods: {
        cartView: function () {
            let _this = this;
            this.$http.get("data/cartData.json", {id: 123}).then(res => {
                // _this.productlist=res.data.result.list;
                //_this.totalMoney=res.data.result.totalMoney;
                //j箭头函数的好处是里面的作用域和外面的是一样
                this.productlist = res.data.result.list;
            this.totalMoney = res.data.result.totalMoney;
            })
        },
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
        },
        selectedProduct: function (item) {
            if (typeof item.checked == 'undefined') {
                //全局
                //Vue.set(item,"checked",true);
                //局部
                this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
                if(item.checked==false){
                    this.checkAllFlag=false;
                }
            }
            var flag=false;
            for(var i=0;i<this.productlist.length;i++){
                console.log(this.productlist.length)
                if(this.productlist[i].checked){
                    flag=true;
                    console.log(this.productlist[i]+"-"+flag)
                }else {
                    flag=false;
                    console.log(this.productlist[i]+"-"+flag);
                    //一旦存在没有被选的，就跳出循环
                    break;
                }
            }
            if(flag==true){
                this.checkAllFlag=true;
                console.log("1"+flag)
            }else {
                this.checkAllFlag=false;
                console.log("1"+flag)
            }
            console.log("2"+flag)

        },
        checkAll: function () {
            this.checkAllFlag = !this.checkAllFlag;
            var _this = this;
            this.productlist.forEach(function (item, index) {
                if (_this.checkAllFlag) {
                    //全局
                    //Vue.set(item,"checked",true);
                    //局部
                    _this.$set(item, "checked", true);
                } else {
                    _this.checkAllFlag = false;
                    _this.$set(item, "checked", false);
                }
            })

        }
    }
});

//全局过滤器
Vue.filter('money', function (value, status) {
    return "¥" + value.toFixed(2) + status;
});