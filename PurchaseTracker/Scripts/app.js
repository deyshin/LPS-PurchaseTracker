const app = new Vue({
    el: '#app',
    data: {
        title: 'hello from Dan Shin',
        stats: {},
        categories: {},
        modalPurchase: {},
        modalAction: '',
        purchases: [],
        loading: false,
    },

    computed: {
        sortedPurchases: function () {
            function compare(a, b) {
                if (a.date > b.date)
                    return -1;
                if (a.date < b.date)
                    return 1;
                return 0;
            }

            return this.purchases.sort(compare);
        },
        count: function () {
            return this.purchases.length;
        },
        sum: function () {
            let s = this.purchases
                .map(function (p) { return p.amount; })
                .reduce(function (a, b) { return a + b; }, 0);
            return s.toFixed(2);
        }
    },
    
    methods: {
        // ViewModel
        openModal: function (purchase, action) {
            this.modalAction = action;
            if (action === 'Add') {
                this.modalPurchase = { categoryId : "" };
                return;
            }

            this.modalPurchase = $.extend({}, purchase);
        },
        submitModal: function () {
            let self = this;
            self.loading = true;
            let deferred;

            switch (this.modalAction) {
                case 'Add':
                    deferred = self.postPurchase(self.modalPurchase);
                    break;
                case 'Edit':
                    deffered = self.putPurchase(self.modalPurchase);
                    break;
                case 'Delete':
                    deferred = self.deletePurchase(self.modalPurchase.id);
                    break;
            }
            $.when(deferred).done(self.doneLoading);
        },

        doneLoading: function () {
            this.loading = false;
            app.$forceUpdate();
        },

        // API Call Methods 
        getPurchases: function() {
            var self = this;
            return $.getJSON("/api/Purchases",
                function (data) {
                    self.purchases = data;
                    $('.modal').modal('hide');
                });
        },
        postPurchase: function (purchase) {
            var self = this;
            return $.ajax({
                url: '/api/Purchases/',
                type: 'POST',
                data: purchase,
                success: function (data) {
                    self.purchases.push(data);
                    $('.modal').modal('hide');
                }
            });
        },
        putPurchase: function (purchase) {
            var self = this;
            return $.ajax({
                url: '/api/Purchases/' + purchase.id,
                type: 'PUT',
                data: purchase,
                success: function (data) {
                    var index = self.purchases.findIndex(function (obj) { return obj.id === purchase.id });
                    if (index !== -1) {
                        self.purchases.splice(index, 1, data);
                        $('.modal').modal('hide');
                    }
                }
            });
        },
        deletePurchase: function (id) {
            var self = this;
            return $.ajax({
                url: '/api/Purchases/' + id,
                type: 'DELETE',
                success: function (data) {
                    var index = self.purchases.findIndex(function (obj) { return obj.id === id });
                    if (index !== -1) {
                        self.purchases.splice(index, 1);
                        $('.modal').modal('hide');
                    }
                }
            });
        },
        getCategories: function () {
            var self = this;
            return $.getJSON("/api/Categories",
                function (data) {
                    self.categories = data;
                });
        },
        initialize: function () {
            var self = this; 
            $.when(self.getCategories(), self.getPurchases())
                .done(function () {
                    $('#loadingModal').modal('hide');
                });
        }
        
    },

    created: function () {
        this.initialize();
    },

    mounted: function () {
        $('#loadingModal').modal('show');
    }

});