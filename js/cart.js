var vm=new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productlist:[]
    },
    mounted:function () {
        this.cartView();//dom渲染完后会自动调用cartView，类似ready
    },
    methods:{
        cartView:function () {
            var _this=this;
            this.$http.get("data/cartData.json",{id:123}).then(function (res) {
                _this.productlist=res.data.result.list;
                _this.totalMoney=res.data.result.totalMoney;
            });
        }
    }
});