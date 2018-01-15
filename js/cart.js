new Vue({
    el:"#app",
    data:{
        title:"hello vue"
    },
    mounted:function () {
        this.cartView();//渲染完后会自动调用cartView
    },
    methods:{
        cartView:function () {
            this.title="Vue hello"
        }
    }
});