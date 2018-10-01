odoo.define('awesome_tshirt.MyCounter', function (require) {
    "use strict";

    /**
     * This file defines the MyCounter widget, displaying a counter with two buttons
     * allowing to increment and decrement it.
     */

    let Widget = require('web.Widget');

    let MyCounter = Widget.extend({
        template: 'MyCounter',
        events: {
            'click .o_decrement': '_onDecrement',
            'click .o_increment': '_onIncrement',
            'click .o_customers': '_onCustomers',
            'click .o_neworders': '_onNewOrders',
            'click .o_cancelled_orders': '_onCancelledOrders',
        },

        /**
         * @override
         */
        init: function () {
            this.value = 0;
            this._super.apply(this, arguments);
        },

        //--------------------------------------------------------------------------
        // Handlers
        //--------------------------------------------------------------------------

        /**
         * Decrement the counter and re-render the widget.
         *
         * @private
         */
        _onDecrement: function () {
            this.value--;
            this.renderElement();
        },
        /**
         * Increment the counter and re-render the widget.
         *
         * @private
         */
        _onIncrement: function () {
            this.value++;
            this.renderElement();
        },

        /**
         * Display all customers
         *
         * @private
         */
        _onCustomers: function () {
            let customersDef = this.do_action({
                res_model: 'res.partner',
                name: 'Customers',
                views: [[false, 'kanban'], [false, 'list'], [false, 'form']],
                domain: [],
                type: 'ir.actions.act_window',
                context: {}
            });
            return $.when(customersDef);
        },

        /**
         * Display all customers
         *
         * @private
         */
        _onNewOrders: function () {
            let aWeekAgo = moment().subtract(7, 'd').locale('en').format('YYYY-MM-DD HH:mm:ss');

            let newOrdersDef = this.do_action({
                res_model: 'awesome_tshirt.order',
                name: 'New Orders',
                views: [[false, 'list'], [false, 'form']],
                domain: [['create_date', '>=', aWeekAgo], ['state', '=', 'new']],
                type: 'ir.actions.act_window',
                context: {}
            });
            return $.when(newOrdersDef);
        },

        /**
         * Display all customers
         *
         * @private
         */
        _onCancelledOrders: function () {
            let aWeekAgo = moment().subtract(7, 'd').locale('en').format('YYYY-MM-DD HH:mm:ss');

            let cancelledOrdersDef = this.do_action({
                res_model: 'awesome_tshirt.order',
                name: 'Cancelled Orders',
                views: [[false, 'list'], [false, 'form']],
                domain: [['create_date', '>=', aWeekAgo], ['state', '=', 'cancelled']],
                type: 'ir.actions.act_window',
                context: {}
            });
            return $.when(cancelledOrdersDef);
        },
    });

    return MyCounter;

});
