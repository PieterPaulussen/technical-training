odoo.define('awesome_tshirt.dashboard', function (require) {
    "use strict";

    /**
     * This file defines the Dashboard client action for the Awesome T-Shirt app. It
     * helps to manage the t-shirt business by displaying various statistics about
     * the orders and buttons to jump to specific views.
     */

    let MyCounter = require('awesome_tshirt.MyCounter');

    let AbstractAction = require('web.AbstractAction');
    let core = require('web.core');

    let Dashboard = AbstractAction.extend({

        /**
         * @override
         */
        start: function () {
            let myCounter = new MyCounter(this);
            let counterDef = myCounter.appendTo(this.$el);
            let superDef = this._super.apply(this, arguments);

            return $.when(counterDef, superDef);

        },

    });

    core.action_registry.add('awesome_tshirt.dashboard', Dashboard);

    return Dashboard;

});
